export type ProjectCategory = "Web" | "Backend" | "Mobile" | "AI/CV" | "Security";
export type ProjectPresentation = "browser" | "phone-dashboard" | "desktop" | "dashboard" | "pos";

export type ProjectMediaAsset = {
  src: string;
  alt: string;
};

export type ProjectMedia = {
  kind: "desktop" | "mobile" | "dashboard" | "gallery";
  assets: ProjectMediaAsset[];
};

export type Project = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  role: string;
  problem: string;
  solution: string;
  architecture: string;
  categories: ProjectCategory[];
  stack: string[];
  highlights: string[];
  security?: string;
  testing?: string;
  status: string;
  repository?: string;
  repositoryLabel?: string;
  featured?: boolean;
  presentation: ProjectPresentation;
  media?: ProjectMedia;
};

export const profile = {
  name: "Koeurng Vireak",
  shortName: "Vireak",
  role: "Information Technology Student · Full-Stack Developer",
  tagline:
    "I build practical systems across frontend, backend, databases, mobile, applied AI, and application security.",
  email: "koeurngvireak@bb.bbu.edu.kh",
  location: "Battambang, Cambodia",
  github: "https://github.com/KoeurngVireakk",
  avatar: "https://avatars.githubusercontent.com/u/281500662?v=4",
};

export const facts = [
  { label: "Education", value: "Final-year B.IT" },
  { label: "Primary work", value: "Full-stack systems" },
  { label: "Based in", value: "Battambang, Cambodia" },
];

export const focusAreas = [
  {
    title: "Frontend Engineering",
    description:
      "Responsive product interfaces with React, TypeScript, Tailwind CSS, Razor and Thymeleaf views, and practical UX flows.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML/CSS"],
  },
  {
    title: "Backend & Data",
    description:
      "REST APIs, authentication, authorization, transactions, relational data modeling, migrations, and server-side business rules.",
    technologies: ["Spring Boot", "Laravel", "ASP.NET Core", "MySQL", "SQL Server", "Firebase"],
  },
  {
    title: "Mobile & Applied AI",
    description:
      "Flutter applications and local computer-vision workflows using InsightFace, OpenCV, ONNX Runtime, and camera integrations.",
    technologies: ["Flutter", "Dart", "Python", "PySide6", "InsightFace", "OpenCV"],
  },
  {
    title: "Security & Delivery",
    description:
      "Secure-by-design application work including role-based access control, secret handling, CI/CD, Docker, Cloudflare, and testing.",
    technologies: ["Spring Security", "ASP.NET Identity", "GitHub Actions", "Docker", "Cloudflare", "Kali Linux"],
  },
];

export const technologyRail = [
  "React",
  "TypeScript",
  "Spring Boot",
  "Java",
  "Laravel",
  "ASP.NET Core",
  "Flutter",
  "Firebase",
  "MySQL",
  "SQL Server",
  "Python",
  "Docker",
  "Cloudflare",
];

