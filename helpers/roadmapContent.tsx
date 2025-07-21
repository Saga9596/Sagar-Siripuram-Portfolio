export interface RoadmapContent {
  id: number;
  title: string;
  description: string;
  keyAchievements?: string[];
  metrics?: { label: string; value: string }[];
  details?: string[];
  subContent?: RoadmapContent[];
}

export const roadmapContent: RoadmapContent[] = [
  {
    id: 1,
    title: "About",
    description: "Environmental engineer and sustainability advocate with 8+ years of experience in green technology solutions and carbon footprint reduction. Passionate about creating scalable solutions that bridge the gap between environmental responsibility and business success.",
    keyAchievements: [
      "Led 15+ sustainability projects reducing organizational carbon footprint by 40%",
      "Published research on renewable energy systems in peer-reviewed journals",
      "Certified Energy Manager (CEM) and LEED AP with Building Design + Construction specialty",
      "Keynote speaker at 12+ international sustainability conferences",
      "Mentored 25+ junior engineers in sustainable design practices"
    ],
    metrics: [
      { label: "Years Experience", value: "8+" },
      { label: "Projects Led", value: "15+" },
      { label: "CO₂ Reduction", value: "5,000 tons" },
      { label: "Certifications", value: "8" }
    ],
    details: [
      "Specialized in renewable energy integration, waste reduction systems, and circular economy design",
      "Expert in environmental impact assessment, life cycle analysis, and sustainability metrics",
      "Passionate about creating scalable solutions for climate change through innovative technology",
      "Strong background in project management, team leadership, and stakeholder engagement",
      "Committed to advancing sustainable practices in both corporate and community environments"
    ]
  },
  {
    id: 2,
    title: "Portfolio",
    description: "A comprehensive showcase of environmental projects, professional experience, and impact-driven initiatives that demonstrate expertise in sustainable technology and green solutions. Each project represents a commitment to measurable environmental impact.",
    keyAchievements: [
      "500+ tons CO₂ equivalent saved annually across all projects",
      "10+ award-winning projects recognized by industry organizations",
      "50+ client organizations served across multiple industries",
      "95% client satisfaction rate with long-term partnerships",
      "Featured in 15+ case studies and industry publications"
    ],
    metrics: [
      { label: "Total CO₂ Saved", value: "500+ tons/year" },
      { label: "Projects Completed", value: "50+" },
      { label: "Client Satisfaction", value: "98%" },
      { label: "Industries Served", value: "12" }
    ],
    details: [
      "Comprehensive project portfolio spanning renewable energy, waste management, and green building design",
      "Proven track record of delivering projects on time and under budget while exceeding environmental targets",
      "Experience working with Fortune 500 companies, startups, and government agencies",
      "Expertise in stakeholder management and cross-functional team leadership"
    ],
    subContent: [
      {
        id: 201,
        title: "Work Experience",
        description: "Professional journey spanning environmental consulting, project management, and technical leadership roles. Eight years of progressive responsibility in sustainability and green technology implementation.",
        keyAchievements: [
          "Senior Environmental Engineer at GreenTech Solutions (2020-Present)",
          "Sustainability Consultant for Fortune 500 companies (2019-2020)",
          "Project Manager for renewable energy installations (2018-2019)",
          "Environmental Analyst at EcoConsulting Group (2016-2018)",
          "Research Associate at University Climate Lab (2015-2016)"
        ],
        metrics: [
          { label: "Years Experience", value: "8+" },
          { label: "Companies Served", value: "25+" },
          { label: "Team Size Led", value: "15" },
          { label: "Budget Managed", value: "$2.5M" }
        ],
        details: [
          "Led cross-functional teams of engineers, analysts, and project coordinators",
          "Managed project budgets ranging from $50K to $2.5M with consistent delivery success",
          "Developed and implemented sustainability strategies for diverse industry sectors",
          "Built strong relationships with clients, regulatory bodies, and technology partners"
        ]
      },
      {
        id: 202,
        title: "Projects",
        description: "Innovative environmental solutions and green technology implementations that demonstrate technical expertise and measurable impact. Each project showcases different aspects of sustainable engineering.",
        keyAchievements: [
          "Smart Grid Integration for 10MW Solar Farm - 25% efficiency improvement",
          "Corporate Carbon Footprint Reduction Program - 40% reduction achieved",
          "Waste-to-Energy System Design - 1,200 tons waste diverted annually",
          "Green Building Retrofit Program - LEED Platinum certification achieved",
          "Supply Chain Sustainability Assessment - 15% carbon footprint reduction"
        ],
        metrics: [
          { label: "Active Projects", value: "12" },
          { label: "Energy Generated", value: "25 GWh" },
          { label: "Waste Diverted", value: "1,200 tons" },
          { label: "Avg. ROI", value: "280%" }
        ],
        details: [
          "Solar and wind energy installations with smart grid integration capabilities",
          "Comprehensive waste management systems incorporating circular economy principles",
          "Green building retrofits focusing on energy efficiency and occupant wellness",
          "Industrial process optimization for reduced environmental impact and cost savings"
        ]
      },
      {
        id: 203,
        title: "Case Studies",
        description: "Detailed analysis of successful environmental interventions and their measurable impact. These case studies demonstrate methodology, challenges overcome, and lessons learned.",
        keyAchievements: [
          "Manufacturing Facility Energy Optimization - 40% energy reduction, $800K annual savings",
          "Office Complex Zero-Waste Certification - 95% waste diversion rate achieved",
          "Carbon-Neutral Supply Chain Implementation - Complete scope 1, 2, 3 carbon neutrality",
          "Smart City Sustainability Plan - 30% citywide emission reduction roadmap",
          "Industrial Water Treatment Innovation - 90% water recycling rate achieved"
        ],
        metrics: [
          { label: "Studies Completed", value: "8" },
          { label: "Avg. Impact", value: "35% improvement" },
          { label: "ROI Average", value: "280%" },
          { label: "Implementation Time", value: "6 months" }
        ],
        details: [
          "Comprehensive pre and post-implementation analysis with detailed ROI calculations",
          "Stakeholder engagement strategies and change management approaches documented",
          "Technical methodologies and best practices for replication across similar projects",
          "Long-term monitoring and performance tracking systems established for sustained impact"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Skills",
    description: "Technical expertise and core competencies in environmental engineering, renewable energy systems, and sustainability management. Continuously developing skills to stay at the forefront of green technology innovation.",
    keyAchievements: [
      "Certified Energy Manager (CEM) - Association of Energy Engineers",
      "LEED AP with Building Design + Construction Specialty",
      "PMP Certified Project Manager - Project Management Institute",
      "ISO 14001 Environmental Management Systems Lead Auditor",
      "Professional Engineer (PE) License in Environmental Engineering"
    ],
    metrics: [
      { label: "Technical Skills", value: "25+" },
      { label: "Certifications", value: "8" },
      { label: "Proficiency Rating", value: "95%" },
      { label: "Training Hours", value: "200+/year" }
    ],
    details: [
      "Environmental Impact Assessment & Life Cycle Analysis - Expert level proficiency",
      "Renewable Energy Systems Design & Integration - Solar, wind, and hybrid systems",
      "Carbon Footprint Measurement & Reduction Strategies - Scope 1, 2, and 3 emissions",
      "Green Building Design & LEED Certification - All rating systems and credit categories",
      "Waste Management & Circular Economy Solutions - Zero waste and resource recovery",
      "Energy Modeling & Building Performance Analysis - EnergyPlus, eQUEST, and TRNSYS",
      "Environmental Regulatory Compliance - Federal, state, and local requirements",
      "Project Management & Team Leadership - Agile and traditional methodologies"
    ]
  },
  {
    id: 4,
    title: "Blog",
    description: "Insights, research findings, and thought leadership on environmental sustainability, clean technology, and climate action. Sharing knowledge to accelerate the adoption of sustainable practices across industries.",
    keyAchievements: [
      "50+ published articles on sustainability topics with 10,000+ monthly readers",
      "Featured contributor to GreenBiz, Environmental Leader, and Sustainable Brands",
      "Weekly newsletter with 2,500+ subscribers and 45% open rate",
      "Guest expert on 15+ podcasts and webinars reaching 50,000+ listeners",
      "Social media following of 8,000+ engaged sustainability professionals"
    ],
    metrics: [
      { label: "Articles Published", value: "50+" },
      { label: "Monthly Readers", value: "10K+" },
      { label: "Social Shares", value: "5K+" },
      { label: "Newsletter Subscribers", value: "2.5K" }
    ],
    details: [
      "Weekly insights on renewable energy trends, policy developments, and technology innovations",
      "In-depth case study analyses and project retrospectives with actionable takeaways",
      "Industry analysis and policy recommendations for accelerating sustainability adoption",
      "Technical tutorials and best practice guides for environmental professionals",
      "Guest interviews with industry leaders and innovative companies",
      "Data-driven analysis of sustainability metrics and reporting frameworks"
    ]
  },
  {
    id: 5,
    title: "Contact",
    description: "Ready to collaborate on your next sustainability project or discuss how environmental engineering can drive your organization's climate goals. Let's work together to create measurable environmental impact and business value.",
    keyAchievements: [
      "Available for consulting projects, strategic advisory, and technical implementation",
      "Speaking engagements and workshops on sustainability topics for conferences and corporate events",
      "Collaborative research opportunities with universities and think tanks",
      "Board advisory positions for sustainability-focused organizations",
      "Mentoring and professional development for emerging environmental professionals"
    ],
    metrics: [
      { label: "Response Time", value: "< 24 hrs" },
      { label: "Project Success Rate", value: "98%" },
      { label: "Client Retention", value: "85%" },
      { label: "Referral Rate", value: "60%" }
    ],
    details: [
      "Professional consulting services for sustainability strategy, environmental compliance, and green technology implementation",
      "Technical workshops and training programs for teams and organizations transitioning to sustainable practices",
      "Research collaboration and advisory services for academic institutions and policy organizations",
      "Speaking opportunities for conferences, corporate events, and educational institutions",
      "Board positions and strategic advisory roles for sustainability-focused startups and nonprofits",
      "Professional networking through LinkedIn, industry associations, and sustainability communities"
    ]
  }
];