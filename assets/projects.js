/* =========================================================
   The stars on the homepage.
   To add a project: copy one block, change the text and links,
   and give it a spot in the sky.

   x, y   = position on a wide screen, 0 to 1 (0,0 is top left)
   mx, my = position on a phone
   code   = GitHub link (or null)
   live   = link to the running app (or null)
   soon   = true shows "Coming soon" instead of links
   links  = which other stars this one connects to with a line
   ========================================================= */

window.PROJECTS = [
  {
    id: "chips",
    name: "Chips and headlines",
    desc: "Does news sentiment move NVIDIA, AMD, TSMC and Intel? Scored years of headlines and lined them up against share prices, 2019 to 2025.",
    code: "https://github.com/westparker/Semiconductors-News-Sentiment-",
    live: null,
    x: 0.30, y: 0.22, mx: 0.20, my: 0.17,
    links: ["lastmile"]
  },
  {
    id: "lastmile",
    name: "The last mile",
    desc: "What actually decides how long a delivery takes? Cleaned 43,700 Amazon deliveries across India and built dashboards that test distance, traffic, weather and driver quality.",
    code: "https://github.com/westparker/Amazon-Data-Final-Project",
    live: null,
    x: 0.45, y: 0.42, mx: 0.40, my: 0.36,
    links: ["shopsense", "macros"]
  },
  {
    id: "shopsense",
    name: "ShopSense",
    desc: "A second opinion at the auto shop counter. Checks what your car actually needs at its mileage against the manufacturer's schedule, then points you to shops worth trusting.",
    code: "https://github.com/westparker/shopsense",
    live: null,
    x: 0.62, y: 0.24, mx: 0.68, my: 0.24,
    links: ["dice", "achilles"]
  },
  {
    id: "macros",
    name: "Meal macros",
    desc: "Snap a photo of your meal or describe it, and AI estimates the calories, protein, carbs and fat.",
    code: "https://github.com/westparker/ai-chat-macros",
    live: null,
    x: 0.53, y: 0.64, mx: 0.22, my: 0.50,
    links: []
  },
  {
    id: "dice",
    name: "Dice Roll",
    desc: "A dice-rolling app built in Ruby on Rails, made to learn how routes, controllers and views fit together.",
    code: "https://github.com/westparker/dice-roll-2-rails",
    live: null,
    x: 0.86, y: 0.15, mx: 0.84, my: 0.11,
    links: []
  },
  {
    id: "achilles",
    name: "Recovery log",
    desc: "For anyone bouncing back from a serious injury. Log the long road from surgery through physical therapy and see how far you've come.",
    code: null,
    live: null,
    soon: true,
    x: 0.79, y: 0.40, mx: 0.80, my: 0.42,
    links: ["site"]
  },
  {
    id: "site",
    name: "Coming soon",
    desc: "Something new is in the works. Check back.",
    code: null,
    live: null,
    soon: true,
    x: 0.72, y: 0.62, mx: 0.56, my: 0.56,
    links: []
  }
];
