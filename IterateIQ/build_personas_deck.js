const pptxgen = require("pptxgenjs");

// H9 Brand palette
const NAVY = "142338";
const NAVY_DEEP = "0B1626";
const AMBER = "FF8C00";
const AMBER_SOFT = "FFB347";
const CREAM = "FAF8F4";
const CREAM_DARK = "EFE9DD";
const INK = "1A1A1A";
const MUTED = "6B6B6B";
const LINE = "D9D2C2";
const RED = "C0392B";
const GREEN = "2E7D5B";

const HEAD = "Georgia";
const BODY = "Calibri";

let pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.author = "H9 Partners";
pres.title = "IterateIQ — UX Persona Research";

const SW = 13.333;
const SH = 7.5;

// ---------- helpers ----------
function chip(slide, x, y, w, h, label, fillColor, textColor) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, fill: { color: fillColor }, line: { color: fillColor }, rectRadius: 0.08
  });
  slide.addText(label, {
    x, y, w, h, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 10, color: textColor, bold: true, margin: 0
  });
}

function pageNum(slide, n, total) {
  slide.addText(`H9 PARTNERS  •  ${n} / ${total}`, {
    x: 0.5, y: SH - 0.4, w: 5, h: 0.3,
    fontFace: BODY, fontSize: 9, color: MUTED, charSpacing: 4
  });
}

function brandMark(slide, color) {
  // H9 monogram in upper right
  slide.addShape(pres.shapes.RECTANGLE, {
    x: SW - 0.95, y: 0.45, w: 0.5, h: 0.5,
    fill: { color: AMBER }, line: { color: AMBER }
  });
  slide.addText("H9", {
    x: SW - 0.95, y: 0.45, w: 0.5, h: 0.5,
    align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 16, bold: true, color: NAVY, margin: 0
  });
}

const TOTAL = 6;

// ---------- SLIDE 1: H9 Partners + Mission ----------
{
  let s = pres.addSlide();
  s.background = { color: NAVY };

  // Amber side band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.4, h: SH, fill: { color: AMBER }, line: { color: AMBER }
  });

  // Big monogram
  s.addText("H9", {
    x: 1, y: 0.7, w: 3, h: 1.6,
    fontFace: HEAD, fontSize: 96, bold: true, color: AMBER, margin: 0
  });
  s.addText("PARTNERS", {
    x: 1, y: 2.25, w: 6, h: 0.5,
    fontFace: BODY, fontSize: 18, color: CREAM, bold: true, charSpacing: 12, margin: 0
  });

  // Eyebrow
  s.addText("UX PERSONA RESEARCH  •  MAY 2026", {
    x: 1, y: 3.2, w: 8, h: 0.3,
    fontFace: BODY, fontSize: 11, color: AMBER_SOFT, bold: true, charSpacing: 6, margin: 0
  });

  // Title
  s.addText("Building tools that work the way contractors actually work.", {
    x: 1, y: 3.6, w: 11, h: 1.6,
    fontFace: HEAD, fontSize: 38, color: CREAM, bold: true, margin: 0
  });

  // Mission block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1, y: 5.5, w: 0.06, h: 1.3, fill: { color: AMBER }, line: { color: AMBER }
  });
  s.addText("OUR MISSION", {
    x: 1.25, y: 5.5, w: 6, h: 0.3,
    fontFace: BODY, fontSize: 10, color: AMBER, bold: true, charSpacing: 6, margin: 0
  });
  s.addText(
    "H9 Partners builds practical software for the working professional. We design tools that respect the complexity of real contract work — the scope changes, the messy timelines, the client conversations — and turn that complexity into clarity.",
    {
      x: 1.25, y: 5.85, w: 10.5, h: 1.3,
      fontFace: BODY, fontSize: 14, color: CREAM, margin: 0
    }
  );

  s.addText(`01 / ${TOTAL}`, {
    x: SW - 1.5, y: SH - 0.5, w: 1, h: 0.3,
    fontFace: BODY, fontSize: 10, color: AMBER, bold: true, align: "right", margin: 0
  });
}

