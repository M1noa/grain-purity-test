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
// the two tests do NOT share thresholds, because they do not share a scale.
// modelling the same three people through both: a barely-started profile scores
// 96 weighted but 87 flat, a typical experienced one 80 weighted but 41 flat,
// and a heavy one 58 weighted but 20 flat. one table across both would tell the
// flat-test taker they are near the floor when they are near the middle.

// expanded. 45% of its weight sits in forty items about crime, incest and
// non-consent, so ticking every other question on the list only reaches 43.
// that is why the bottom two sit where they do: 'committed' is the honest floor
// for someone with no crimes ticked, 'how' is below it. re-measure if that tail
// ever changes weight much.
const BANDS_WEIGHTED = [
    [100, 'untouched',      'nothing checked. genuinely impressive or genuinely lying.'],
    [93,  'barely dented',  'a couple of firsts and not much else.'],
    [84,  'curious',        'you have started, and you are not in a hurry.'],
    [72,  'about average',  'right about where most people land.'],
    [62,  'experienced',    'past average, and you knew that.'],
    [53,  'well travelled', 'a solid catalogue of decisions.'],
    [42,  'committed',      'close to everything on here that is not a crime.'],
    [0,   'how',            'you had to reach into the felonies for this.']
];

// classic. one point per item, nothing locked away, so the same life spends far
// more of the scale and the whole ladder shifts down. lower is the norm here,
// which is also what the original test's scores have always looked like.
const BANDS_FLAT = [
    [100, 'untouched',      'nothing checked. genuinely impressive or genuinely lying.'],
    [90,  'barely dented',  'a couple of firsts and not much else.'],
    [75,  'curious',        'you have started, and you are not in a hurry.'],
    [55,  'above average',  'purer than most people who take this.'],
    [34,  'about average',  'right about where most people land.'],
    [22,  'experienced',    'past average, and you knew that.'],
    [10,  'well travelled', 'a solid catalogue of decisions.'],
    [0,   'how',            'you should probably write a book.']
];

function band(score, bands) {
    const b = bands || BANDS_WEIGHTED;
    return b.find(x => score >= x[0]) || b[b.length - 1];
}

// ---------- tooltips ----------
function initTooltips() {
    const tip = document.createElement('div');
    tip.id = 'tip';
    tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);

    const canHover = window.matchMedia('(hover: hover)').matches;
    const HOVER_DELAY = 1500;   // deliberate hover, not a passing cursor
    const AUTO_HIDE = 5000;     // taps have no mouseleave, so they time out
    let openRow = null;
    let timer = null;
    let dismiss = null;

    // drops the aria wiring for whatever row is currently described. without
    // this, moving between two ? buttons leaves the first one lit for good.
    function release() {
        if (!openRow) return;
        openRow.removeAttribute('aria-describedby');
        const btn = openRow.querySelector('.q-help');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        openRow = null;
    }

    function hide() {
        clearTimeout(timer);
        clearTimeout(dismiss);
        tip.classList.remove('show');
        release();
    }

    function show(row, timeout) {
        const text = row.dataset.tip;
        if (!text) return;
        release();
        clearTimeout(dismiss);

        tip.textContent = text;
        tip.classList.add('show');

        // anchor to the ?, not the row. offsetWidth ignores the entrance
        // transform, which getBoundingClientRect would fold into the size.
        const btn = row.querySelector('.q-help');
        const a = (btn || row).getBoundingClientRect();
        const w = tip.offsetWidth;
        const h = tip.offsetHeight;

        // right edge lines up with the ?, so the question text stays readable
        let left = Math.min(a.right - w, window.innerWidth - w - 10);
        if (left < 10) left = 10;

        let top = a.top - h - 9;
        const below = top < 10;
        if (below) top = a.bottom + 9;
        tip.classList.toggle('below', below);

        // caret points back at the ?, clamped clear of the rounded corners
        tip.style.setProperty('--caret',
            Math.min(Math.max(a.left + a.width / 2 - left, 11), w - 11) + 'px');
        tip.style.left = left + 'px';
        tip.style.top = top + 'px';

        row.setAttribute('aria-describedby', 'tip');
        if (btn) btn.setAttribute('aria-expanded', 'true');
        openRow = row;

        if (timeout) dismiss = setTimeout(hide, AUTO_HIDE);
    }

    document.querySelectorAll('.q').forEach(row => {
        const btn = row.querySelector('.q-help');

        if (canHover) {
            row.addEventListener('mouseenter', () => {
                clearTimeout(timer);
                timer = setTimeout(() => show(row), HOVER_DELAY);
            });
            row.addEventListener('mouseleave', hide);
            // the ? is the shortcut past the wait
            if (btn) btn.addEventListener('mouseenter', () => {
                clearTimeout(timer);
                show(row);
            });
        }

        if (!btn) return;
        btn.setAttribute('aria-expanded', 'false');
        // pointerdown, not click. ios treats the first tap on anything with a
        // :hover rule as hover-only and swallows the click, so click needs two
        // taps. pointerdown fires on the first one every time.
        btn.addEventListener('pointerdown', e => {
            e.preventDefault();
            e.stopPropagation();
            // a mouse already has it from hover, so clicking must not take it away
            if (e.pointerType === 'mouse') return show(row);
            openRow === row ? hide() : show(row, true);
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
    // any tap that is not the open row's own ? closes it, including this row's label
    document.addEventListener('pointerdown', e => {
        if (openRow && !e.target.closest('.q-help')) hide();
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
// bands picks the threshold table: BANDS_FLAT for classic, BANDS_WEIGHTED for expanded
function grainTest(compute, bands) {
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
        const [, name, blurb] = band(score, bands);

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
