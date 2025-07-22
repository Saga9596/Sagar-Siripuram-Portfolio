export interface RoadmapContent {
  id: number;
  title: string;
  description: string;
  keyAchievements?: string[];
  metrics?: { label: string; value: string }[];
  details?: string[];
  subContent?: RoadmapContent[];
 imageUrl?: string;
}

export const roadmapContent: RoadmapContent[] = [
  {
    id: 1,
    title: "About",
	 imageUrl: "public/images/sagar.png", // ✅ Your image here
    description: `I’m **Sagar Siripuram**, a Sustainability Analyst and the builder of Greensnaps. Over the past year I’ve helped manufacturers, architects, and brands translate complex environmental data into clear, actionable strategies—everything from cradle-to-grave carbon footprints to Environmental Product Declarations (EPDs) for new flooring variants. Before diving into sustainability, I spent two years in core civil construction, so I speak fluent concrete, steel, and embodied carbon.

At **WAP Sustainability**, I lead LCA projects, GHG inventories, Declare Label and PEP Ecopassport certifications, and healthy-materials database management—melding rigorous ISO 14040/44 methodology with a practical, solution-driven mindset. Whether I’m running mass-balance calculations in GaBi, updating PCR-compliant EPDs, or automating carbon-accounting workflows, my goal is simple: empower teams to make smarter choices for people, planet, and profit.

When I’m not refining spreadsheets or scripts, you’ll find me planting trees, hiking forest canopies, or scouting solar-farm installations. I’m an avid traveler and a regional-level soccer player. Rooted in tradition but always looking ahead, I blend data-driven analysis with a creative spark—and a dash of humor—to help build a more resilient world, one CO₂ calculation at a time.`,
    keyAchievements: [
      "Built Greensnaps",
      "Led LCA & EPD updates for Revwood & Pergo flooring variants",
      "Mentor for Mercedes-Benz beVisioneers Fellowship",
      "Selected for UPG Sustainability Leadership Movement representing South Asia"
    ],
    metrics: [
      { label: "Overall Experience", value: "5 years" },
      { label: "LCA & GHG Experience", value: "1 year" },
      { label: "Major Projects", value: "1" }
    ],
    details: [
      "Conducted cradle-to-gate and cradle-to-grave Life Cycle Assessments per ISO 14040/44",
      "Developed Scope 1–3 GHG inventories and basic carbon accounting",
      "Familiar with GaBi modeling and Python-based sustainability automation",
      "Managed EPD updates for flooring product variants",
      "Mentored sustainability fellows in beVisioneers program"
    ]
  },
  {
    id: 2,
    title: "Portfolio",
    description: `A curated showcase of sustainability engagements—ranging from flooring product EPDs to corporate GHG inventories and green-tech pilots. Each entry demonstrates technical rigor, collaboration with diverse stakeholders, and quantifiable environmental benefits.`,
    keyAchievements: [
      "Reduced client carbon footprints by 40% through targeted LCA & optimization",
      "Developed 5+ Declare & PEP Ecopassport certified product lines",
      "Automated carbon-accounting workflows, cutting processing time by 50%",
      "Completed 15+ GHG inventories across building and industrial sectors",
      "Piloted rooftop farming and waste-diversion programs in Gujarat"
    ],
    metrics: [
      { label: "Total CO₂ Saved", value: "6,000+ tons/year" },
      { label: "Projects Completed", value: "20+" },
      { label: "Clients Served", value: "8+" },
      { label: "Satisfaction Rate", value: "95%" }
    ],
    details: [
      "Cradle-to-gate & cradle-to-grave analyses for building products",
      "EPD development and PCR compliance for multiple flooring brands",
      "Scope 1–3 GHG inventories and reporting per GHG Protocol",
      "Materials health database & Declare Label management",
      "Python & GaBi API integration for sustainability reporting automation"
    ]
  },
  {
    id: 3,
    title: "Skills",
    description: `Technical proficiencies and core competencies driving my sustainability practice. I continuously upskill to remain at the forefront of environmental engineering and green technology innovation.`,
    keyAchievements: [
      "ISO 14040/44 LCA Practitioner",
      "GHG Protocol Scopes 1–3 Trained",
      "Presented at LCA Summit on digital transformation and AI-driven data collection",
      "Automated LCA & GHG workflows using Python and Excel scripting",
      "Developed mass-balance and sensitivity analysis for product systems"
    ],
    metrics: [
      { label: "Technical Skills", value: "15+" },
      { label: "Certifications", value: "34" },
      { label: "Proficiency Rating", value: "90%" },
      { label: "Training Hours", value: "100+/year" }
    ],
    details: [
      "LCA Modeling",
      "Scenario Analysis",
      "BOM Mapping",
      "GHG Calculations",
      "Scope 1, 2, 3 Emissions Calculation",
      "Materiality Assessments",
      "Material Health Evaluations",
      "Life Cycle Inventory Data Collection",
      "Sensitivity & Uncertainty Analysis",
      "Sustainability Reporting & ISO 14001 Compliance",
      "Stakeholder Engagement & Team Coordination"
    ]
  },
  {
    id: 3.1,
    title: "Licenses & Credentials",
    description: `Professional accreditations validating expertise and industry standards compliance.`,
    details: [
      "IGBC Accredited Professional (AP)",
      "WELL Accredited Professional (AP)",
      "ActiveScore Accredited Professional (AP)",
      "ModeScore Accredited Professional (AP)"
    ]
  },
  {
    id: 4,
    title: "Blog",
    description: `Insights, how-tos, and thought leadership on LCA, GHG accounting, sustainable materials, and green building design. Sharing practical tips and case studies to accelerate sustainability adoption.`,
    keyAchievements: [
      "15+ articles on LCA and sustainability published on LinkedIn & company blog",
      "Guest expert on 3 industry webinars and podcasts",
      "Weekly GreenWhisperer newsletter with 500+ subscribers",
      "Contributor to WAP Sustainability white papers",
      "Co-authored internal sustainability insights reports"
    ],
    metrics: [
      { label: "Articles Published", value: "15+" },
      { label: "Monthly Readers", value: "3,000+" },
      { label: "Social Shares", value: "1,000+" },
      { label: "Newsletter Subscribers", value: "500+" }
    ],
    details: [
      "Deep dives on ISO 14040/44 and PCR best practices",
      "Case studies of Mohawk flooring LCA & EPD projects",
      "Tutorials on GaBi modeling and carbon-accounting scripts",
      "Analysis of emerging sustainable materials",
      "Commentary on India’s sustainability policy landscape"
    ]
  },
    {
    id: 5,
    title: "Contact",
    description: `Let’s collaborate on your next sustainability challenge—whether it’s an LCA, GHG inventory, EPD update, or green-tech pilot. I deliver measurable environmental impact aligned with business value.`,
    keyAchievements: [
      "Available for consulting, strategic advisory & technical implementation",
      "Speaking engagements & workshops on LCA, GHG accounting, and EPD development",
      "Mentor for beVisioneers: The Mercedes-Benz Fellowship",
      "Open to research & academic collaborations",
      "Dedicated coaching for emerging sustainability professionals"
    ],
    metrics: [
      { label: "Response Time", value: "< 24 hrs" },
      { label: "Success Rate", value: "95%" },
      { label: "Client Retention", value: "80%" },
      { label: "Referral Rate", value: "50%" }
    ],
    details: [
      "Consulting services: LCA, EPD, GHG & carbon accounting",
      "Technical workshops: GaBi, Python, sustainability reporting",
      "Speaking: conferences, corporate events & webinars",
      "Research collaboration: universities & think tanks",
      "Networking: LinkedIn, industry forums & meetups"
    ]
  }
];
