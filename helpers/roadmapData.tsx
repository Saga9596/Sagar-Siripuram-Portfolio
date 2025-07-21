export interface RoadmapNodeData {
  id: number;
  title: string;
  icon: string;
  slug: string;
  co2Saved?: number;
  subNodes?: RoadmapNodeData[];
}

export const roadmapData: RoadmapNodeData[] = [
  {
    id: 1,
    title: "About",
    icon: "User",
    slug: "/#about",
    co2Saved: 5000,
  },
  {
    id: 2,
    title: "Portfolio",
    icon: "Briefcase",
    slug: "/#portfolio",
    co2Saved: 500,
    subNodes: [
      {
        id: 201,
        title: "Work Experience",
        icon: "Building",
        slug: "/#work-experience",
        co2Saved: 200,
      },
      {
        id: 202,
        title: "Projects",
        icon: "Zap",
        slug: "/#projects",
        co2Saved: 200,
      },
      {
        id: 203,
        title: "Case Studies",
        icon: "FileText",
        slug: "/#case-studies",
        co2Saved: 100,
      },
    ],
  },
  {
    id: 3,
    title: "Skills",
    icon: "Award",
    slug: "/#skills",
  },
  {
    id: 4,
    title: "Blog",
    icon: "BookOpen",
    slug: "/#blog",
  },
  {
    id: 5,
    title: "Contact",
    icon: "Mail",
    slug: "/#contact",
  },
];