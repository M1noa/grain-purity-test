# grain purity test

> THIS PROJECT WAS MADE PARTIALLY USING AGENTIC AI CODING TOOLS

A purity test that actually stays on your machine. Live at **[grain.minoa.cat](https://grain.minoa.cat)**.

The original at ricepuritytest.com computes your score client-side and *then* POSTs your full answer array, plus a fresh UUID, to its own endpoint before showing you the number. The round-trip does nothing for scoring. This is that site rebuilt with no round-trip at all: no fetch, no XHR, no beacon, no form action, no analytics. `Content-Security-Policy: connect-src 'none'` in `_headers` makes the browser enforce it rather than asking you to take my word for it.

Two tests:

- **`/`** the classic 100 questions, one point each, so scores stay comparable with everyone else's
- **`/expanded`** 169 questions weighted by severity, with a per-category breakdown

Both add a hover hint per question, drawing the boundary the question leaves open, with a `?` button so touch users get them too.

## Running it

Static files, no build step, no dependencies.

```sh
python3 -m http.server 5001
```

`/expanded` will 404 locally since python's server has no extensionless resolution. Use `/expanded.html`. Cloudflare Pages resolves the clean URL.

## Editing the expanded test

Everything lives in `expanded-questions.js`, and that is the only file you touch.

```js
{ w: 1.5, c: 'partnered', q: 'Had vaginal intercourse?', t: 'Penetrative.' },
```

| field | meaning |
|---|---|
| `w` | weight, how much checking it costs you |
| `c` | category, drives the bars on the result page |
| `q` | the question |
| `t` | the hint shown on hover |

Weight tiers, pick the nearest:

| weight | tier | examples |
|---|---|---|
| `0.4` | trivial | held hands, a dating app, something that happened to you |
| `0.8` | mild | kissing, masturbated, a cigarette, most kink |
| `1.5` | notable | oral, intercourse, been drunk, weed, shoplifting |
| `2.5` | heavy | group sex, arrested, cocaine, cheating, the extreme kink |
| `4` | extreme | needles, opioids, arson, animal contact, breaking a limit |
| `5` | criminal | deepfakes, revenge porn, covert filming, armed threats |
| `6` | felonious | rape, grooming, incest with a parent, a corpse |

Any number works. Those are the seven the on-page explainer names.

Five rules keep the ladder consistent across categories:

1. **Harm to someone else** is what pushes a weight up. An act that hurts nobody stays low however unusual it sounds.
2. **Things you chose beat things that happened to you.** Being robbed, catching an STI, having your nudes leaked: all near the floor.
3. **Doing beats watching.** An act always outweighs footage of that act.
4. **Consensual kink caps at 2.5**, however extreme. The one `4` in that category is breaking a negotiated limit, because it is the only entry there with a victim.
5. **Umbrella first, specifics as top-ups.** "contact with a family member" carries the `4`; "with a sibling" adds `1.5` on top. Otherwise one relationship gets billed three times over.

- **Add a question:** copy a line, change the four fields.
- **Remove one:** delete the line. Numbering is CSS counters, so there is nothing to renumber.
- **New category:** just use a new `c` value. Its bar appears on the result page on its own, in the order it first shows up in the array.

Scoring is `100 - round(100 * checked weight / total weight)`, run over the whole list for the headline number and over one category at a time for each bar.

## Files

```
index.html              classic test, 100 items inline
expanded.html           expanded test, shell only
expanded-questions.js   the question data. edit this one
expanded.js             renders the list, weighted scoring, category bars
classic.js              flat scoring
common.js               theme randomiser, hints, sticky bar, result reveal
style.css               shared
404.html
_headers                security headers, incl. the CSP that blocks network calls
noise.png               film grain overlay
fonts/                  three self-hosted woff2 subsets, 160K total
og.jpg og-expanded.jpg  1200x630 share cards
```

## Deploy

```sh
wrangler pages deploy . --project-name=grain-purity-test
```

The custom domain is attached in the Cloudflare dashboard. Wrangler has no `pages domain` subcommand.

## Verifying the claim yourself

```sh
grep -rnE "fetch\(|XMLHttpRequest|sendBeacon|WebSocket|\.submit\(|action=" *.html *.js
```

Zero hits. Or open DevTools, filter Network to Fetch/XHR, and complete a full run. The list stays empty.

There is no third-party request either. The fonts are self-hosted, so `connect-src 'none'; font-src 'self'` in the CSP means the browser refuses to talk to anything but this origin. That also sidesteps a real failure mode: Cloudflare's Google Fonts optimisation rewrites a `<link>` into an inline `<style>`, which a CSP without `'unsafe-inline'` blocks, and the fonts silently vanish.

## Licence

MIT.
