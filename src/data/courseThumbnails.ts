// Curated Frontlines Tech Academy Course Poster Configurations
// Designed strictly in brand colors: #0E7C7B (Teal), #12232E (Slate Navy), #1F3B4D (Deep Navy), #F2A93B (Amber Gold)
// Programmatic poster rendering without cartoon toys/characters

export interface CoursePosterMeta {
  mainTitle: string;
  highlightTitle: string;
  trackTag: string;
  badgeTitle: string;
  iconName: string;
  accentColor: 'teal' | 'amber' | 'navy';
  keyTools: string[];
}

export const COURSE_POSTER_MAP: Record<string, CoursePosterMeta> = {
  // 1. Advanced Java with Spring Boot & Microservices
  "flm-advanced-java-with-sprin": {
    mainTitle: "ADVANCED JAVA",
    highlightTitle: "SPRING BOOT & MICROSERVICES",
    trackTag: "ENTERPRISE BACKEND TRACK",
    badgeTitle: "JAVA 21 & SPRING BOOT 3",
    iconName: "Coffee",
    accentColor: "teal",
    keyTools: ["Spring Boot 3", "Microservices", "Kafka", "Docker"]
  },
  // 2. ServiceNow Administration & Development
  "flm-service-now-course-in-te": {
    mainTitle: "SERVICENOW",
    highlightTitle: "ADMINISTRATION & DEVELOPMENT",
    trackTag: "ENTERPRISE CLOUD ERP",
    badgeTitle: "SERVICENOW CSA & CAD",
    iconName: "Workflow",
    accentColor: "amber",
    keyTools: ["ServiceNow CSA", "Flow Designer", "IntegrationHub", "CAD"]
  },
  // 3. AI Powered Cyber Security (Networking & SOC)
  "flm-cybersecurity-course-in-": {
    mainTitle: "CYBER SECURITY",
    highlightTitle: "SOC ANALYST & DEFENSE",
    trackTag: "SECURITY & NETWORKING TRACK",
    badgeTitle: "CYBER SECURITY & SOC",
    iconName: "ShieldAlert",
    accentColor: "teal",
    keyTools: ["SIEM Splunk", "Wireshark", "SOC Operations", "AI Threat Hunt"]
  },
  // 4. AI Powered Full Stack Testing (Manual + Automation)
  "flm-full-stack-testing-cours": {
    mainTitle: "FULL STACK TESTING",
    highlightTitle: "AUTOMATION & MANUAL QA",
    trackTag: "QUALITY ENGINEERING TRACK",
    badgeTitle: "QA FULL STACK TESTING",
    iconName: "CheckCircle2",
    accentColor: "teal",
    keyTools: ["Selenium", "Playwright", "Postman", "RestAssured"]
  },
  // 5. AI Powered Video Editing & Content Creation
  "flm-ai-powered-video-editing": {
    mainTitle: "VIDEO EDITING",
    highlightTitle: "AI CONTENT CREATION & VFX",
    trackTag: "CREATIVE MEDIA ACADEMY",
    badgeTitle: "VIDEO EDITING & AI MEDIA",
    iconName: "Video",
    accentColor: "amber",
    keyTools: ["Premiere Pro", "After Effects", "AI Generation", "Color Grading"]
  },
  // 6. Azure Data Engineering with Databricks & PySpark
  "flm-data-engineer-course-in-": {
    mainTitle: "DATA ENGINEERING",
    highlightTitle: "AZURE DATABRICKS & PYSPARK",
    trackTag: "BIG DATA CLOUD TRACK",
    badgeTitle: "AZURE DATA ENGINEERING",
    iconName: "Database",
    accentColor: "teal",
    keyTools: ["Azure ADF", "PySpark", "Databricks", "Synapse Analytics"]
  },
  // 7. Java with Data Structures & Algorithms (DSA)
  "flm-java-dsa-course-in-telug": {
    mainTitle: "JAVA & DSA",
    highlightTitle: "DATA STRUCTURES & ALGORITHMS",
    trackTag: "CODING ROUNDS & INTERVIEWS",
    badgeTitle: "JAVA DATA STRUCTURES",
    iconName: "Binary",
    accentColor: "amber",
    keyTools: ["Core Java OOP", "LeetCode 250+", "Dynamic Prog", "Trees & Graphs"]
  },
  // 8. Business Analytics with AI & Power BI
  "flm-business-analytics-with-": {
    mainTitle: "BUSINESS ANALYTICS",
    highlightTitle: "AI & POWER BI MASTERY",
    trackTag: "BUSINESS INTELLIGENCE TRACK",
    badgeTitle: "POWER BI & ANALYTICS",
    iconName: "BarChart3",
    accentColor: "amber",
    keyTools: ["Power BI DAX", "Advanced SQL", "Business KPIs", "Predictive AI"]
  },
  // 9. AI Mastery (From Python to Agentic AI)
  "flm-ai-mastery-course-in-tel": {
    mainTitle: "AI MASTERY",
    highlightTitle: "PYTHON TO AGENTIC AI & RAG",
    trackTag: "NEXT-GEN AI SPECIALIZATION",
    badgeTitle: "AGENTIC AI & PYTHON",
    iconName: "Sparkles",
    accentColor: "teal",
    keyTools: ["Python 3.12", "LangChain", "Agentic AI", "Vector DBs"]
  },
  // 10. Multi-Cloud DevOps (AWS + Azure + Kubernetes)
  "flm-multi-cloud-devops-onlin": {
    mainTitle: "MULTI-CLOUD DEVOPS",
    highlightTitle: "AWS • AZURE • KUBERNETES",
    trackTag: "CLOUD INFRASTRUCTURE TRACK",
    badgeTitle: "MULTI-CLOUD DEVOPS",
    iconName: "Cloud",
    accentColor: "teal",
    keyTools: ["AWS & Azure", "Docker", "Kubernetes", "Terraform CI/CD"]
  },
  // 11. System Design & Distributed Architectures
  "flm-system-design-course-by-": {
    mainTitle: "SYSTEM DESIGN",
    highlightTitle: "HLD, LLD & DISTRIBUTED SCALE",
    trackTag: "SENIOR ARCHITECT TRACK",
    badgeTitle: "SYSTEM DESIGN ARCHITECTURE",
    iconName: "Layers",
    accentColor: "navy",
    keyTools: ["Microservices", "High Scalability", "Caching & CDN", "Kafka Messaging"]
  },
  // 12. Data Science with Generative AI Specialization
  "flm-generative-ai-data-scien": {
    mainTitle: "GENERATIVE AI",
    highlightTitle: "DATA SCIENCE & LLM APPS",
    trackTag: "APPLIED AI ENGINEERING",
    badgeTitle: "DATA SCIENCE & GEN AI",
    iconName: "Bot",
    accentColor: "teal",
    keyTools: ["LLM Fine-tuning", "Transformers", "PyTorch", "RAG Pipelines"]
  },
  // 13. Data Science & Machine Learning Foundations
  "flm-data-science-course-in-t": {
    mainTitle: "DATA SCIENCE",
    highlightTitle: "MACHINE LEARNING FOUNDATIONS",
    trackTag: "DATA SCIENCE CAREER TRACK",
    badgeTitle: "DATA SCIENCE & ML",
    iconName: "BrainCircuit",
    accentColor: "teal",
    keyTools: ["Python Scikit", "Pandas & NumPy", "Statistics", "Predictive ML"]
  },
  // 14. AI Powered Data Analytics & Power BI
  "flm-ai-powered-data-analytic": {
    mainTitle: "AI DATA ANALYTICS",
    highlightTitle: "POWER BI, SQL & PYTHON",
    trackTag: "DATA ANALYST TRACK",
    badgeTitle: "AI DATA ANALYTICS",
    iconName: "PieChart",
    accentColor: "amber",
    keyTools: ["Power BI DAX", "PostgreSQL", "Tableau", "Python Analytics"]
  },
  // 15. SAP FICO (Financial Accounting & Controlling)
  "flm-sap-fico-course-in-telug": {
    mainTitle: "SAP FICO",
    highlightTitle: "FINANCIAL ACCOUNTING & CONTROLLING",
    trackTag: "ENTERPRISE SAP ERP",
    badgeTitle: "SAP S/4HANA FICO",
    iconName: "Briefcase",
    accentColor: "navy",
    keyTools: ["SAP S/4HANA", "General Ledger", "AR/AP", "Asset Accounting"]
  },
  // 16. AWS + Azure Multi-Cloud Architecture
  "flm-aws-and-azure-course-in-": {
    mainTitle: "AWS & AZURE",
    highlightTitle: "DUAL CLOUD SOLUTIONS ARCHITECT",
    trackTag: "CLOUD ARCHITECTURE TRACK",
    badgeTitle: "AWS & AZURE ARCHITECTURE",
    iconName: "Cloud",
    accentColor: "teal",
    keyTools: ["AWS Solutions", "Azure Infra", "Terraform IaC", "Cloud Security"]
  },
  // 17. AI Powered Java Full Stack Development
  "flm-ai-powered-java-full-sta": {
    mainTitle: "JAVA FULL STACK",
    highlightTitle: "AI POWERED DEVELOPMENT",
    trackTag: "FULL STACK CAREER TRACK",
    badgeTitle: "AI JAVA FULL STACK",
    iconName: "Code2",
    accentColor: "teal",
    keyTools: ["Java 21", "Spring Boot", "React 18", "AI Copilot Workflows"]
  },
  // 18. UI/UX Design with Figma & Design Systems
  "flm-ui-ux-course-in-telugu-b": {
    mainTitle: "UI/UX DESIGN",
    highlightTitle: "FIGMA & DESIGN SYSTEMS",
    trackTag: "PRODUCT DESIGN ACADEMY",
    badgeTitle: "UI/UX DESIGN & FIGMA",
    iconName: "PenTool",
    accentColor: "amber",
    keyTools: ["Figma Mastery", "Wireframing", "Design Systems", "Usability Testing"]
  },
  // 19. Power BI & SQL Business Intelligence
  "flm-flm-power-bi-training-te": {
    mainTitle: "POWER BI & SQL",
    highlightTitle: "BUSINESS INTELLIGENCE REPORTING",
    trackTag: "BI ANALYTICS TRACK",
    badgeTitle: "POWER BI & SQL BI",
    iconName: "BarChart3",
    accentColor: "amber",
    keyTools: ["Power BI Desktop", "DAX Formulas", "SQL Queries", "Interactive Dashboards"]
  },
  // 20. AI Powered Digital Marketing & Growth Engineering
  "flm-flm-ai-powered-digital-m": {
    mainTitle: "DIGITAL MARKETING",
    highlightTitle: "AI POWERED GROWTH & ADS",
    trackTag: "DIGITAL GROWTH ACADEMY",
    badgeTitle: "DIGITAL MARKETING & AI",
    iconName: "Sparkles",
    accentColor: "teal",
    keyTools: ["Meta & Google Ads", "SEO / SEM", "AI Copywriting", "GA4 Analytics"]
  },
  // 21. Advanced Excel with AI & Workflow Automation
  "flm-excel-course-in-telugu-b": {
    mainTitle: "ADVANCED EXCEL",
    highlightTitle: "AI & WORKFLOW AUTOMATION",
    trackTag: "PRODUCTIVITY MASTERCLASS",
    badgeTitle: "EXCEL MASTERY & AI",
    iconName: "FileSpreadsheet",
    accentColor: "teal",
    keyTools: ["VLOOKUP / XLOOKUP", "Pivot Tables", "Power Query", "Excel AI Functions"]
  },
  // 22. Generative AI & LLM Applications Bootcamp
  "flm-generative-ai-course-in-": {
    mainTitle: "GENERATIVE AI",
    highlightTitle: "PROMPT ENG & LLM INTEGRATION",
    trackTag: "AI APPLICATION TRACK",
    badgeTitle: "GENERATIVE AI & LLMS",
    iconName: "Bot",
    accentColor: "amber",
    keyTools: ["Prompt Eng", "OpenAI & Claude", "LangChain", "Vector Embeddings"]
  },
  // 23. Graphic Design Bootcamp with Adobe Suite
  "flm-graphic-design-course-in": {
    mainTitle: "GRAPHIC DESIGN",
    highlightTitle: "ADOBE PHOTOSHOP & ILLUSTRATOR",
    trackTag: "VISUAL MEDIA TRACK",
    badgeTitle: "GRAPHIC DESIGN ADOBE",
    iconName: "PenTool",
    accentColor: "amber",
    keyTools: ["Photoshop", "Illustrator", "Brand Identity", "Social Creatives"]
  },
  // 24. .NET Full Stack Development with Angular
  "flm-dot-net-full-stack-cours": {
    mainTitle: ".NET FULL STACK",
    highlightTitle: "C# .NET 8 & ANGULAR 17",
    trackTag: "MICROSOFT STACK TRACK",
    badgeTitle: ".NET & ANGULAR STACK",
    iconName: "Code2",
    accentColor: "teal",
    keyTools: ["C# .NET 8", "Angular 17", "Web APIs", "SQL Server"]
  },
  // 25. Web Development with React 18 & TypeScript
  "flm-flms-web-development-wit": {
    mainTitle: "WEB DEVELOPMENT",
    highlightTitle: "REACT 18, TYPESCRIPT & TAILWIND",
    trackTag: "FRONTEND ENGINEERING TRACK",
    badgeTitle: "REACT 18 & TYPESCRIPT",
    iconName: "Code2",
    accentColor: "teal",
    keyTools: ["React 18", "TypeScript", "Tailwind CSS", "Next.js"]
  },
  // 26. SAP ABAP Programming on HANA
  "flm-sap-abap-course-in-telug": {
    mainTitle: "SAP ABAP",
    highlightTitle: "ADVANCED PROGRAMMING ON HANA",
    trackTag: "SAP TECHNICAL TRACK",
    badgeTitle: "SAP ABAP ON HANA",
    iconName: "Briefcase",
    accentColor: "navy",
    keyTools: ["ABAP 7.5+", "HANA Studio", "CDS Views", "OData Services"]
  },
  // 27. Workday HCM (Human Capital Management)
  "flm-workday-hcm-course-in-te": {
    mainTitle: "WORKDAY HCM",
    highlightTitle: "CORE HUMAN CAPITAL MANAGEMENT",
    trackTag: "ENTERPRISE CLOUD ERP",
    badgeTitle: "WORKDAY HCM ERP",
    iconName: "Users",
    accentColor: "navy",
    keyTools: ["Staffing Models", "Compensation", "Business Processes", "EIB Integrations"]
  },
  // 28. Advanced Machine Learning & Deep Learning
  "flm-advanced-machine-learnin": {
    mainTitle: "MACHINE LEARNING",
    highlightTitle: "DEEP LEARNING & PYTORCH",
    trackTag: "ADVANCED AI RESEARCH",
    badgeTitle: "DEEP LEARNING & PYTORCH",
    iconName: "BrainCircuit",
    accentColor: "teal",
    keyTools: ["Neural Networks", "PyTorch", "Computer Vision", "NLP & Transformers"]
  },
  // 29. Python Full Stack Development with Django & React
  "flm-python-full-stack-course": {
    mainTitle: "PYTHON FULL STACK",
    highlightTitle: "DJANGO REST & REACT",
    trackTag: "PYTHON DEVELOPER TRACK",
    badgeTitle: "PYTHON DJANGO & REACT",
    iconName: "Code2",
    accentColor: "amber",
    keyTools: ["Python 3.12", "Django REST", "React Frontend", "PostgreSQL"]
  },
  // 30. SQL & Relational Database Engineering Mastery
  "flm-sql-course-in-telugu-by-": {
    mainTitle: "SQL MASTERY",
    highlightTitle: "DATABASE ARCHITECTURE & QUERIES",
    trackTag: "DATABASE ENGINEERING TRACK",
    badgeTitle: "SQL DATABASE MASTERY",
    iconName: "Database",
    accentColor: "teal",
    keyTools: ["PostgreSQL", "Complex Joins", "Window Functions", "Query Optimization"]
  },
  // 31. Python Data Structures & Problem Solving
  "flm-flm-python-data-structur": {
    mainTitle: "PYTHON DSA",
    highlightTitle: "DATA STRUCTURES & PROBLEM SOLVING",
    trackTag: "INTERVIEW CRACKER TRACK",
    badgeTitle: "PYTHON DSA & LEETCODE",
    iconName: "Binary",
    accentColor: "amber",
    keyTools: ["Python OOP", "Recursion & Trees", "Graphs & DP", "Coding Rounds"]
  },
  // 32. .NET Core with Microservices & Docker
  "flm-dotnet-core-with-microse": {
    mainTitle: ".NET MICROSERVICES",
    highlightTitle: "DOCKER, RABBITMQ & CLEAN ARCH",
    trackTag: "BACKEND ARCHITECTURE TRACK",
    badgeTitle: ".NET CORE MICROSERVICES",
    iconName: "Layers",
    accentColor: "teal",
    keyTools: [".NET 8 Web API", "Docker", "RabbitMQ", "Clean Architecture"]
  },
  // 33. Salesforce CRM Admin & Developer Track
  "flm-salesforce-course-in-tel": {
    mainTitle: "SALESFORCE CRM",
    highlightTitle: "ADMIN & APEX DEVELOPER",
    trackTag: "SALESFORCE CLOUD TRACK",
    badgeTitle: "SALESFORCE CRM & APEX",
    iconName: "Cloud",
    accentColor: "teal",
    keyTools: ["Salesforce Admin", "Apex Coding", "LWC Components", "Flow Builder"]
  },
  // 34. LeetCode Pattern & Problem Solving (Self-Paced)
  "flm-leetcode-pattern-self-paced": {
    mainTitle: "LEETCODE 150",
    highlightTitle: "TOP CODING PATTERNS & SOLUTIONS",
    trackTag: "SELF-PACED CRACKER",
    badgeTitle: "LEETCODE 150 PATTERNS",
    iconName: "Binary",
    accentColor: "amber",
    keyTools: ["Sliding Window", "Two Pointers", "Binary Search", "Dynamic Prog"]
  },
  // 35. Linux for DevOps & Cloud Engineers (Self-Paced)
  "flm-linux-fundamentals-self-paced": {
    mainTitle: "LINUX FOR DEVOPS",
    highlightTitle: "BASH SCRIPTING & SERVER ADMIN",
    trackTag: "SELF-PACED INFRASTRUCTURE",
    badgeTitle: "LINUX FOR DEVOPS",
    iconName: "Terminal",
    accentColor: "teal",
    keyTools: ["Bash Scripting", "SSH & Security", "Process Mgmt", "Networking"]
  },
  // 36. Aptitude & Quantitative Reasoning Masterclass (Self-Paced)
  "flm-aptitude-reasoning-self-paced": {
    mainTitle: "APTITUDE MASTERCLASS",
    highlightTitle: "QUANTITATIVE & LOGICAL REASONING",
    trackTag: "CAMPUS PLACEMENT PREP",
    badgeTitle: "APTITUDE MASTERCLASS",
    iconName: "Award",
    accentColor: "amber",
    keyTools: ["Quantitative", "Logical Puzzles", "Data Interpretation", "Speed Math"]
  },
  // 37. Soft Skills, Resume Building & HR Mock Prep (Self-Paced)
  "flm-soft-skills-interview-prep": {
    mainTitle: "SOFT SKILLS & HR",
    highlightTitle: "ATS RESUME & MOCK INTERVIEWS",
    trackTag: "CAREER LAUNCHPAD",
    badgeTitle: "SOFT SKILLS & HR PREP",
    iconName: "Users",
    accentColor: "teal",
    keyTools: ["ATS Resume", "LinkedIn Branding", "HR Questions", "Communication"]
  },
  // 38. Power BI with Real-World Industry Projects (Self-Paced)
  "flm-power-bi-real-projects-self-paced": {
    mainTitle: "POWER BI LABS",
    highlightTitle: "REAL-WORLD INDUSTRY PROJECTS",
    trackTag: "SELF-PACED PORTFOLIO",
    badgeTitle: "POWER BI PROJECTS LAB",
    iconName: "BarChart3",
    accentColor: "amber",
    keyTools: ["Financial Analytics", "Sales Dashboards", "Advanced DAX", "Data Modeling"]
  },
  // 39. Tableau Business Intelligence & Dashboards (Self-Paced)
  "flm-tableau-bi-dashboards-self-paced": {
    mainTitle: "TABLEAU BI",
    highlightTitle: "BUSINESS DASHBOARDS & STORIES",
    trackTag: "SELF-PACED VISUAL ANALYTICS",
    badgeTitle: "TABLEAU DASHBOARDS",
    iconName: "PieChart",
    accentColor: "teal",
    keyTools: ["Tableau Desktop", "Visual Design", "Calculated Fields", "Story Points"]
  },
  // 40. Prompt Engineering & Generative AI Tools (Self-Paced)
  "flm-prompt-engineering-genai-tools": {
    mainTitle: "PROMPT ENGINEERING",
    highlightTitle: "GENERATIVE AI TOOLS & AUTOMATION",
    trackTag: "AI PRODUCTIVITY TRACK",
    badgeTitle: "PROMPT ENGINEERING & AI",
    iconName: "Sparkles",
    accentColor: "amber",
    keyTools: ["ChatGPT & Claude", "Few-Shot Prompts", "AI Workflows", "API Prompts"]
  }
};

