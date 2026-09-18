import React from 'react';

// Crisp, high-fidelity official vector SVG images for all technologies
export interface TechDetails {
  name: string;
  key: string;
}

export const getTechDetails = (techName: string): TechDetails => {
  const t = techName.toLowerCase().trim();

  // Frameworks & Languages
  if (t.includes('spring')) return { name: 'Spring Boot', key: 'spring' };
  if (t.includes('java 21') || t.includes('core java') || t === 'java' || t.includes('java oop')) return { name: 'Java', key: 'java' };
  if (t.includes('python') || t.includes('pandas') || t.includes('scikit')) return { name: 'Python', key: 'python' };
  if (t.includes('react')) return { name: 'React', key: 'react' };
  if (t.includes('angular')) return { name: 'Angular', key: 'angular' };
  if (t.includes('vue')) return { name: 'Vue.js', key: 'vue' };
  if (t.includes('next.js') || t.includes('nextjs')) return { name: 'Next.js', key: 'nextjs' };
  if (t.includes('node')) return { name: 'Node.js', key: 'nodejs' };
  if (t.includes('typescript') || t.includes(' ts')) return { name: 'TypeScript', key: 'typescript' };
  if (t.includes('javascript') || t.includes(' js') || t.includes('es6')) return { name: 'JavaScript', key: 'javascript' };
  if (t.includes('tailwind')) return { name: 'Tailwind CSS', key: 'tailwind' };
  if (t.includes('html') || t.includes('css')) return { name: 'HTML5/CSS3', key: 'html' };
  if (t.includes('.net') || t.includes('c#')) return { name: '.NET C#', key: 'dotnet' };
  if (t.includes('django')) return { name: 'Django', key: 'django' };
  if (t.includes('fastapi')) return { name: 'FastAPI', key: 'fastapi' };

  // Cloud & DevOps
  if (t.includes('docker') || t.includes('container')) return { name: 'Docker', key: 'docker' };
  if (t.includes('kubernetes') || t.includes('k8s')) return { name: 'Kubernetes', key: 'kubernetes' };
  if (t.includes('aws')) return { name: 'AWS Cloud', key: 'aws' };
  if (t.includes('azure') || t.includes('adf') || t.includes('synapse')) return { name: 'Microsoft Azure', key: 'azure' };
  if (t.includes('gcp') || t.includes('google cloud')) return { name: 'Google Cloud', key: 'gcp' };
  if (t.includes('terraform')) return { name: 'Terraform', key: 'terraform' };
  if (t.includes('jenkins') || t.includes('ci/cd')) return { name: 'Jenkins CI/CD', key: 'jenkins' };
  if (t.includes('git') || t.includes('github')) return { name: 'GitHub', key: 'git' };
  if (t.includes('linux') || t.includes('bash') || t.includes('shell')) return { name: 'Linux', key: 'linux' };

  // Data & Messaging & Databases
  if (t.includes('kafka')) return { name: 'Apache Kafka', key: 'kafka' };
  if (t.includes('sql') || t.includes('postgres') || t.includes('queries')) return { name: 'PostgreSQL / SQL', key: 'sql' };
  if (t.includes('mongo')) return { name: 'MongoDB', key: 'mongodb' };
  if (t.includes('redis') || t.includes('caching')) return { name: 'Redis', key: 'redis' };
  if (t.includes('databricks')) return { name: 'Databricks', key: 'databricks' };
  if (t.includes('spark') || t.includes('pyspark')) return { name: 'Apache Spark', key: 'spark' };

  // Analytics & BI
  if (t.includes('power bi') || t.includes('dax')) return { name: 'Power BI', key: 'powerbi' };
  if (t.includes('tableau')) return { name: 'Tableau', key: 'tableau' };
  if (t.includes('excel') || t.includes('vlookup') || t.includes('pivot') || t.includes('spreadsheet')) return { name: 'Microsoft Excel', key: 'excel' };

  // Design & Media
  if (t.includes('figma')) return { name: 'Figma', key: 'figma' };
  if (t.includes('premiere')) return { name: 'Adobe Premiere Pro', key: 'premiere' };
  if (t.includes('after effects')) return { name: 'Adobe After Effects', key: 'aftereffects' };
  if (t.includes('photoshop')) return { name: 'Adobe Photoshop', key: 'photoshop' };
  if (t.includes('illustrator')) return { name: 'Adobe Illustrator', key: 'illustrator' };

  // AI & Machine Learning
  if (t.includes('pytorch')) return { name: 'PyTorch', key: 'pytorch' };
  if (t.includes('tensorflow') || t.includes('keras')) return { name: 'TensorFlow', key: 'tensorflow' };
  if (t.includes('langchain') || t.includes('rag') || t.includes('vector')) return { name: 'LangChain', key: 'langchain' };
  if (t.includes('openai') || t.includes('chatgpt') || t.includes('llm') || t.includes('gen ai') || t.includes('prompt') || t.includes('agentic')) {
    return { name: 'OpenAI / GenAI', key: 'openai' };
  }

  // Enterprise & Testing
  if (t.includes('servicenow') || t.includes('csa') || t.includes('cad')) return { name: 'ServiceNow', key: 'servicenow' };
  if (t.includes('salesforce') || t.includes('apex') || t.includes('lwc')) return { name: 'Salesforce', key: 'salesforce' };
  if (t.includes('sap') || t.includes('abap') || t.includes('fico') || t.includes('s/4hana')) return { name: 'SAP S/4HANA', key: 'sap' };
  if (t.includes('selenium')) return { name: 'Selenium', key: 'selenium' };
  if (t.includes('postman')) return { name: 'Postman', key: 'postman' };
  if (t.includes('playwright')) return { name: 'Playwright', key: 'playwright' };
  if (t.includes('splunk') || t.includes('siem') || t.includes('soc')) return { name: 'Splunk', key: 'splunk' };
  if (t.includes('wireshark')) return { name: 'Wireshark', key: 'wireshark' };
  if (t.includes('leetcode')) return { name: 'LeetCode', key: 'leetcode' };
  if (t.includes('microservices') || t.includes('scalability')) return { name: 'Microservices', key: 'microservices' };

  return { name: techName, key: 'generic' };
};

