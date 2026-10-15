// Site-wide facts — every value traces to docs/portfolio/13-open-decisions.md.

export const site = {
  name: "Mikel Arnao",
  role: "Product Designer & Design Engineer",
  headline: "From concept to specification.",
  supporting:
    "I'm an Industrial Design and Product Development Engineering student at Mondragon Unibertsitatea. In team projects I usually lead the development side: CAD, materials, regulations, manufacturing and life-cycle analysis. I also produce the final renders that present the result.",
  availability: "Open to internships and master's programmes · 2027",
  signOff: "Designing what comes next.",
  location: "Basque Country, Spain",
  email: "arnaomikel10@gmail.com",
  linkedin: "https://www.linkedin.com/in/mikelarnao",
  education: {
    institution: "Mondragon Unibertsitatea",
    faculty: "Faculty of Engineering",
    degree: "BSc Industrial Design and Product Development Engineering",
    years: "2023 – 2027 (expected)",
    current: "4th year",
  },
  languages: [
    { name: "Basque", level: "Native" },
    { name: "Spanish", level: "Native" },
    { name: "English", level: "C1 (Cambridge CAE)" },
  ],
} as const;

/** Absolute site URL for canonical links, sitemap and Open Graph (08 §9). */
export const siteUrl = new URL(process.env.SITE_URL ?? "http://localhost:3000");