export const projects: Project[] = [
  {
    name: "Koupreng E-Invitation",
    shortName: "EI",
    tagline: "Full-stack Khmer wedding invitation platform",
    description:
      "A team-built e-invitation system connecting invitation publishing, guest responses, QR check-in, seating, gifts, and reporting.",
    role: "Team project · full-stack contribution",
    problem:
      "Wedding hosts need one connected workflow for publishing invitations, managing guests, collecting RSVPs, and checking people in on the day.",
    solution:
      "Separate user and admin experiences connect the invitation lifecycle from creation through guest response and event operations.",
    architecture: "React client · Spring Boot services · MySQL · JWT authentication",
    categories: ["Web", "Backend", "Security"],
    stack: ["React", "TypeScript", "Spring Boot", "MySQL", "JWT", "Playwright"],
    highlights: [
      "Core create → publish → guest → RSVP flow is integrated",
      "QR wedding check-in and seating workflows are connected",
      "Permissions, payment correctness, and production hardening remain explicit current work",
    ],
    security: "JWT authentication with permission and production-hardening work tracked as part of readiness.",
    testing: "Unit, backend, Playwright, build, and static-analysis foundations.",
    status: "Production-readiness phase",
    presentation: "browser",
    featured: true,
  },
  {
    name: "KRAMA",
    shortName: "KR",
    tagline: "Connected Cambodian fashion demo ecosystem",
    description:
      "A final-year Flutter and Firebase portfolio system connecting customers, admins, artisans, vendors, and creators through traceable commerce workflows.",
    role: "Final-year portfolio · application architecture and implementation",
    problem:
      "A multi-role marketplace needs consistent order, stock, payment-state, loyalty, and commission rules across several actor experiences.",
    solution:
      "A feature-first Flutter application delegates sensitive mutations to server-authoritative Cloud Functions and isolates actors by role.",
    architecture: "Flutter feature layers · Firebase · Cloud Functions · Riverpod",
    categories: ["Mobile", "Backend", "Security"],
    stack: ["Flutter", "Dart", "Firebase", "Cloud Functions", "Riverpod", "TypeScript"],
    highlights: [
      "Presentation, application, domain, and data boundaries",
      "Protected order, stock, payment-state, loyalty, and commission mutations",
      "Role claims and deny-by-default data access",
    ],
    security: "Deny-by-default Firestore rules, role claims, and server-authoritative business mutations.",
    testing: "Flutter, Functions, Firestore and Storage rules, plus emulator integration tests.",
    status: "University demo · private repository",
    presentation: "phone-dashboard",
    repositoryLabel: "Private repository",
    featured: true,
  },
  {
    name: "Face Attendance Studio",
    shortName: "FA",
    tagline: "Local-first face-recognition attendance desktop app",
    description:
      "A Windows desktop attendance system with enrollment, live recognition, check-in and check-out, schedules, audit history, and reports.",
    role: "Personal project · desktop and computer-vision engineering",
    problem:
      "Schools and small organizations need practical attendance workflows without sending biometric recognition to a cloud service.",
    solution:
      "Local biometric processing connects member enrollment, recognition, attendance policy, schedules, and reporting in one desktop application.",
    architecture: "PySide6 desktop UI · InsightFace and OpenCV · ONNX Runtime · SQLite",
    categories: ["AI/CV", "Security"],
    stack: ["Python", "PySide6", "InsightFace", "OpenCV", "ONNX Runtime", "SQLite"],
    highlights: [
      "Explicit check-in and check-out with schedule and policy handling",
      "CPU-first setup with optional verified NVIDIA GPU acceleration",
      "Demo mode, doctor scripts, and privacy guidance",
    ],
    security: "Biometric recognition stays local; the project includes privacy guidance and local storage.",
    testing: "Doctor scripts, setup checks, demo mode, and automated tests are included.",
    status: "Public repository",
    presentation: "desktop",
    repository: "https://github.com/KoeurngVireakk/face_attendance_recognition",
    featured: true,
  },
  {
    name: "E-Menu SaaS",
    shortName: "EM",
    tagline: "QR-based digital menu platform",
    description:
      "A restaurant and shop digital-menu platform with a Laravel API, React customer and admin interfaces, MySQL persistence, and PWA support.",
    role: "Personal project · full-stack engineering",
    problem:
      "Public menus should stay useful on unreliable connections without exposing authenticated administration or allowing unsafe offline transactions.",
    solution:
      "The public menu experience uses deliberate caching and cart persistence while authenticated and payment-related operations stay online-only.",
    architecture: "React customer/admin clients · Laravel API · MySQL · PWA service worker",
    categories: ["Web", "Backend"],
    stack: ["Laravel", "React", "Tailwind CSS", "MySQL", "PWA", "Vite"],
    highlights: [
      "Separated backend API and customer/admin frontend",
      "Network-first caching for public menu APIs",
      "Offline cart persistence with blocked payment and order submission while offline",
    ],
    security: "Authenticated admin and payment data are deliberately excluded from offline caching.",
    status: "Public repository",
    presentation: "browser",
    repository: "https://github.com/KoeurngVireakk/e-menu-saas",
    featured: true,
  },
  {
    name: "Loan Management System",
    shortName: "LM",
    tagline: "Role-based loan operations platform",
    description:
      "A Spring Boot application for borrower management, loan workflows, approvals, amortization, payments, reporting, audits, and branch-level roles.",
    role: "Academic system · backend-focused engineering",
    problem:
      "Loan operations require controlled approvals, reliable calculations, traceable changes, and clear separation between branch responsibilities.",
    solution:
      "Transactional services and explicit authorization boundaries coordinate the loan lifecycle from borrower records through payments and reporting.",
    architecture: "Spring Boot · Thymeleaf · Spring Security · MySQL · Flyway",
    categories: ["Backend", "Web", "Security"],
    stack: ["Java 25", "Spring Boot", "Thymeleaf", "Spring Security", "MySQL", "Flyway"],
    highlights: [
      "Admin, branch manager, and loan officer boundaries",
      "Transactional services and versioned database migrations",
      "CSV and PDF reporting with automatic lifecycle handling",
    ],
    security: "Spring Security enforces role boundaries across operational responsibilities.",
    testing: "CI verifies the application against an isolated MySQL service.",
    status: "Private repository",
    presentation: "dashboard",
    repositoryLabel: "Private repository",
  },
  {
    name: "Sale Management System",
    shortName: "SM",
    tagline: "Sales, inventory, POS, and reporting system",
    description:
      "A role-based ASP.NET Core MVC system covering point of sale, catalog, inventory, customers, reporting, receipts, returns, settings, and audit history.",
    role: "Academic system · full-stack engineering",
    problem:
      "Sales and inventory operations need reliable stock rules, role separation, auditable changes, and a clear path from checkout to returns and reports.",
    solution:
      "A single MVC system joins POS, inventory controls, customer records, receipts, reporting, and administrative settings around explicit business rules.",
    architecture: "ASP.NET Core MVC · EF Core · SQL Server · ASP.NET Identity",
    categories: ["Web", "Backend", "Security"],
    stack: [".NET 10", "ASP.NET Core MVC", "EF Core", "SQL Server", "Tailwind CSS", "xUnit"],
    highlights: [
      "Admin and Cashier access boundaries",
      "Inventory receiving, adjustments, history, and negative-stock protection",
      "Centralized authentication and secure request handling",
    ],
    security: "Login rate limiting, antiforgery protection, secure headers, and centralized authorization.",
    testing: "GitHub Actions builds styles, verifies formatting, runs tests, and publishes artifacts.",
    status: "Private repository",
    presentation: "pos",
    repositoryLabel: "Private repository",
  },
];

export const journey = [
  {
    date: "2025–2026",
    title: "Final-Year Bachelor of Information Technology",
    organization: "Build Bright University · Battambang Campus",
    description:
      "Focused on full-stack systems, software engineering, databases, networking, cybersecurity, and final-year portfolio projects.",
  },
  {
    date: "2026",
    title: "Production-minded project engineering",
    organization: "Personal + university projects",
    description:
      "Expanded beyond CRUD into RBAC, migrations, testing, CI/CD, PWA behavior, security hardening, server-authoritative business logic, and deployment preparation.",
  },
  {
    date: "Current focus",
    title: "Backend, full-stack, and security-oriented roles",
    organization: "Internship / junior opportunities",
    description:
      "Building stronger evidence through deployable projects, documented architecture, secure engineering practices, and real project case studies.",
  },
];