// ---------- SLIDE 2: Research intro ----------
{
  let s = pres.addSlide();
  s.background = { color: CREAM };
  brandMark(s);

  s.addText("CHAPTER ONE", {
    x: 0.7, y: 0.55, w: 5, h: 0.3,
    fontFace: BODY, fontSize: 11, color: AMBER, bold: true, charSpacing: 6, margin: 0
  });
  s.addText("Researching the people behind the platform.", {
    x: 0.7, y: 0.95, w: 11.5, h: 1.5,
    fontFace: HEAD, fontSize: 36, color: NAVY, bold: true, margin: 0
  });

  // Divider line
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 2.55, w: 1.2, h: 0.04, fill: { color: AMBER }, line: { color: AMBER }
  });

  // Body
  s.addText(
    "Before we shipped a single new feature into IterateIQ, we asked a question every product team should ask first: who actually uses this — and where is it failing them?",
    {
      x: 0.7, y: 2.85, w: 11.5, h: 1.0,
      fontFace: BODY, fontSize: 16, color: INK, margin: 0
    }
  );
  s.addText(
    "We focused on H9's two core target audiences — the freelancers doing the work, and the project owners overseeing it. Each persona below represents a real pattern of behavior we observed in their day-to-day, and the pain points they'd struggle with regardless of what tool they're using today.",
    {
      x: 0.7, y: 4.0, w: 11.5, h: 1.6,
      fontFace: BODY, fontSize: 14, color: MUTED, margin: 0
    }
  );

  // Method chips
  const methods = [
    { label: "PRODUCT AUDIT", color: NAVY },
    { label: "FEATURE TRACE", color: NAVY },
    { label: "FRICTION MAPPING", color: NAVY },
    { label: "PERSONA SYNTHESIS", color: AMBER }
  ];
  let cx = 0.7;
  methods.forEach(m => {
    chip(s, cx, 6.0, 2.4, 0.5, m.label, m.color, m.color === AMBER ? NAVY : CREAM);
    cx += 2.6;
  });

  s.addText(`02 / ${TOTAL}`, {
    x: SW - 1.5, y: SH - 0.5, w: 1, h: 0.3,
    fontFace: BODY, fontSize: 10, color: MUTED, bold: true, align: "right", margin: 0
  });
}

// ---------- SLIDE 3: What is IterateIQ + value props ----------
{
  let s = pres.addSlide();
  s.background = { color: CREAM };
  brandMark(s);

  s.addText("THE PRODUCT", {
    x: 0.7, y: 0.55, w: 5, h: 0.3,
    fontFace: BODY, fontSize: 11, color: AMBER, bold: true, charSpacing: 6, margin: 0
  });
  s.addText("What is IterateIQ?", {
    x: 0.7, y: 0.95, w: 11.5, h: 0.9,
    fontFace: HEAD, fontSize: 36, color: NAVY, bold: true, margin: 0
  });

  s.addText(
    "IterateIQ is H9's contract management platform — a single system where contractors and managers can scope contracts, define phases, log progress, and track the health of every project in their portfolio. Built for service businesses that have outgrown spreadsheets but don't need enterprise overhead.",
    {
      x: 0.7, y: 2.0, w: 11.5, h: 1.4,
      fontFace: BODY, fontSize: 14, color: INK, margin: 0
    }
  );

  // Value props as 4 cards
  s.addText("CORE VALUE POINTS", {
    x: 0.7, y: 3.7, w: 8, h: 0.3,
    fontFace: BODY, fontSize: 10, color: NAVY, bold: true, charSpacing: 6, margin: 0
  });

  const props = [
    { num: "01", title: "Phase-Based Clarity", body: "Every contract breaks down into priced phases with explicit deliverables — clients know what they're paying for, contractors know what 'done' means." },
    { num: "02", title: "Real-Time Health Scores", body: "Project health is visualized continuously, not buried in status meetings. Spot blocked work and budget risk before it escalates." },
    { num: "03", title: "Built for Iteration", body: "The platform assumes scope changes. Activity logs, version-tracked deliverables, and phase updates handle the messy middle of real projects." },
    { num: "04", title: "H9 Design Standard", body: "A clean, focused interface — navy, amber, and cream — that respects the user's attention. No dashboard bloat. No feature theatre." }
  ];

  const cardW = 2.95;
  const cardH = 2.7;
  const startX = 0.7;
  const startY = 4.15;
  const gap = 0.18;

  props.forEach((p, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cardW, h: cardH,
      fill: { color: "FFFFFF" }, line: { color: LINE, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cardW, h: 0.08, fill: { color: AMBER }, line: { color: AMBER }
    });
    s.addText(p.num, {
      x: x + 0.25, y: startY + 0.25, w: 1.5, h: 0.4,
      fontFace: HEAD, fontSize: 22, color: AMBER, bold: true, margin: 0
    });
    s.addText(p.title, {
      x: x + 0.25, y: startY + 0.75, w: cardW - 0.4, h: 0.7,
      fontFace: HEAD, fontSize: 18, color: NAVY, bold: true, margin: 0
    });
    s.addText(p.body, {
      x: x + 0.25, y: startY + 1.45, w: cardW - 0.4, h: 1.2,
      fontFace: BODY, fontSize: 11, color: MUTED, margin: 0
    });
  });

  s.addText(`03 / ${TOTAL}`, {
    x: SW - 1.5, y: SH - 0.4, w: 1, h: 0.3,
    fontFace: BODY, fontSize: 10, color: MUTED, bold: true, align: "right", margin: 0
  });
}

