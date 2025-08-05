export type SearchItem = {
  title: string;
  content: string;
  href: string;
};

export const searchData: SearchItem[] = [
  // ===================== ABOUT =====================
  {
    title: 'About - Introduction',
    content:
      "Hi, I'm M. Khotibul Umam, an Information Systems graduate from UIN Sunan Ampel Surabaya with a strong interest in web development, system governance, and internal audit.",
    href: '/about'
  },
  {
    title: 'About - Internship at PT Presindo Central',
    content:
      'Developed web-based archive management system using Laravel, Bootstrap, and REST API integration.',
    href: '/about#more'
  },
  {
    title: 'About - Work at PT Pelabuhan Indonesia',
    content:
      'Contributed to internal audits using ISO 9001, ISO 14001, ISPS Code, and SMK3. Involved in risk management, compliance monitoring, and BCM for cybersecurity.',
    href: '/about#more'
  },
  {
    title: 'About - Power BI Dashboard',
    content:
      'Created a dashboard to visualize water quality changes in Banjarmasin using Power BI.',
    href: '/about#more'
  },

  // ===================== EDUCATION =====================
  {
    title: 'Education - UIN Sunan Ampel Surabaya',
    content:
      'Bachelor of Information System (GPA 3.59/4.00), graduated CumLaude in 7 semesters. Thesis on Malware Forensic Analysis using D4I Framework.',
    href: '/about#more'
  },
  {
    title: 'Education - MAN 1 Blitar',
    content:
      'Graduated with focus on Science and Mathematics. Completed PRODISTIK in Graphic Design (collab with ITS Surabaya).',
    href: '/about#more'
  },

  // ===================== WORK EXPERIENCE =====================
  {
    title: 'Work Experience - PT Pelabuhan Indonesia',
    content:
      'Handled internal audits, ISO compliance, hardware setup, and developed BCM schemes for cybersecurity threats.',
    href: '/about#more'
  },
  {
    title: 'Work Experience - PT Presindo Central',
    content:
      'Built Laravel-based archive management system, integrated REST APIs, assisted in training and testing.',
    href: '/about#more'
  },

  // ===================== PROJECTS =====================
  //   {
  //     title: 'Projects - Web-based Archive Management System',
  //     content: 'Built during internship using Laravel + Bootstrap and REST API.',
  //     href: '/projects'
  //   },
  //   {
  //     title: 'Projects - Water Quality Dashboard (Power BI)',
  //     content:
  //       'Visualized water quality changes in Banjarmasin using Power BI for reporting and analytics.',
  //     href: '/projects'
  //   },
  //   {
  //     title: 'Projects - Car Paint Shop Management System',
  //     content:
  //       'Laravel-based system for inventory and customer management in car paint shop.',
  //     href: '/projects'
  //   },
  {
    title: 'Projects - Daily Ramadhan',
    content:
      'An app to track prayers and daily activities during Ramadhan with a clean, responsive interface.',
    href: '/projects/daily-ramadhan'
  },
  {
    title: 'Projects - Finance Management',
    content:
      'Track income and expenses through a dashboard that offers a real-time financial overview.',
    href: '/projects/finance-management'
  },
  {
    title: 'Projects - Terminal Portfolio',
    content: 'Terminal-style portfolio web app with command-line experience.',
    href: '/projects/terminal-portfolio'
  },
  {
    title: 'Projects - URL Shortener',
    content:
      'Modern URL shortener built with Next.js and Prisma, featuring QR code, custom slug, and sleek UI.',
    href: '/projects/url-shortener'
  },

  // ===================== TRAINING =====================
  {
    title: 'Training - ISO 19011 Internal Audit',
    content:
      'Understanding Internal Audit Concepts & Techniques from Global Kopelindo Synergy (2025).',
    href: '/about#more'
  },
  {
    title: 'Training - ISO 9001 & 22301 Awareness',
    content:
      'ISO 9001 and ISO 22301 Awareness Training, Global Kopelindo Synergy (2025).',
    href: '/about#more'
  },
  {
    title: 'Training - ISO 50001 & 50006',
    content: 'ISO 50001 Awareness Training and ISO 50006 Workshop (2024).',
    href: '/about#more'
  },
  {
    title: 'Training - Web Programming by Hacktiv8',
    content: 'Fundamental web programming course (2024).',
    href: '/about#more'
  },
  {
    title: 'Certification - BNSP Certified Data Scientist',
    content: 'National certification in data science from BNSP (2023).',
    href: '/about#more'
  },
  {
    title: 'Certification - Junior Computer Operator & Scientific Writing',
    content: 'PUSTIPD UINSA certification (2023).',
    href: '/about#more'
  },

  // ===================== GENERAL =====================
  {
    title: 'Resume',
    content:
      'Download my resume to learn more about my professional background.',
    href: 'https://drive.google.com/file/d/1w6UuAL2H6gkoXLa8hcuc600VfT9Uoslm/view?usp=sharing'
  },
  {
    title: 'Guestbook',
    content: 'A simple guestbook application built with Next.js.',
    href: '/guestbook'
  }
];
