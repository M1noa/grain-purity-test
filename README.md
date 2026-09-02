# grain purity test

> THIS PROJECT WAS MADE PARTIALLY USING AGENTIC AI CODING TOOLS

A purity test that actually stays on your machine. Live at **[grain.minoa.cat](https://grain.minoa.cat)**.

The original at ricepuritytest.com computes your score client-side and *then* POSTs your full answer array, plus a fresh UUID, to its own endpoint before showing you the number. The round-trip does nothing for scoring. This is that site rebuilt with no round-trip at all: no fetch, no XHR, no beacon, no form action, no analytics. `Content-Security-Policy: connect-src 'none'` in `_headers` makes the browser enforce it rather than asking you to take my word for it.

Two tests:

- **`/`** the classic 100 questions, one point each, so scores stay comparable with everyone else's
- **`/expanded`** 155 questions weighted by severity, with a per-category breakdown

Both add hover tooltips explaining what each question actually counts as, with a `?` button so touch users get them too.

## Running it

Static files, no build step, no dependencies.

```sh
python3 -m http.server 5001
```

`/expanded` will 404 locally since python's server has no extensionless resolution. Use `/expanded.html`. Cloudflare Pages resolves the clean URL.

## Editing the expanded test

Everything lives in `expanded-questions.js`, and that is the only file you touch.

```js
{ w: 1.5, c: 'partnered', q: 'Had sexual intercourse?', t: 'Vaginal or anal penetration with a partner.' },
```

| field | meaning |
|---|---|
| `w` | weight, how much checking it costs you |
| `c` | category, drives the bars on the result page |
| `q` | the question |
| `t` | the tooltip |

Weight tiers, pick the nearest:

| weight | tier | examples |
|---|---|---|
| `0.4` | trivial | held hands, been on a date |
| `0.8` | mild | kissing, masturbated, drank alcohol |
| `1.5` | notable | oral, intercourse, been drunk, weed |
| `2.5` | heavy | unprotected, group, arrested, hard drugs |
| `4` | extreme | convictions, paid sex, the tail end |

Any number works. Those are just the five the on-page explainer names.

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
common.js               theme randomiser, tooltips, sticky bar, result reveal
style.css               shared
404.html
_headers                security headers, incl. the CSP that blocks network calls
noise.png               film grain overlay
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

Zero hits. Or open DevTools, filter Network to Fetch/XHR, and complete a full run. The list stays empty. Fonts are the only outbound request, and only on first load.

## Licence

MIT.