// ---------- PERSONA SLIDE BUILDER ----------
function personaSlide(idx, p) {
  let s = pres.addSlide();
  s.background = { color: CREAM };
  brandMark(s);

  // Eyebrow
  s.addText(`PERSONA 0${idx - 3}  •  ${p.tag}`, {
    x: 0.7, y: 0.55, w: 8, h: 0.3,
    fontFace: BODY, fontSize: 11, color: AMBER, bold: true, charSpacing: 6, margin: 0
  });
  // Name + subtitle
  s.addText(p.title, {
    x: 0.7, y: 0.95, w: 11.5, h: 0.7,
    fontFace: HEAD, fontSize: 32, color: NAVY, bold: true, margin: 0
  });
  s.addText(p.subtitle, {
    x: 0.7, y: 1.6, w: 11.5, h: 0.5,
    fontFace: BODY, fontSize: 14, color: MUTED, italic: true, margin: 0
  });

  // LEFT COLUMN: profile card (navy)
  const lx = 0.7, ly = 2.4, lw = 4.0, lh = 4.6;
  s.addShape(pres.shapes.RECTANGLE, {
    x: lx, y: ly, w: lw, h: lh,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: lx, y: ly, w: 0.08, h: lh, fill: { color: AMBER }, line: { color: AMBER }
  });

  // Avatar circle
  s.addShape(pres.shapes.OVAL, {
    x: lx + 0.4, y: ly + 0.35, w: 1.0, h: 1.0,
    fill: { color: AMBER }, line: { color: AMBER }
  });
  s.addText(p.initials, {
    x: lx + 0.4, y: ly + 0.35, w: 1.0, h: 1.0,
    align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 28, color: NAVY, bold: true, margin: 0
  });

  s.addText(p.name, {
    x: lx + 1.55, y: ly + 0.4, w: lw - 1.7, h: 0.45,
    fontFace: HEAD, fontSize: 18, color: CREAM, bold: true, margin: 0
  });
  s.addText(p.role, {
    x: lx + 1.55, y: ly + 0.88, w: lw - 1.7, h: 0.45,
    fontFace: BODY, fontSize: 11, color: AMBER_SOFT, margin: 0
  });

  // Stats rows
  const statsY = ly + 1.7;
  const stats = [
    ["AGE", p.age],
    ["LOCATION", p.location],
    ["TECH COMFORT", p.tech],
    ["CONTRACTS", p.contracts]
  ];
  stats.forEach((row, i) => {
    const ry = statsY + i * 0.62;
    s.addText(row[0], {
      x: lx + 0.3, y: ry, w: 1.5, h: 0.25,
      fontFace: BODY, fontSize: 9, color: AMBER, bold: true, charSpacing: 4, margin: 0
    });
    s.addText(row[1], {
      x: lx + 0.3, y: ry + 0.25, w: lw - 0.5, h: 0.32,
      fontFace: BODY, fontSize: 12, color: CREAM, margin: 0
    });
  });

  // Quote at bottom of left card
  s.addShape(pres.shapes.RECTANGLE, {
    x: lx + 0.3, y: ly + lh - 0.05, w: lw - 0.6, h: 0.02,
    fill: { color: AMBER }, line: { color: AMBER }
  });

  // RIGHT COLUMN
  const rx = 5.0, ry = 2.4, rw = 7.6;

  // Goals header
  s.addText("GOALS", {
    x: rx, y: ry, w: 4, h: 0.3,
    fontFace: BODY, fontSize: 10, color: AMBER, bold: true, charSpacing: 6, margin: 0
  });
  s.addText(
    p.goals.map((g, i) => ({ text: g, options: { bullet: { code: "25A0" }, color: INK, breakLine: i < p.goals.length - 1 } })),
    {
      x: rx, y: ry + 0.32, w: rw, h: 1.0,
      fontFace: BODY, fontSize: 12, color: INK, paraSpaceAfter: 4, margin: 0
    }
  );

  // Pain points header
  const py = ry + 1.45;
  s.addText("DAY-TO-DAY PAIN POINTS", {
    x: rx, y: py, w: 7, h: 0.3,
    fontFace: BODY, fontSize: 10, color: AMBER, bold: true, charSpacing: 6, margin: 0
  });

  // Pain point cards (up to 3, compact)
  const pCardW = (rw - 0.3) / p.pains.length;
  p.pains.forEach((pain, i) => {
    const cx = rx + i * (pCardW + 0.15);
    const cy = py + 0.4;
    const ch = 2.55;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: pCardW - 0.05, h: ch,
      fill: { color: "FFFFFF" }, line: { color: LINE, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: 0.06, h: ch, fill: { color: pain.severityColor }, line: { color: pain.severityColor }
    });
    s.addText(pain.severity, {
      x: cx + 0.2, y: cy + 0.15, w: pCardW - 0.4, h: 0.25,
      fontFace: BODY, fontSize: 8, color: pain.severityColor, bold: true, charSpacing: 4, margin: 0
    });
    s.addText(pain.title, {
      x: cx + 0.2, y: cy + 0.42, w: pCardW - 0.3, h: 0.6,
      fontFace: HEAD, fontSize: 13, color: NAVY, bold: true, margin: 0
    });
    s.addText(pain.body, {
      x: cx + 0.2, y: cy + 1.1, w: pCardW - 0.3, h: 1.4,
      fontFace: BODY, fontSize: 10, color: MUTED, margin: 0
    });
  });

  // Quote bar at bottom
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: SH - 0.95, w: SW - 1.4, h: 0.55,
    fill: { color: CREAM_DARK }, line: { color: CREAM_DARK }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: SH - 0.95, w: 0.06, h: 0.55,
    fill: { color: AMBER }, line: { color: AMBER }
  });
  s.addText(`"${p.quote}"`, {
    x: 0.95, y: SH - 0.95, w: SW - 1.7, h: 0.55,
    valign: "middle",
    fontFace: HEAD, fontSize: 13, color: NAVY, italic: true, margin: 0
  });

  s.addText(`0${idx} / ${TOTAL}`, {
    x: SW - 1.5, y: SH - 0.4, w: 1, h: 0.3,
    fontFace: BODY, fontSize: 10, color: MUTED, bold: true, align: "right", margin: 0
  });
}

