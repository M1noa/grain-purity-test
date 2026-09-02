// shared behaviour for both tests. loaded synchronously in <head> so the
// theme lands before first paint (no colour flash).

// ---------- random theme ----------
(function () {
    function hslToRgb(h, s, l) {
        s /= 100; l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
        return [f(0), f(8), f(4)];
    }

    const themes = ['pink', 'white', 'pastel'];
    const pick = themes[Math.floor(Math.random() * themes.length)];

    let rgb;
    if (pick === 'pink') rgb = [255, 192, 203];
    else if (pick === 'white') rgb = [255, 255, 255];
    else rgb = hslToRgb(
        Math.floor(Math.random() * 360),
        30 + Math.floor(Math.random() * 40),
        70 + Math.floor(Math.random() * 20)
    );

    document.documentElement.style.setProperty('--accent-rgb', rgb.join(', '));
    document.documentElement.setAttribute('data-theme', pick);

    document.addEventListener('DOMContentLoaded', () => {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', `rgb(${rgb.join(', ')})`);
    });
})();

// ---------- score bands ----------
const BANDS = [
    [100, 'untouched',      'nothing checked. genuinely impressive or genuinely lying.'],
    [95,  'barely dented',  'a couple of firsts and not much else.'],
    [85,  'curious',        'you have started, cautiously.'],
    [70,  'standard issue', 'right about where most people land.'],
    [50,  'experienced',    'you have been around a bit.'],
    [30,  'well travelled', 'a solid catalogue of decisions.'],
    [15,  'committed',      'not much left on the list.'],
    [0,   'how',            'you should probably write a book.']
];

function band(score) {
    return BANDS.find(b => score >= b[0]) || BANDS[BANDS.length - 1];
}

// ---------- tooltips ----------
function initTooltips() {
    const tip = document.createElement('div');
    tip.id = 'tip';
    tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);

    const canHover = window.matchMedia('(hover: hover)').matches;
    let openRow = null;
    let timer = null;

    function show(row) {
        const text = row.dataset.tip;
        if (!text) return;
        tip.textContent = text;
        tip.classList.add('show');

        const r = row.getBoundingClientRect();
        const t = tip.getBoundingClientRect();
        let top = r.top - t.height - 10;
        if (top < 12) top = r.bottom + 10;
        let left = Math.min(r.left, window.innerWidth - t.width - 12);
        if (left < 12) left = 12;
        tip.style.top = top + 'px';
        tip.style.left = left + 'px';

        row.setAttribute('aria-describedby', 'tip');
        const btn = row.querySelector('.q-help');
        if (btn) btn.setAttribute('aria-expanded', 'true');
        openRow = row;
    }

    function hide() {
        clearTimeout(timer);
        tip.classList.remove('show');
        if (openRow) {
            openRow.removeAttribute('aria-describedby');
            const btn = openRow.querySelector('.q-help');
            if (btn) btn.setAttribute('aria-expanded', 'false');
            openRow = null;
        }
    }

    document.querySelectorAll('.q').forEach(row => {
        if (canHover) {
            // short delay so it doesn't strobe while you scan down the list
            row.addEventListener('mouseenter', () => {
                clearTimeout(timer);
                timer = setTimeout(() => show(row), 120);
            });
            row.addEventListener('mouseleave', hide);
            // instant on the ? itself
            const help = row.querySelector('.q-help');
            if (help) help.addEventListener('mouseenter', () => {
                clearTimeout(timer);
                show(row);
            });
        }
        const btn = row.querySelector('.q-help');
        if (!btn) return;
        btn.setAttribute('aria-expanded', 'false');
        // pointerdown, not click. ios makes the first tap on anything with a
        // :hover rule a hover-only tap and swallows the click, so click needs
        // two taps. pointerdown fires on the first one every time.
        btn.addEventListener('pointerdown', e => {
            e.preventDefault();
            e.stopPropagation();
            // a mouse already has it from hover, so clicking must not take it away
            if (e.pointerType === 'mouse') return show(row);
            openRow === row ? hide() : show(row);
        });
        // swallow the click that follows so it can't re-toggle or bubble out
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
        });
        // keyboard only. preventDefault above means taps never focus the button
        btn.addEventListener('focus', () => {
            if (btn.matches(':focus-visible')) show(row);
        });
        btn.addEventListener('blur', hide);
    });

    window.addEventListener('scroll', hide, { passive: true });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
    document.addEventListener('click', e => {
        if (openRow && !openRow.contains(e.target)) hide();
    });
}

