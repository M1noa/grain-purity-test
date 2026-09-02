// classic: one point per checked box
document.addEventListener('DOMContentLoaded', () => {
    grainTest(rows => ({
        score: 100 - rows.filter(r => r.querySelector('input').checked).length
    }));
});
