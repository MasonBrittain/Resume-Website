// All site content lives here. Edit this file to update the website —
// the components just render whatever is in this object.

const resume = {
  personalInfo: {
    name: "Mason Brittain",
    title: "Software Engineer & Business Intelligence Consultant",
    tagline:
      "I like building and scaling cloud systems — the pipelines, services, and analytics that turn raw data into decisions.",
    currentRole: "Software Engineer @ Raining Virtue",
    location: "Seattle, WA",
    email: "masonbrittain@gmail.com",
    phone: "(425) 314-6272",
    linkedin: "https://linkedin.com/in/mason-brittain-4a265a1aa",
    github: "https://github.com/MasonBrittain",
    summary: [
      "I'm a software engineer who builds the systems data runs on — distributed pipelines, automation, and the cloud infrastructure behind them. On a Vigor engagement I rebuilt legacy batch ETL on Apache Spark for a 30% processing speedup, wrote the Python automation that moved customer data off local servers into cloud storage, and consolidated three legacy databases into one. Query tuning there took reports from five minutes down to ten seconds.",
      "Alongside that I consult on analytics and BI, where I engineer SQL backends — stored procedures, views, reusable data models — and the Power BI layer on top of them, so finance and operations teams can see their business in near real time instead of waiting on a spreadsheet. On my own time I build cloud-native Azure ETL pipelines with real data-quality guarantees, plus developer tooling and full-stack side projects.",
      "I graduated from the University of Washington with dual bachelor's degrees in Computer Science & Information Technology and Marketing Management, so I'm most at home where the engineering meets the decisions it drives.",
    ],
  },

  experience: [
    {
      company: "Raining Virtue",
      position: "Data Engineer / Business Intelligence Consultant",
      duration: "Feb 2026 – Present",
      location: "Seattle, WA",
      current: true,
      engagements: [
        {
          client: "Vigor — Data Engineer",
          bullets: [
            "30% faster data processing: redesigned legacy batch ETL pipelines using Apache Spark.",
            "5 hours/week saved: built an automated Python script to migrate customer data from local servers to cloud storage, replacing a manual process.",
            "3 legacy databases consolidated into 1 central database, reducing redundancy and simplifying data management.",
            "Optimized inefficient SQL queries, cutting report load times from 5 minutes to 10 seconds.",
          ],
        },
        {
          client: "Thompson Metal Fab — Analytics/BI",
          bullets: [
            "Engineered SQL-based backend reporting solutions — stored procedures, views, and reusable data models — and optimized queries with automated data integration, reducing manual data preparation time by 50% and improving report delivery to near real-time.",
            "80% faster report generation, 300+ staff hours saved annually: automated reporting workflows by replacing manual Excel processes with SQL and Power BI solutions.",
            "7 Power BI dashboards and data pipelines built and maintained across finance and project management departments, reducing manual reporting effort by 40%.",
            "50% faster troubleshooting: developed an SSIS execution monitoring dashboard that cut production issue resolution time.",
          ],
        },
        {
          client: "Aventiv — Oracle CX Implementation",
          bullets: [
            "Coordinated implementation activities for an Oracle CX support project by managing deliverables, facilitating stakeholder communication, and supporting cross-functional technical teams.",
            "Gathered and documented business requirements, workflows, and user stories that translated operational needs into actionable technical deliverables.",
          ],
        },
      ],
    },
    {
      company: "Data Annotation",
      position: "Freelance AI Training Developer",
      duration: "Jun 2022 – Feb 2026",
      location: "Remote",
      bullets: [
        "Annotated text and code data and provided structured feedback to refine model understanding of tone, intent, and accuracy.",
        "Assisted in training AI models by improving conversational and code-generation quality.",
      ],
    },
    {
      company: "Lowe's",
      position: "Sales and Database Analyst",
      duration: "Apr 2021 – May 2022",
      location: "Lynnwood, WA",
      bullets: [
        "Collaborated across departments to optimize inventory and support customers.",
        "Enhanced sales workflows and earned 7 commendations for top-tier customer service.",
      ],
    },
  ],

  projects: [
    {
      name: "Cloud-Native Stock Market ETL Pipeline",
      featured: true,
      duration: "Jan 2025 – Present",
      description:
        "Cloud-native Azure ETL pipeline using Medallion Architecture, incremental loading, and Azure SQL to automate daily stock market ingestion. Star-schema warehouse with a 9-check data quality framework, audit logging, batch lineage, and automated validation — deployed with Azure Functions, GitHub Actions, Docker, and Azure CLI, backed by 27 automated tests.",
      technologies: ["Python", "Azure SQL", "Azure Functions", "Docker", "GitHub Actions", "pytest"],
      type: "Data Engineering",
      github: "https://github.com/MasonBrittain/Stock-Market-ETL-Pipeline",
    },
    {
      name: "AI Code Review Tool",
      duration: "Sep 2025 – Present",
      description:
        "AI-powered Python code review framework combining static analysis with LLM-based reasoning to detect bugs, security vulnerabilities, readability issues, and performance inefficiencies. Integrates Pylint and Bandit with an AI analysis layer to surface subtle issues traditional tools miss, producing severity-ranked, actionable reports.",
      technologies: ["Python", "LLM APIs", "Pylint", "Bandit"],
      type: "AI / Developer Tools",
      github: "https://github.com/MasonBrittain/AI-Code-Review-Tool",
    },
    {
      name: "Social Media Application",
      description:
        "Full-stack Twitter-style social app built with Next.js, Tailwind CSS, Supabase, and Drizzle ORM — posts, profiles, and real-time interactions, deployed on Vercel.",
      technologies: ["Next.js", "TypeScript", "Supabase", "Drizzle ORM", "Tailwind CSS"],
      type: "Full-Stack",
      github: "https://github.com/MasonBrittain/Social-Media-Application",
    },
    {
      name: "S&P 500 Stock Prediction",
      description:
        "Machine learning tool that predicts monthly S&P 500 price changes from historical market data using a gradient boosting model, with matplotlib and Seaborn visualizations of insights and model performance.",
      technologies: ["Python", "scikit-learn", "pandas", "matplotlib"],
      type: "Machine Learning",
      github: "https://github.com/MasonBrittain/S-P500-Stock-Prediction",
    },
    {
      name: "Wacefe Database & Marketing System",
      description:
        "SQL database and marketing system for a non-profit, quantifying engagement data and improving SEO. Led website updates and strategic marketing initiatives to boost outreach.",
      technologies: ["SQL", "MySQL", "Marketing Analytics", "Web Development"],
      type: "Database & Marketing",
    },
  ],

  skills: [
    {
      group: "Languages",
      accent: "violet",
      items: ["Python", "SQL", "JavaScript", "C#", "C++", "Java", "Excel"],
    },
    {
      group: "Data & Cloud",
      accent: "blue",
      items: [
        "Azure",
        "Azure SQL",
        "Azure Functions",
        "Azure Blob Storage",
        "Apache Spark",
        "SQL Server",
        "Power BI",
        "DAX",
        "SSIS",
        "SQLAlchemy",
        "pandas",
        "ETL",
        "Data Warehousing",
      ],
    },
    {
      group: "Tools",
      accent: "cyan",
      items: ["Git", "GitHub Actions", "Docker", "pytest", "Azure CLI", "Jira"],
    },
  ],

  certifications: [
    {
      name: "Google Analytics Certified",
      issuer: "Google",
      date: "2024",
    },
  ],

  education: [
    {
      institution: "University of Washington, Bothell",
      degree: "B.S. Computer Science & Information Technology",
      secondDegree: "B.A. Marketing Management",
      duration: "Jun 2020 – Sep 2025",
    },
    {
      institution: "Edmonds Community College",
      degree: "Associate of Arts — Running Start Program",
      duration: "Jun 2018 – Sep 2020",
    },
  ],
};

export default resume;
