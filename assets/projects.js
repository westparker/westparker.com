/* =========================================================
   The stars on the homepage.
   To add a project: copy one block, change the text and links,
   and give it a spot in the sky.

   x, y   = position on a wide screen, 0 to 1 (0,0 is top left)
   mx, my = position on a phone
   code   = GitHub link (or null)
   live   = link to the running app (or null)
   links  = which other stars this one connects to with a line
   ========================================================= */

window.PROJECTS = [
  {
    id: "chips",
    name: "Chips and headlines",
    meta: "Python and SQL. With Joshua Howard and Connor Henkle.",
    desc: "Does news sentiment move NVIDIA, AMD, TSMC and Intel? Scored years of headlines and lined them up against share prices, 2019 to 2025.",
    code: "https://github.com/westparker/Semiconductors-News-Sentiment-",
    live: null,
    x: 0.30, y: 0.22, mx: 0.20, my: 0.17,
    links: ["lastmile"]
  },
  {
    id: "lastmile",
    name: "The last mile",
    meta: "Python and Tableau. Chicago Booth.",
    desc: "What actually decides how long a delivery takes? Cleaned 43,700 Amazon deliveries across India and built dashboards that test distance, traffic, weather and driver quality.",
    code: "https://github.com/westparker/Amazon-Data-Final-Project",
    live: null,
    x: 0.45, y: 0.42, mx: 0.40, my: 0.36,
    links: ["shopsense"]
  },
  {
    id: "shopsense",
    name: "ShopSense",
    meta: "Python and Claude. Built for Building an AI Company at Booth.",
    desc: "A second opinion at the auto shop counter. Checks what your car actually needs at its mileage against the manufacturer's schedule, then points you to shops worth trusting.",
    code: "https://github.com/westparker/shopsense",
    live: null,
    x: 0.62, y: 0.24, mx: 0.68, my: 0.24,
    links: ["dice", "achilles"]
  },
  {
    id: "dice",
    name: "Dice Roll",
    meta: "Ruby on Rails.",
    desc: "A dice-rolling app built in Ruby on Rails, made to learn how routes, controllers and views fit together.",
    code: "https://github.com/westparker/dice-roll-2-rails",
    live: null,
    x: 0.86, y: 0.15, mx: 0.84, my: 0.11,
    links: []
  },
  {
    id: "achilles",
    name: "Achilles",
    meta: "Ruby on Rails, in progress.",
    desc: "A recovery log for people coming back from injuries that needed surgery and physical therapy. Make an account, track the long road back.",
    code: null,
    live: null,
    x: 0.79, y: 0.40, mx: 0.80, my: 0.42,
    links: ["site"]
  },
  {
    id: "site",
    name: "This sky",
    meta: "HTML, CSS and canvas.",
    desc: "The site you're on. No framework, no template. Every star is drawn by a few hundred lines of JavaScript.",
    code: "https://github.com/westparker/westparker.com",
    live: null,
    x: 0.72, y: 0.62, mx: 0.56, my: 0.56,
    links: []
  }
];
