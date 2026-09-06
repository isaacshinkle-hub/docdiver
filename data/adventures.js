/* ============================================================
   DocDiver — Dr. Ting's adventure index
   ------------------------------------------------------------
   Newest first. One entry per adventure. The page itself is an
   HTML file in /adventures/ made from /adventures/_template.html,
   and its photos live in /images/<slug>/.

   To post an adventure:
     1. Make a folder  images/<slug>/  and drop the photos in
        (JPG, resized to ~1600px wide; cover.jpg for the card).
     2. Copy adventures/_template.html  ->  adventures/<slug>.html
        and write it up (see comments inside the template).
     3. Add ONE entry at the TOP of the list below.
     4. Commit + push.

   Fields
   slug      filename without .html, and the images folder name
   title     Headline
   where     "Cozumel, Mexico"
   region    "Caribbean" | "Pacific" | "Asia" | "Europe" | "North America" | ... (used for the "Where I've been" chips)
   type      "Dive" | "Trek" | "City" | "Road trip" | "Liveaboard" | ...  (used for filters)
   start     "YYYY-MM-DD"   end "YYYY-MM-DD" (same as start for a day trip)
   summary   One or two sentences for the card
   cover     path to the card image, e.g. "images/cozumel-2026/cover.jpg" (leave "" for a placeholder)
   featured  true to make it the big card at the top of the Adventures page
   ============================================================ */

window.ADVENTURES = [
  {
    slug: "welcome",
    title: "Welcome to the adventure journal",
    where: "Everywhere, eventually",
    region: "Planning",
    type: "Journal",
    start: "2026-09-06", end: "2026-09-06",
    summary: "What this site is, how each trip gets written up, and the places already on the list.",
    cover: "",
    featured: true
  }
];

/* Places on the wish list — shown as amber pins on the home page. */
window.WISHLIST = [
  { where: "Socorro, Mexico", note: "Liveaboard · mantas · Nov–May" },
  { where: "Raja Ampat, Indonesia", note: "Liveaboard or resort · Oct–Apr" },
  { where: "Little Cayman", note: "Bloody Bay Wall" },
  { where: "Galápagos, Ecuador", note: "Hammerheads · liveaboard" },
  { where: "Palau", note: "Blue Corner · jellyfish lake" }
];