// ---------- PERSONAS DATA ----------
const personas = [
  {
    tag: "THE JUGGLER",
    title: "Marcus Chen — Freelancer",
    subtitle: "The independent freelancer running multiple client engagements at once.",
    initials: "MC",
    name: "Marcus Chen",
    role: "Freelance UX Designer & Front-End Dev",
    age: "32",
    location: "Austin, TX (remote)",
    tech: "High — Figma, VS Code, Notion",
    contracts: "3-6 active, $2K-$25K each",
    goals: [
      "Keep every client engagement moving without dropping balls",
      "Get paid on time for the work he actually delivered",
      "Spend more hours doing the work, fewer hours managing it"
    ],
    pains: [
      { severity: "CRITICAL", severityColor: RED, title: "Scope creep with no paper trail", body: "Clients ask for 'one more small thing' over Slack and email. Without a record, those asks pile into unpaid work and hard conversations later." },
      { severity: "CRITICAL", severityColor: RED, title: "Chasing invoices and payment", body: "Work ships, but payment lags. Marcus burns hours each month following up, reconciling hours, and re-explaining what was delivered for which milestone." },
      { severity: "HIGH", severityColor: AMBER, title: "Context-switching across clients", body: "Juggling 3-6 projects in parallel means constant mental reload. When a client pings him, it takes 20 minutes to remember where they left off." }
    ],
    quote: "Every hour I spend hunting through Slack threads to figure out what I owe a client is an hour I'm not getting paid for."
  },
  {
    tag: "THE OVERSEER",
    title: "Linda Reyes — Project Owner",
    subtitle: "The operations leader accountable for delivery across her team.",
    initials: "LR",
    name: "Linda Reyes",
    role: "Operations Director, Services Firm",
    age: "47",
    location: "Miami, FL",
    tech: "Moderate — strong with spreadsheets",
    contracts: "Oversees 10-20 across team",
    goals: [
      "Know the real status of every active engagement at any moment",
      "Catch problems before clients escalate to her",
      "Spend less of her week in status meetings"
    ],
    pains: [
      { severity: "CRITICAL", severityColor: RED, title: "Status updates live in 14 places", body: "Her team's progress is scattered across Slack DMs, email threads, spreadsheets, and weekly standups. Pulling a real picture means chasing every contractor individually." },
      { severity: "CRITICAL", severityColor: RED, title: "Surprise budget overruns", body: "She finds out a project is over budget the week it ships, not the week it goes off-track. By the time she sees the variance, it's already a client conversation." },
      { severity: "HIGH", severityColor: AMBER, title: "No view of who's overloaded", body: "Some contractors are buried, others have capacity — but she has no way to see workload across the team without asking each one directly." }
    ],
    quote: "By the time I hear a project is in trouble, the client has already heard it first."
  }
];

