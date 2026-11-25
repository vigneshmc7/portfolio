// Text of the Resume page, copied verbatim from the one-page PDF served at `pdf` below. The PDF is the
// document of record: when it changes, replace the file in public/ and update this text to match it.
// The page shows the contact links from the PDF header.
export const resume = {
  pdf: '/Vignesh_MayandiaChandran_Resume.pdf',
  education: [
    {
      org: 'The George Washington University, School of Business',
      date: 'Jul 2024 – May 2026',
      role: 'Master of Business Administration and Master of Science in Business Analytics',
      bullets: [
        'GPA: 3.8 | Relevant Coursework: Strategy, Operations, Data Analytics, Machine Learning',
        'President, Graduate Consulting Club: Ran a 300-member club and grew engagement 50% through case prep sessions and events',
        'GWSB Fellowship Award: Merit scholarship for leadership and academic excellence',
      ],
    },
    {
      org: 'Anna University',
      date: 'Jul 2014 – May 2018',
      role: 'Bachelor of Engineering in Mechanical Engineering',
      bullets: [
        'Founder, SAEINDIA collegiate club: Recruited 200 members, ran 3 programming tracks and raised $20K through fundraisers',
        'Team Captain, MBAJA 2018: Led 25 students to design and build a $10K off-road vehicle to compete against 500 college teams',
      ],
    },
  ],
  experience: [
    {
      org: 'The Dow Chemical Company',
      date: 'Oct 2021 – Apr 2024',
      role: 'Technical Program Manager | Senior Mechanical Engineer',
      bullets: [
        'Led a compliance-driven program moving inspection records, risk ratings and schedules for 30K assets at 15 global sites into one system, building the review templates each site used and delivering $3M in cost avoidance',
        'Partnered with vendor and IT teams to build a template that generates inspection drawings straight from 3D plant models, so plants halved drawing effort and saved $100K in year 1',
        'Restructured leadership\'s 5-phase rollout into 2 phases, a 3-site pilot and then the other 12 sites at once, so the program cut 300 duplicate tracking workbooks and finished 1 year early',
        'Aligned 50 stakeholders across 3 decision levels without formal authority, using weekly meetings, 60 milestone reviews, and risk reports tailored to each audience to keep all 15 independently run sites on schedule',
        'Standardized 160K equipment files across 14 plants into one folder structure and naming convention, coordinating 6 engineers to classify about 100 file types and applying every change in one scripted pass',
        'Grew the internal project pipeline 40% by publishing quarterly newsletters and targeted newsflashes that explained technical results in business terms to site leaders weighing new projects',
      ],
    },
    {
      org: 'The Dow Chemical Company',
      date: 'Dec 2018 – Sep 2021',
      role: 'Mechanical Engineer | Risk Analyst',
      bullets: [
        'Analyzed equipment risk across 6 manufacturing sites using inspection histories and process data, steering maintenance toward the highest-risk assets and avoiding $1M in downtime losses',
        'Redesigned the data workflow for review sessions with site experts, condensing each asset\'s 50 fields into 3 linked MS Access screens so busy experts could finish every session on schedule',
        'Resolved a backlog of 10K evidence files from a boiler-failure investigation in 1 week against a 2-month estimate by scripting the 80% of files that followed a pattern and checking the rest by hand',
        'Persuaded a resistant cross-functional team to revalidate SAP process data that contradicted field conditions after winning the project manager\'s backing with documented mismatches',
        'Trained 10 engineers in every stage of the team\'s work, from collecting technical data to leading meetings with site teams, through hands-on coaching and playbooks so new hires worked independently within a quarter',
      ],
    },
  ],
  consulting: [
    {
      title: 'Strategy Consultant, Energy Client (MBA Consulting Practicum)',
      date: 'Jan 2025 – May 2025',
      text: 'Structured a $500M market-entry decision for a $3B LNG operator across 6 Middle East and Africa markets, modeling 12 sensitivity cases on pricing, capex, and regulatory delay to set go/no-go thresholds and recommend 2 priority markets to client executives',
    },
    {
      title: 'Strategy Consultant, IT Client (Pro bono)',
      date: 'Jan 2025 – May 2025',
      text: 'Developed a market-expansion strategy for an IT and engineering staffing firm moving into project-based delivery, assessing its competitive position, talent pool, and nonprofit partnerships to guide a $1M investment across 5 growth areas',
    },
  ],
  projects: [
    {
      name: 'PlantPersonal.AI',
      link: { label: 'Concept Deck', href: 'https://drive.google.com/file/d/13WzMB9xn7RFmo3_AtK8aJnq6Qcr24o9P/view?usp=sharing' },
      text: 'Developed a go-to-market strategy and business case for an industrial AI product, sizing a $2B serviceable market, pricing a $10K monthly subscription, and planning a 3-stage rollout from 1 plant to about 500 plants',
    },
    {
      name: 'Weather-Ready AI',
      link: { label: 'GitHub', href: 'https://github.com/vigneshmc7/Weather-Ready-AI' },
      text: 'Interviewed 5 restaurant owners on demand-planning challenges and built a forecasting prototype using weather and local data to predict customer demand, explain key drivers and support operational decisions, with projected annual savings of $20K per operator',
    },
    {
      name: 'Mortgage Lending Model Audit',
      link: { label: 'GitHub', href: 'https://github.com/vigneshmc7/HMDA-ML-Model-Audit' },
      text: 'Trained a mortgage approval model and tested it on 1.7M held-out applications for accuracy, fairness and population drift, then designed advisory guidelines that cover 85% of cases and route the rest to human review',
    },
  ],
  skills: [
    { label: 'Technical Skills', text: 'SQL, Python, MS Excel (advanced), Power BI, Tableau, MS Access, Git/GitHub, Jira, Confluence, SAP, GE-APM' },
    { label: 'AI Proficiency', text: 'Claude Code, Codex CLI, Gemini, Workflow Automation, Multi-Agent Orchestration, Rapid Prototyping' },
    { label: 'Competencies', text: 'Program Management, Project Management, Stakeholder Management, Cross-Functional Collaboration, Executive Communication, Data Analysis, KPI Reporting, Process Improvement, Risk Management, Change Management, Financial Modeling' },
    { label: 'Interests', text: 'Avid fantasy book reader: The Wheel of Time by Robert Jordan; Math puzzles; Badminton' },
  ],
};