interface TechLogoProps {
  tech: string;
  className?: string;
  size?: number;
}

export const TechLogoImage: React.FC<TechLogoProps> = ({ tech, className = '', size = 22 }) => {
  const { key } = getTechDetails(tech);

  switch (key) {
    case 'java':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M7.5 18c2.5.5 5.5.5 8 0 1-.2 1.5-.5 1-.8-.5-.3-1.8-.4-2.8-.4-2.5 0-5.5.5-6.2 1.2z" fill="#5382A1"/>
          <path d="M6 19.5c3.2.7 7.5.7 11 0 1.2-.2 1.8-.6 1.2-1-.6-.4-2.5-.5-3.8-.5-3.5 0-7.2.7-8.4 1.5z" fill="#E76F00"/>
          <path d="M12.5 4.5c1.5 2-1 3.5-.5 5 1.5-1.5 2-2.5 1-4-.5-.8-1-1.5-.5-1z" fill="#E76F00"/>
          <path d="M10 8c1 1.5-.5 2.5 0 3.5 1-1 1.5-2 .5-3-.5-.7-.8-1.2-.5-.5z" fill="#5382A1"/>
          <path d="M14.5 11.5c2 1 2 2.5.5 3-1.8.6-4.5.6-6.5 0-1-.3-1-1 0-1.5 2-1 4-1.5 6-1.5z" fill="#E76F00"/>
          <path d="M4.5 22c4 1 10 1 14.5 0 1.5-.3 2.5-.8 1.5-1.4-.8-.5-3.5-.7-5.5-.7-5 0-9.5 1-10.5 2.1z" fill="#5382A1"/>
        </svg>
      );

    case 'spring':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M20.5 3.5c-9 0-15 6-15 15 0 1.5.5 2 1.5 2 9 0 15-6 15-15 0-1.5-.5-2-1.5-2z" fill="#6DB33F"/>
          <path d="M12 9c-3 0-5 2-5 5 0 .5.2.8.5.8 3 0 5-2 5-5 0-.5-.2-.8-.5-.8z" fill="#FFFFFF"/>
          <path d="M16 13c-2 0-3.5 1.5-3.5 3.5 0 .4.2.6.4.6 2 0 3.5-1.5 3.5-3.5 0-.4-.2-.6-.4-.6z" fill="#FFFFFF"/>
        </svg>
      );

    case 'python':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M11.9 2c-3 0-5 1.2-5 3.5v2.5h5v1H4.5C2.5 9 1 10.8 1 13.5s1.5 4.5 3.5 4.5h2v-2.8c0-2 1.7-3.7 3.7-3.7h5.7c1.8 0 3.1-1.3 3.1-3.1V5.5C19 3.2 16.8 2 11.9 2zM9 4.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#387EB8"/>
          <path d="M12.1 22c3 0 5-1.2 5-3.5V16h-5v-1h7.4c2 0 3.5-1.8 3.5-4.5s-1.5-4.5-3.5-4.5h-2v2.8c0 2-1.7 3.7-3.7 3.7H8.1c-1.8 0-3.1 1.3-3.1 3.1v2.9c0 2.3 2.2 3.5 7.1 3.5zM15 19.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="#FFE052"/>
        </svg>
      );

    case 'react':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="3" ry="8.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="3" ry="8.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="3" ry="8.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        </svg>
      );

    case 'docker':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M3 13.5c1-1 3-1 4.5 0 1.5-1 3.5-1 5 0 1.5-1 3.5-1 5 0 2-1 4 0 4.5 1 .5 1 .5 3-1.5 5.5-2.5 3-8 3-13 1-3-1.2-4.5-4-4.5-6.5 0-.5 0-.8 0-1z" fill="#2496ED"/>
          <rect x="5" y="9.5" width="2" height="2" fill="#2496ED" rx="0.3"/>
          <rect x="7.5" y="9.5" width="2" height="2" fill="#2496ED" rx="0.3"/>
          <rect x="10" y="9.5" width="2" height="2" fill="#2496ED" rx="0.3"/>
          <rect x="7.5" y="7" width="2" height="2" fill="#2496ED" rx="0.3"/>
          <rect x="10" y="7" width="2" height="2" fill="#2496ED" rx="0.3"/>
          <rect x="12.5" y="7" width="2" height="2" fill="#2496ED" rx="0.3"/>
          <rect x="10" y="4.5" width="2" height="2" fill="#2496ED" rx="0.3"/>
        </svg>
      );

    case 'kubernetes':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 2l8 4.6v9.2l-8 4.6-8-4.6V6.6L12 2z" stroke="#326CE5" strokeWidth="1.8" fill="#326CE5" fillOpacity="0.18"/>
          <circle cx="12" cy="12" r="3.5" stroke="#FFFFFF" strokeWidth="1.6"/>
          <path d="M12 8.5V4M15 10l3.5-2M15 14l3.5 2M12 15.5V20M9 14l-3.5 2M9 10L5.5 8" stroke="#FFFFFF" strokeWidth="1.5"/>
        </svg>
      );

    case 'aws':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M3 16.5c4 2.5 10 3 15-1 .5-.4 1-.3.7.2-2.5 3-9 4-15 1-.4-.2-.3-.5 0-.7z" fill="#FF9900"/>
          <path d="M19 14.5l-1.8 2.2c-.2.2 0 .5.3.4l2.8-.8c.3-.1.4-.4.2-.6l-1.5-1.2z" fill="#FF9900"/>
          <path d="M6.5 9c-.5 0-.8.3-.9.7l-.8 3.5c-.1.3.1.5.4.5h1.2c.3 0 .5-.2.6-.4l.2-1.2h1.5l.2 1.2c0 .2.3.4.6.4h1.1c.3 0 .5-.2.4-.5l-.8-3.5c-.1-.4-.4-.7-.9-.7h-1.6zm.5 2.5l.3-1.5.3 1.5H7z" fill="#FFFFFF"/>
          <path d="M12 9h1.2c.3 0 .5.2.6.5l.7 2.2.7-2.2c.1-.3.3-.5.6-.5H17c.3 0 .5.2.4.5l-1.4 3.7c-.1.3-.3.5-.6.5h-1.2c-.3 0-.5-.2-.6-.5l-.6-1.8-.6 1.8c-.1.3-.3.5-.6.5h-1.2c-.3 0-.5-.2-.4-.5l1.4-3.7c.1-.3.3-.5.6-.5z" fill="#FFFFFF"/>
        </svg>
      );

    case 'azure':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M3 18.5l6.5-14c.3-.7 1.2-.8 1.7-.3l4.5 5-7.5 7.5L3 18.5z" fill="#0078D4"/>
          <path d="M12.5 13l3.5-3.8 4.5 8c.4.7-.1 1.6-.9 1.6H7l5.5-5.8z" fill="#50E6FF"/>
        </svg>
      );

    case 'powerbi':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="12" width="4.5" height="9" rx="1.5" fill="#E0A800"/>
          <rect x="9.5" y="7" width="4.5" height="14" rx="1.5" fill="#F2C811"/>
          <rect x="16" y="3" width="4.5" height="18" rx="1.5" fill="#FCE100"/>
        </svg>
      );

    case 'tableau':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M11.5 2v4h1V2h-1zM10 4h4v1h-4V4zM5.5 7v5h1V7h-1zM3 9.5h6v1H3v-1zM17.5 7v5h1V7h-1zM15 9.5h6v1h-6v-1zM11 8v8h2V8h-2zM7 11h10v2H7v-2zM5.5 14v4h1v-4h-1zM3.5 16h5v1h-5v-1zM17.5 14v4h1v-4h-1zM15.5 16h5v1h-5v-1zM11.5 18v4h1v-4h-1zM10 20h4v1h-4v-1z" fill="#E8762D"/>
        </svg>
      );

    case 'figma':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M8 2h4v5H8a2.5 2.5 0 1 1 0-5z" fill="#F24E1E"/>
          <path d="M12 2h4a2.5 2.5 0 0 1 0 5h-4V2z" fill="#FF7262"/>
          <path d="M12 7h4a2.5 2.5 0 0 1 0 5h-4V7z" fill="#1ABCFE"/>
          <path d="M8 7h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#A259FF"/>
          <path d="M8 12h4v4.5a2.5 2.5 0 1 1-4-2V12z" fill="#0ACF83"/>
        </svg>
      );

    case 'servicenow':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#81B5A1" strokeWidth="2.2" strokeDasharray="14 3"/>
          <circle cx="12" cy="12" r="4.5" fill="#293E40" stroke="#81B5A1" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="1.8" fill="#81B5A1"/>
        </svg>
      );

    case 'salesforce':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M10 6.5a4.5 4.5 0 0 1 7.2 1.3 4 4 0 0 1 3.8 4 4 4 0 0 1-3 3.9 3.5 3.5 0 0 1-3.5 2.3h-7a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 2.5-4 4.5 4.5 0 0 1 4.5-3z" fill="#00A1E0"/>
          <path d="M8.5 12.5c.5-.8 1.5-1.5 2.8-1.2.8.2 1.5.8 1.7 1.6" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      );

    case 'sql':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="6" rx="8" ry="3.5" fill="#336791" stroke="#4DA3D4" strokeWidth="1.2"/>
          <path d="M4 6v5c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5V6" stroke="#4DA3D4" strokeWidth="1.2" fill="#336791"/>
          <path d="M4 11v5c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5v-5" stroke="#4DA3D4" strokeWidth="1.2" fill="#1F3B4D"/>
        </svg>
      );

    case 'selenium':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3.5" fill="#00B400"/>
          <text x="6" y="16" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">Se</text>
        </svg>
      );

    case 'postman':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#FF6C37"/>
          <path d="M7 11.5c1.5-2 4-2.5 6-1.5l3.5-2-1 3.5c.8 1.2.8 2.8 0 4l1 3.5-3.5-2c-2 1-4.5.5-6-1.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      );

    case 'playwright':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="12" r="6" fill="#45BA4B"/>
          <circle cx="15" cy="12" r="6" fill="#D33833" fillOpacity="0.85"/>
        </svg>
      );

    case 'excel':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#107C41"/>
          <path d="M8 8l4 4-4 4M16 8l-4 4 4 4" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case 'kafka':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="2.8" fill="#FFFFFF"/>
          <circle cx="17.5" cy="8" r="2" fill="#FFFFFF"/>
          <circle cx="17.5" cy="16" r="2" fill="#FFFFFF"/>
          <circle cx="6.5" cy="8" r="2" fill="#FFFFFF"/>
          <circle cx="6.5" cy="16" r="2" fill="#FFFFFF"/>
          <path d="M12 12l5.5-4M12 12l5.5 4M12 12l-5.5-4M12 12l-5.5 4" stroke="#FFFFFF" strokeWidth="1.5"/>
        </svg>
      );

    case 'terraform':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M8.5 2.5L3 5.7v6.4l5.5-3.2V2.5z" fill="#844FBA"/>
          <path d="M9.5 9.2l5.5-3.2v6.4l-5.5 3.2V9.2z" fill="#5C4EE5"/>
          <path d="M9.5 16.2l5.5-3.2v6.4l-5.5 3.2v-6.4z" fill="#4040B2"/>
          <path d="M16 5.7l5-2.9v6.4l-5 2.9V5.7z" fill="#844FBA"/>
        </svg>
      );

    case 'jenkins':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#D33833"/>
          <path d="M12 6c-2.5 0-4 1.5-4 4 0 2 1.5 3 4 3s4-1 4-3c0-2.5-1.5-4-4-4z" fill="#FFFFFF"/>
          <path d="M8 17c1-1 2.5-1.5 4-1.5s3 .5 4 1.5v2H8v-2z" fill="#FFFFFF"/>
        </svg>
      );

    case 'git':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M21.6 10.9L13.1 2.4a1.7 1.7 0 0 0-2.4 0L8.3 4.8l3 3a2 2 0 0 1 2.6 2.5l2.9 2.9a2 2 0 1 1-1.2 1.2l-2.8-2.8v4.2a2 2 0 1 1-1.7 0V11.2a2 2 0 0 1-1-2.6L7.1 5.7 2.4 10.4a1.7 1.7 0 0 0 0 2.4l8.5 8.5a1.7 1.7 0 0 0 2.4 0l8.3-8.3a1.7 1.7 0 0 0 0-2.1z" fill="#F05032"/>
        </svg>
      );

    case 'linux':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" fill="#1F2428" stroke="#F2A93B" strokeWidth="1.2"/>
          <path d="M6.5 9l3.5 3-3.5 3" stroke="#F2A93B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 15h5" stroke="#38EF7D" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );

    case 'dotnet':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="4" fill="#512BD4"/>
          <text x="4.5" y="15" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">.NET</text>
        </svg>
      );

    case 'angular':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 2.5l8 2.8-1.2 10.7-6.8 4.2-6.8-4.2L4 5.3 12 2.5z" fill="#DD0031"/>
          <path d="M12 2.5v17.7l6.8-4.2 1.2-10.7-8-2.8z" fill="#C3002F"/>
          <path d="M12 6.5l3.8 8.5h-1.5l-.8-2h-3l-.8 2H8.2L12 6.5zm-1.1 5.3h2.2L12 9l-1.1 2.8z" fill="#FFFFFF"/>
        </svg>
      );

    case 'django':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" fill="#092E20"/>
          <text x="6" y="15" fill="#44B78B" fontSize="10" fontWeight="black" fontFamily="sans-serif">dj</text>
        </svg>
      );

    case 'fastapi':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#059669"/>
          <path d="M13 5l-5 8h4l-1 6 6-9h-4l2-5h-2z" fill="#FFFFFF"/>
        </svg>
      );

    case 'premiere':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3.5" fill="#00005B" stroke="#9999FF" strokeWidth="1"/>
          <text x="6" y="15.5" fill="#9999FF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Pr</text>
        </svg>
      );

    case 'aftereffects':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3.5" fill="#00005B" stroke="#D291FF" strokeWidth="1"/>
          <text x="6" y="15.5" fill="#D291FF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Ae</text>
        </svg>
      );

    case 'photoshop':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3.5" fill="#001E36" stroke="#31A8FF" strokeWidth="1"/>
          <text x="6" y="15.5" fill="#31A8FF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Ps</text>
        </svg>
      );

    case 'illustrator':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3.5" fill="#330000" stroke="#FF9A00" strokeWidth="1"/>
          <text x="6.5" y="15.5" fill="#FF9A00" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Ai</text>
        </svg>
      );

    case 'splunk':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" fill="#000000" stroke="#EA580C" strokeWidth="1"/>
          <path d="M7 15l4-6h3l-4 6H7zm6-6l4 6h-3l-4-6h3z" fill="#F97316"/>
        </svg>
      );

    case 'wireshark':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#1679A7"/>
          <path d="M7 16c2-4 5-7 9-7-1 3-3 6-5 7-1.5.7-3.5.5-4 0z" fill="#FFFFFF"/>
        </svg>
      );

    case 'sap':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="6" width="20" height="12" rx="2" fill="#008FD3"/>
          <text x="4" y="15" fill="#FFFFFF" fontSize="9" fontWeight="900" letterSpacing="0.5" fontFamily="sans-serif">SAP</text>
        </svg>
      );

    case 'openai':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#10A37F"/>
          <path d="M12 6.5a2.5 2.5 0 0 1 2.3 1.5 2.5 2.5 0 0 1 2.1 2.2 2.5 2.5 0 0 1 .4 3 2.5 2.5 0 0 1-1.6 2.4 2.5 2.5 0 0 1-2.4.9 2.5 2.5 0 0 1-2.3-1.5 2.5 2.5 0 0 1-2.1-2.2 2.5 2.5 0 0 1-.4-3 2.5 2.5 0 0 1 1.6-2.4 2.5 2.5 0 0 1 2.4-.9z" stroke="#FFFFFF" strokeWidth="1.4" fill="none"/>
        </svg>
      );

    case 'pytorch':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 3a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 13.5a5.5 5.5 0 1 1 5.5-5.5 5.5 5.5 0 0 1-5.5 5.5z" fill="#EE4C2C"/>
          <circle cx="17.5" cy="6.5" r="1.8" fill="#EE4C2C"/>
        </svg>
      );

    case 'databricks':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 3l9 5-9 5-9-5 9-5z" fill="#FF3621"/>
          <path d="M3 11.5l9 5 9-5" stroke="#FF3621" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M3 15.5l9 5 9-5" stroke="#FF3621" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      );

    case 'spark':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 3l2 5 5 1-4 4 1 5-4-3-4 3 1-5-4-4 5-1 2-5z" fill="#E25A1C"/>
        </svg>
      );

    case 'typescript':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#3178C6"/>
          <text x="6" y="16" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">TS</text>
        </svg>
      );

    case 'javascript':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#F7DF1E"/>
          <text x="6" y="16" fill="#000000" fontSize="10" fontWeight="bold" fontFamily="sans-serif">JS</text>
        </svg>
      );

    case 'tailwind':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M6 13c1.5-2.5 3.5-3 6-1.5 1.5 1 2.5 1 4-.5-1.5 2.5-3.5 3-6 1.5-1.5-1-2.5-1-4 .5zm-3 5c1.5-2.5 3.5-3 6-1.5 1.5 1 2.5 1 4-.5-1.5 2.5-3.5 3-6 1.5-1.5-1-2.5-1-4 .5z" fill="#06B6D4"/>
        </svg>
      );

    case 'nodejs':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 2.5l8 4.6v9.2l-8 4.6-8-4.6V7.1L12 2.5z" fill="#339933"/>
          <path d="M12 6.5v11M7.5 9l9 5.2M7.5 14.2l9-5.2" stroke="#FFFFFF" strokeWidth="1.2"/>
        </svg>
      );

    case 'mongodb':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 2C11 5 7 8.5 7 13c0 3.2 2 6 5 7.5 3-1.5 5-4.3 5-7.5 0-4.5-4-8-5-11z" fill="#47A248"/>
          <path d="M12 2v18.5" stroke="#FFFFFF" strokeWidth="0.8"/>
        </svg>
      );

    case 'redis':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 4l9 4-9 4-9-4 9-4z" fill="#D82C20"/>
          <path d="M3 11l9 4 9-4v3l-9 4-9-4v-3z" fill="#A81D13"/>
        </svg>
      );

    case 'microservices':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#0E7C7B"/>
          <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#F2A93B"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#2496ED"/>
          <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#6DB33F"/>
        </svg>
      );

    case 'langchain':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="5" width="6" height="6" rx="2" fill="#00A67E" />
          <rect x="14" y="5" width="6" height="6" rx="2" fill="#1C3C3C" stroke="#00A67E" strokeWidth="1.5" />
          <rect x="9" y="13" width="6" height="6" rx="2" fill="#F2A93B" />
          <path d="M7 11v4a2 2 0 0 0 2 2h2M17 11v4a2 2 0 0 1-2 2h-2" stroke="#00A67E" strokeWidth="1.5" />
        </svg>
      );

    case 'nextjs':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9.5" fill="#000000" stroke="#FFFFFF" strokeWidth="1" />
          <path d="M9 8v8l8-9.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M15 11v5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'workday':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#0875E1" />
          <path d="M6 13c1.5 3 4 5 6 5s4.5-2 6-5" stroke="#F58220" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="12" cy="8.5" r="2" fill="#FFFFFF" />
        </svg>
      );

    case 'leetcode':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M15 5l-6 6 6 6" stroke="#FFA116" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 12h8" stroke="#FFA116" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    default:
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#0E7C7B" fillOpacity="0.25" stroke="#0E7C7B" strokeWidth="1.5"/>
          <path d="M7 12h10M12 7v10" stroke="#F2A93B" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
  }
};

interface TechLogoTileProps {
  tech: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Crisp, high-end technology logo tile strictly showing ONLY THE IMAGE - no text!
export const TechLogoTile: React.FC<TechLogoTileProps> = ({ 
  tech, 
  size = 'md',
  className = '' 
}) => {
  const details = getTechDetails(tech);

  const containerSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10',
    lg: 'w-10 h-10 sm:w-11 sm:h-11'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div 
      title={details.name}
      className={`relative group/tile flex items-center justify-center rounded-xl bg-[#0B151C]/80 hover:bg-[#1F3B4D]/90 border border-white/15 hover:border-[#0E7C7B]/60 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-[#0E7C7B]/20 shrink-0 cursor-default ${containerSizes[size]} ${className}`}
    >
      {/* Subtle top-light gradient reflection */}
      <div className="absolute inset-x-1 top-0.5 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-full pointer-events-none" />
      
      {/* Centered official tech logo image */}
      <TechLogoImage tech={tech} size={iconSizes[size]} />
    </div>
  );
};