export const getCoursePoster = (courseId: string, title?: string): CoursePosterMeta => {
  if (COURSE_POSTER_MAP[courseId]) {
    return COURSE_POSTER_MAP[courseId];
  }

  // Fallback derivation
  const lower = (title || courseId).toLowerCase();

  if (lower.includes('java') || lower.includes('spring')) {
    return COURSE_POSTER_MAP['flm-advanced-java-with-sprin'];
  }
  if (lower.includes('service') || lower.includes('now')) {
    return COURSE_POSTER_MAP['flm-service-now-course-in-te'];
  }
  if (lower.includes('python')) {
    return COURSE_POSTER_MAP['flm-python-full-stack-course'];
  }
  if (lower.includes('cyber') || lower.includes('security')) {
    return COURSE_POSTER_MAP['flm-cybersecurity-course-in-'];
  }
  if (lower.includes('test') || lower.includes('qa') || lower.includes('selenium')) {
    return COURSE_POSTER_MAP['flm-full-stack-testing-cours'];
  }
  if (lower.includes('devops') || lower.includes('cloud') || lower.includes('aws') || lower.includes('azure')) {
    return COURSE_POSTER_MAP['flm-multi-cloud-devops-onlin'];
  }
  if (lower.includes('power bi') || lower.includes('analytics') || lower.includes('tableau') || lower.includes('data')) {
    return COURSE_POSTER_MAP['flm-business-analytics-with-'];
  }
  if (lower.includes('ui') || lower.includes('ux') || lower.includes('figma') || lower.includes('design')) {
    return COURSE_POSTER_MAP['flm-ui-ux-course-in-telugu-b'];
  }
  if (lower.includes('video') || lower.includes('editing')) {
    return COURSE_POSTER_MAP['flm-ai-powered-video-editing'];
  }
  if (lower.includes('ai') || lower.includes('genai') || lower.includes('prompt')) {
    return COURSE_POSTER_MAP['flm-ai-mastery-course-in-tel'];
  }

  return {
    mainTitle: "FRONTLINES TECH",
    highlightTitle: (title || "PROFESSIONAL BOOTCAMP").toUpperCase(),
    trackTag: "INDUSTRY CAREER TRACK",
    badgeTitle: "FRONTLINES TECH BATCH",
    iconName: "GraduationCap",
    accentColor: "teal",
    keyTools: ["Hands-on Labs", "Live Projects", "Telugu & English", "Placement Prep"]
  };
};