personas.forEach((p, i) => personaSlide(i + 4, p));

// ---------- SLIDE 9: Cross-Persona Pain Point Matrix ----------
{
  let s = pres.addSlide();
  s.background = { color: CREAM };
  brandMark(s);

  s.addText("THE FULL PICTURE", {
    x: 0.7, y: 0.55, w: 8, h: 0.3,
    fontFace: BODY, fontSize: 11, color: AMBER, bold: true, charSpacing: 6, margin: 0
  });
  s.addText("Cross-Persona Pain Point Matrix", {
    x: 0.7, y: 0.95, w: 11.5, h: 0.7,
    fontFace: HEAD, fontSize: 30, color: NAVY, bold: true, margin: 0
  });
  s.addText(
    "Where the friction overlaps — and where to invest first.",
    {
      x: 0.7, y: 1.6, w: 11.5, h: 0.4,
      fontFace: BODY, fontSize: 13, color: MUTED, italic: true, margin: 0
    }
  );

  // Build matrix
  const sevColors = {
    "C": RED,
    "H": AMBER,
    "M": "B89B5E",
    "L": "9AA39A",
    "—": "DADADA"
  };
  const sevLabels = { "C": "CRITICAL", "H": "HIGH", "M": "MED", "L": "LOW", "—": "—" };

  const rows = [
    ["Scope creep with no paper trail",            "C", "H"],
    ["Chasing invoices and getting paid on time",  "C", "M"],
    ["Context-switching across many projects",     "C", "H"],
    ["Status updates scattered across tools",      "H", "C"],
    ["Surprise budget overruns",                   "H", "C"],
    ["No visibility into team workload",           "—", "C"],
    ["Time lost in status meetings & check-ins",   "M", "C"],
    ["Communicating progress to clients",          "C", "H"],
    ["Reconciling delivered work to a milestone",  "C", "H"],
    ["Reporting up to stakeholders",               "L", "C"]
  ];
  const headers = ["DAY-TO-DAY PAIN POINT", "MARCUS  •  FREELANCER", "LINDA  •  PROJECT OWNER"];

  // Table layout
  const tx = 0.7;
  const ty = 2.2;
  const labelW = 5.5;
  const cellW = 3.2;
  const rowH = 0.4;
  const headerH = 0.45;

  const NUM_COLS = 2;

  // Header row
  s.addShape(pres.shapes.RECTANGLE, {
    x: tx, y: ty, w: labelW + cellW * NUM_COLS, h: headerH,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  headers.forEach((h, i) => {
    const cx = i === 0 ? tx + 0.2 : tx + labelW + (i - 1) * cellW;
    const cw = i === 0 ? labelW - 0.2 : cellW;
    s.addText(h, {
      x: cx, y: ty, w: cw, h: headerH,
      align: i === 0 ? "left" : "center", valign: "middle",
      fontFace: BODY, fontSize: 11, color: CREAM, bold: true, charSpacing: 4, margin: 0
    });
  });

  // Data rows
  rows.forEach((row, ri) => {
    const ry = ty + headerH + ri * rowH;
    // Zebra
    if (ri % 2 === 0) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: tx, y: ry, w: labelW + cellW * NUM_COLS, h: rowH,
        fill: { color: "FFFFFF" }, line: { color: LINE, width: 0.5 }
      });
    } else {
      s.addShape(pres.shapes.RECTANGLE, {
        x: tx, y: ry, w: labelW + cellW * NUM_COLS, h: rowH,
        fill: { color: CREAM_DARK }, line: { color: LINE, width: 0.5 }
      });
    }

    // Label
    s.addText(row[0], {
      x: tx + 0.2, y: ry, w: labelW - 0.3, h: rowH, valign: "middle",
      fontFace: BODY, fontSize: 12, color: INK, bold: true, margin: 0
    });

    // Severity pills per persona
    for (let pi = 0; pi < NUM_COLS; pi++) {
      const sev = row[pi + 1];
      const cellX = tx + labelW + pi * cellW;
      const pillW = 1.6;
      const pillH = 0.26;
      const pillX = cellX + (cellW - pillW) / 2;
      const pillY = ry + (rowH - pillH) / 2;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: pillX, y: pillY, w: pillW, h: pillH,
        fill: { color: sevColors[sev] }, line: { color: sevColors[sev] }, rectRadius: 0.05
      });
      s.addText(sevLabels[sev], {
        x: pillX, y: pillY, w: pillW, h: pillH,
        align: "center", valign: "middle",
        fontFace: BODY, fontSize: 9,
        color: sev === "—" ? MUTED : "FFFFFF",
        bold: true, charSpacing: 3, margin: 0
      });
    }
  });

  // Legend / takeaway strip
  const legY = ty + headerH + rows.length * rowH + 0.25;
  s.addText("SEVERITY", {
    x: tx, y: legY, w: 1.2, h: 0.3,
    fontFace: BODY, fontSize: 9, color: NAVY, bold: true, charSpacing: 4, margin: 0
  });
  const legendItems = [
    { label: "CRITICAL", color: RED },
    { label: "HIGH", color: AMBER },
    { label: "MED", color: "B89B5E" },
    { label: "LOW", color: "9AA39A" },
    { label: "N/A", color: "DADADA" }
  ];
  let legX = tx + 1.1;
  legendItems.forEach(li => {
    s.addShape(pres.shapes.OVAL, {
      x: legX, y: legY + 0.06, w: 0.18, h: 0.18,
      fill: { color: li.color }, line: { color: li.color }
    });
    s.addText(li.label, {
      x: legX + 0.25, y: legY, w: 0.9, h: 0.3, valign: "middle",
      fontFace: BODY, fontSize: 9, color: MUTED, bold: true, charSpacing: 3, margin: 0
    });
    legX += 1.2;
  });

  s.addText(`${TOTAL} / ${TOTAL}`, {
    x: SW - 1.5, y: SH - 0.4, w: 1, h: 0.3,
    fontFace: BODY, fontSize: 10, color: MUTED, bold: true, align: "right", margin: 0
  });
}

pres.writeFile({ fileName: "/Users/jakeher831/Documents/H9 Contract Work/IterateIQ/IterateIQ_Personas.pptx" })
  .then(fn => console.log("Wrote:", fn));