// ---------- fractional scores ----------
// weighted scoring lands between integers. show the whole part at full size and
// hang the remainder off the side, so the big number never shifts as you tick.
function paintScore(numEl, fracEl, out) {
    if (!fracEl || out.raw === undefined) {
        numEl.textContent = out.score;
        return;
    }
    const v = Math.round(out.raw * 100) / 100;   // 87.999 rolls to a clean 88
    const whole = Math.floor(v);
    const d = Math.round((v - whole) * 100);
    numEl.textContent = whole;
    fracEl.textContent = d ? '.' + (d % 10 ? d : d / 10) : '';
    fracEl.classList.toggle('show', !!d);
}

// ---------- test wiring ----------
// compute(rows) must return { score, raw?, cats? }, cats is [[name, 0-100], ...]
function grainTest(compute) {
    const list = document.querySelector('.qlist');
    const rows = [...list.querySelectorAll('.q')];
    const bar = document.querySelector('.bar');
    // .bar-num exists only where the score can be fractional (expanded)
    const barScore = document.querySelector('.bar-num') || document.querySelector('.bar-score');
    const barFrac = document.querySelector('.bar-frac');
    const barMeta = document.querySelector('.bar-meta');
    const barFill = document.querySelector('.bar-progress');
    const result = document.querySelector('.result');
    const testEl = document.querySelector('.test');
    const cta = document.querySelector('.cta');

    document.body.classList.add('js-enabled', 'has-bar');
    bar.hidden = false;
    initTooltips();

    function live() {
        const n = rows.filter(r => r.querySelector('input').checked).length;
        paintScore(barScore, barFrac, compute(rows));
        barMeta.textContent = n === 1 ? '1 selected' : n + ' selected';
    }

    // page scroll fraction: 0 at the very top, 1 at the very bottom
    let queued = false;
    function progress() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        barFill.style.transform = 'scaleX(' + Math.max(0, Math.min(1, p)) + ')';
        queued = false;
    }

    function queueProgress() {
        if (queued) return;
        queued = true;
        requestAnimationFrame(progress);
    }

    list.addEventListener('change', live);
    window.addEventListener('scroll', queueProgress, { passive: true });
    window.addEventListener('resize', queueProgress);

    const resScore = result.querySelector('.result-num') || result.querySelector('.result-score');
    const resFrac = result.querySelector('.result-frac');

    document.querySelector('.js-submit').addEventListener('click', () => {
        const out = compute(rows);
        const { score, cats } = out;
        const [, name, blurb] = band(score);

        paintScore(resScore, resFrac, out);
        result.querySelector('.result-band').textContent = name;
        result.querySelector('.result-blurb').textContent = blurb;

        if (cats) {
            result.querySelectorAll('.cat').forEach(el => {
                const hit = cats.find(c => c[0] === el.dataset.cat);
                if (!hit) return;
                el.querySelector('.cat-val').textContent = hit[1];
                requestAnimationFrame(() => {
                    el.querySelector('.cat-fill').style.width = hit[1] + '%';
                });
            });
        }

        testEl.hidden = true;
        bar.hidden = true;
        if (cta) cta.hidden = true;
        result.hidden = false;
        document.body.classList.remove('has-bar');
        document.body.classList.add('done');
        window.scrollTo(0, 0);
    });

    document.querySelectorAll('.js-reset').forEach(btn => {
        btn.addEventListener('click', () => {
            rows.forEach(r => { r.querySelector('input').checked = false; });
            result.hidden = true;
            testEl.hidden = false;
            bar.hidden = false;
            if (cta) cta.hidden = false;
            document.body.classList.remove('done');
            document.body.classList.add('has-bar');
            result.querySelectorAll('.cat-fill').forEach(f => { f.style.width = 0; });
            live();
            window.scrollTo(0, 0);
            queueProgress();
        });
    });

    live();
    progress();
}
