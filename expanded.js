// expanded: renders QUESTIONS, scores by weight, one bar per category.
// edit expanded-questions.js, not this file.

document.addEventListener('DOMContentLoaded', () => {
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

    // categories, in the order they first appear in the data
    const cats = [...new Set(QUESTIONS.map(q => q.c))];

    document.querySelector('.qlist').innerHTML = QUESTIONS.map(q =>
        `<li class="q" data-w="${q.w}" data-c="${esc(q.c)}" data-tip="${esc(q.t)}">` +
        `<label class="q-label"><input type="checkbox"><span class="q-num"></span>` +
        `<span class="q-text">${esc(q.q)}</span></label>` +
        `<button class="q-help" type="button" aria-label="what this means">?</button></li>`
    ).join('');

    document.querySelector('.cats').innerHTML = cats.map(c =>
        `<div class="cat" data-cat="${esc(c)}"><span class="cat-name">${esc(c)}</span>` +
        `<span class="cat-track"><span class="cat-fill"></span></span>` +
        `<span class="cat-val">100</span></div>`
    ).join('');

    document.querySelector('.js-count').textContent = QUESTIONS.length;

    const weight = rs => rs.reduce((s, r) => s + Number(r.dataset.w), 0);
    const checked = rs => rs.filter(r => r.querySelector('input').checked);
    const raw = rs => rs.length ? 100 - 100 * weight(checked(rs)) / weight(rs) : 100;
    const purity = rs => Math.round(raw(rs));

    grainTest(rows => ({
        score: purity(rows),
        raw: raw(rows),
        cats: cats.map(c => [c, purity(rows.filter(r => r.dataset.c === c))])
    }));
});
