# DocDiver — how to post an adventure

Plain HTML/CSS/JS on GitHub Pages. No build step. Edit, commit to `main`, live in about a minute.

## Post a new adventure

1. **Photos.** Make a folder `images/<slug>/` (slug = short lowercase name, e.g. `cozumel-2026`).
   Resize photos to ~1600 px on the long side (keeps pages fast; aim for under 400 KB each).
   Name the card image `cover.jpg`.
2. **Page.** Copy `adventures/_template.html` → `adventures/<slug>.html`.
   Set `data-slug="<slug>"`, then fill in the sections (comments inside explain each). Delete what you don't need.
   - Each gallery photo is `<a href="../images/<slug>/x.jpg" data-caption="…"><img src="…" alt="…"></a>` — it opens in the lightbox automatically.
     Add `class="wide"` to make one span two columns.
   - Video: paste a YouTube (`https://www.youtube-nocookie.com/embed/VIDEO_ID`) or Vimeo embed into the iframe and delete the placeholder div.
3. **Index.** Add one entry at the **top** of `data/adventures.js`:
   ```js
   { slug: "cozumel-2026", title: "Cozumel: five days of drift", where: "Cozumel, Mexico", region: "Caribbean", type: "Dive",
     start: "2026-11-02", end: "2026-11-07", summary: "One or two sentences.", cover: "images/cozumel-2026/cover.jpg", featured: true },
   ```
   `region` and `type` become the filter buttons; `featured: true` makes it the big card (only the newest featured one shows big).
4. Commit + push. Home page, Adventures page, "Where I've been" pins, and older/newer links all update themselves.

## Wish list pins

Amber pins on the home page come from `WISHLIST` at the bottom of `data/adventures.js`. A place turns teal automatically once an adventure with that `where` exists.

## Change the avatar

There are three looks. Keep all of them; the site rotates them.

- `assets/img/avatar-opt-1.png` — teal studio (hero). Also copied to `avatar.png`.
- `assets/img/avatar-opt-2.png` — underwater bokeh (Adventures / Dive Notes / About).
- `assets/img/avatar-opt-3.png` — charcoal studio (Tips / trip bylines).
- Face crops: `avatar-opt-{1,2,3}-face.png`. `avatar-face.png` is the opt-1 crop (bylines).
- `assets/img/avatar-square.jpg` — social preview, from opt-1.

Same filenames, nothing else to touch unless you add a new look.

## Edit Dive Notes / Tips / About

Plain HTML: `destinations.html`, `tips.html`, `about.html`. Headings with `id="…"` are linked from tables of contents — keep the ids if you rename a heading.

## Clean-up once real trips are posted

- Delete `images/welcome/` (generated placeholders) and the `welcome` entry in `data/adventures.js` if you no longer want the intro post.

## Don'ts

- Don't delete `CNAME` (custom domain) or move `index.html`.
- Don't rename `data/adventures.js` or `assets/site.js` — every page loads them by path.
