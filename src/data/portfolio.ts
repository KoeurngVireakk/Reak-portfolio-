import avatarPhoto from "../components/photo/IMG_9318-fallback.jpg";
import avatarPhotoWebp from "../components/photo/IMG_9318.webp";

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

export type ArchitectureTier = {
  tier: string;
  technology: string;
  detail: string;
};

export type EngineeringDecision = {
  title: string;
  reason: string;
};

export type Project = {
  slug: string;
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
  accent: string;
  media?: ProjectMedia;
  // Phase 5 engineering evidence extensions
  architectureTiers?: ArchitectureTier[];
  decisions?: EngineeringDecision[];
  securityDetails?: string[];
  testingDetails?: string[];
  challenges?: string[];
  lessons?: string[];
};

export const professionalIdentity = {
  primary: "Information Technology Student",
  secondary: "Full-Stack Developer",
  directions: [
    "Backend Engineering",
    "Full-Stack Development",
    "Application Security",
    "IT Support & Operations",
  ],
};

export const education = {
  degree: "Bachelor of Science in Information Technology",
  institution: "Build Bright University",
  campus: "Battambang Campus",
  period: "2023 — Present",
  status: "Final year",
  focus:
    "Software engineering, database architecture, networking fundamentals, cybersecurity, and practical IT systems.",
};

export const languages = [
  { language: "Khmer", proficiency: "Native / Excellent" },
  { language: "English", proficiency: "Developing working proficiency" },
];

export const workingPrinciples = [
  {
    title: "Responsible",
    description: "Accountable execution across transactional integrity, business logic, and reliable states.",
  },
  {
    title: "Research-Driven",
    description: "Methodical technical investigation before adopting patterns, packages, or architectural boundaries.",
  },
  {
    title: "Collaborative",
    description: "Clear communication, Git workflows, clean documentation, and respectful cross-team coordination.",
  },
  {
    title: "Independent Learning",
    description: "Continuous hands-on self-study across modern ecosystems, official docs, and system diagnostics.",
  },
];

export type HowIWorkStep = {
  step: string;
  title: string;
  summary: string;
  evidence: string;
};

export const howIWork: HowIWorkStep[] = [
  {
    step: "01",
    title: "Understand & Scope",
    summary: "Analyze user roles, workflow boundaries, and data models before writing implementation code.",
    evidence: "Role boundaries, data flows, and explicit API contract expectations.",
  },
  {
    step: "02",
    title: "Design Architecture",
    summary: "Structure clean service layers, relational data schemas, and role-based access rules.",
    evidence: "Versioned migrations (Flyway/EF), schema normalization, and least-privilege tokens.",
  },
  {
    step: "03",
    title: "Implement & Test",
    summary: "Build typed components, isolated business logic, and automated test assertions.",
    evidence: "Layered architecture, unit assertions, and practical integration checks.",
  },
  {
    step: "04",
    title: "Secure & Harden",
    summary: "Enforce input validation pipelines, session tokens, and local offline protections.",
    evidence: "Parameterized queries, token validation, rate-limiting, and local biometric processing.",
  },
  {
    step: "05",
    title: "Verify & Deliver",
    summary: "Validate builds in CI, run diagnostic scripts, and verify cross-device reliability.",
    evidence: "GitHub Actions CI checks, cross-device verification, and environment doctor scripts.",
  },
];

export type ITFoundationDomain = {
  domain: string;
  title: string;
  description: string;
  evidenceType: "Academic Lab" | "System Lab" | "Practical Practice";
  evidenceContext: string;
  evidenceNotes: string[];
  skills: string[];
};

export const itFoundations: ITFoundationDomain[] = [
  {
    domain: "NETWORK",
    title: "LAN & Networking Fundamentals",
    description: "Network topography, IP addressing, and connectivity diagnostics.",
    evidenceType: "Academic Lab",
    evidenceContext: "BBU IT Networking Curriculum & Hardware Labs",
    evidenceNotes: [
      "Subnetting calculations & Cisco Packet Tracer topology designs",
      "Physical router, switch, and AP patch cabling & configuration",
      "ICMP, traceroute, and ARP connectivity diagnostics",
    ],
    skills: [
      "IP Addressing & Subnetting",
      "DNS & DHCP Configuration",
      "LAN Switching & Basic Routing",
      "Router & Access Point Setup",
      "Connectivity Diagnostics (ping, traceroute)",
    ],
  },
  {
    domain: "SYSTEMS",
    title: "Operating Systems & Administration",
    description: "Workstation and server environments across Windows and Linux platforms.",
    evidenceType: "System Lab",
    evidenceContext: "BBU Systems Laboratory & Personal Practice Environments",
    evidenceNotes: [
      "Ubuntu & Kali Linux terminal administration and permissions",
      "Windows Server domain environment setup and service controls",
      "Daemon lifecycle management and scheduled automation",
    ],
    skills: [
      "Windows Client & Server Environments",
      "Linux Fundamentals (Ubuntu, Kali)",
      "Service & Process Management",
      "User Accounts & NTFS/POSIX Permissions",
      "Task Scheduler & System Services",
    ],
  },
  {
    domain: "SUPPORT",
    title: "Hardware, Peripherals & Workplace IT",
    description: "Component assembly, peripheral integration, and user support diagnostics.",
    evidenceType: "Practical Practice",
    evidenceContext: "Hands-on Technical Practice & Workstation Maintenance",
    evidenceNotes: [
      "Desktop workstation motherboard, CPU, RAM, and storage assembly",
      "OS imaging, clean installation, and driver troubleshooting",
      "Network printer, scanner, and workplace email client configuration",
    ],
    skills: [
      "Hardware Assembly & Component Diagnostics",
      "OS & Application Installation",
      "Network Printer & Scanner Configuration",
      "Workplace Email Client Setup (IMAP/SMTP/Exchange)",
      "First-Line Hardware & Software Support",
    ],
  },
];

export const profile = {
  name: "Koeurng Vireak",
  shortName: "Vireak",
  role: "Information Technology Student · Full-Stack Developer",
  tagline:
    "Final-year Information Technology student building practical software across full-stack development, backend systems, application security, and IT infrastructure.",
  email: "koeurngvireak@bb.bbu.edu.kh",
  location: "Battambang, Cambodia",
  github: "https://github.com/KoeurngVireakk",
  avatar: avatarPhoto,
  avatarWebp: avatarPhotoWebp,
  resumeUrl: undefined as string | undefined, // Safe: only activated when verified public file exists
};

export const facts = [
  { label: "Education", value: "B.IT (Final Year)" },
  { label: "Institution", value: "Build Bright University" },
  { label: "Primary focus", value: "Backend & Full-Stack" },
  { label: "Location", value: "Battambang, Cambodia" },
];

export type FocusArea = {
  title: string;
  description: string;
  technologies: string[];
  demonstratedProjects: Array<{ slug: string; name: string; shortName: string; role: string }>;
};

export const focusAreas: FocusArea[] = [
  {
    title: "Frontend Engineering",
    description:
      "Responsive product interfaces with React, TypeScript, Tailwind CSS, Razor and Thymeleaf views, and practical UX flows.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML/CSS"],
    demonstratedProjects: [
      { slug: "koupreng-einvitation", name: "Koupreng E-Invitation", shortName: "EI", role: "Full-Stack RSVP & Guest Client" },
      { slug: "e-menu-saas", name: "E-Menu SaaS", shortName: "EM", role: "PWA Customer Catalog & Admin UI" },
    ],
  },
  {
    title: "Backend & Data",
    description:
      "REST APIs, authentication, authorization, transactions, relational data modeling, migrations, and server-side business rules.",
    technologies: ["Spring Boot", "Laravel", "ASP.NET Core", "MySQL", "SQL Server", "Firebase"],
    demonstratedProjects: [
      { slug: "koupreng-einvitation", name: "Koupreng E-Invitation", shortName: "EI", role: "Spring Boot REST Services & MySQL" },
      { slug: "loan-management", name: "Loan Management System", shortName: "LM", role: "Transactional Services & Flyway" },
      { slug: "sale-management", name: "Sale Management System", shortName: "SM", role: "EF Core ORM & Negative-Stock Rules" },
      { slug: "e-menu-saas", name: "E-Menu SaaS", shortName: "EM", role: "Laravel REST API & Schema Design" },
    ],
  },
  {
    title: "Mobile & Applied AI",
    description:
      "Flutter applications and local computer-vision workflows using InsightFace, OpenCV, ONNX Runtime, and camera integrations.",
    technologies: ["Flutter", "Dart", "Python", "PySide6", "InsightFace", "OpenCV"],
    demonstratedProjects: [
      { slug: "krama", name: "KRAMA", shortName: "KR", role: "Flutter Client & Cloud Functions" },
      { slug: "face-attendance-studio", name: "Face Attendance Studio", shortName: "FA", role: "PySide6 & Local ONNX Inference" },
    ],
  },
  {
    title: "Security & Delivery",
    description:
      "Secure-by-design application work including role-based access control, secret handling, CI/CD, Docker, Cloudflare, and testing.",
    technologies: ["Spring Security", "ASP.NET Identity", "GitHub Actions", "Docker", "Cloudflare", "Kali Linux"],
    demonstratedProjects: [
      { slug: "loan-management", name: "Loan Management System", shortName: "LM", role: "Spring Security RBAC & CSRF Protection" },
      { slug: "sale-management", name: "Sale Management System", shortName: "SM", role: "ASP.NET Identity & Antiforgery Tokens" },
      { slug: "krama", name: "KRAMA", shortName: "KR", role: "Deny-by-Default Firestore Security Rules" },
      { slug: "face-attendance-studio", name: "Face Attendance Studio", shortName: "FA", role: "Zero-Cloud Local Biometric Processing" },
    ],
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
  "GitHub Actions",
];

export const technologyProjectMap: Record<string, Array<{ slug: string; name: string; shortName: string }>> = {
  React: [
    { slug: "koupreng-einvitation", name: "Koupreng E-Invitation", shortName: "EI" },
    { slug: "e-menu-saas", name: "E-Menu SaaS", shortName: "EM" },
  ],
  TypeScript: [
    { slug: "koupreng-einvitation", name: "Koupreng E-Invitation", shortName: "EI" },
    { slug: "krama", name: "KRAMA", shortName: "KR" },
  ],
  "Spring Boot": [
    { slug: "koupreng-einvitation", name: "Koupreng E-Invitation", shortName: "EI" },
    { slug: "loan-management", name: "Loan Management System", shortName: "LM" },
  ],
  Java: [
    { slug: "koupreng-einvitation", name: "Koupreng E-Invitation", shortName: "EI" },
    { slug: "loan-management", name: "Loan Management System", shortName: "LM" },
  ],
  Laravel: [
    { slug: "e-menu-saas", name: "E-Menu SaaS", shortName: "EM" },
  ],
  "ASP.NET Core": [
    { slug: "sale-management", name: "Sale Management System", shortName: "SM" },
  ],
  Flutter: [
    { slug: "krama", name: "KRAMA", shortName: "KR" },
  ],
  Firebase: [
    { slug: "krama", name: "KRAMA", shortName: "KR" },
  ],
  MySQL: [
    { slug: "koupreng-einvitation", name: "Koupreng E-Invitation", shortName: "EI" },
    { slug: "loan-management", name: "Loan Management System", shortName: "LM" },
    { slug: "e-menu-saas", name: "E-Menu SaaS", shortName: "EM" },
  ],
  "SQL Server": [
    { slug: "sale-management", name: "Sale Management System", shortName: "SM" },
  ],
  Python: [
    { slug: "face-attendance-studio", name: "Face Attendance Studio", shortName: "FA" },
  ],
  Docker: [
    { slug: "loan-management", name: "Loan Management System", shortName: "LM" },
    { slug: "koupreng-einvitation", name: "Koupreng E-Invitation", shortName: "EI" },
  ],
  Cloudflare: [
    { slug: "e-menu-saas", name: "E-Menu SaaS", shortName: "EM" },
  ],
  "GitHub Actions": [
    { slug: "sale-management", name: "Sale Management System", shortName: "SM" },
    { slug: "loan-management", name: "Loan Management System", shortName: "LM" },
  ],
};

export const projects: Project[] = [
  {
    slug: "koupreng-einvitation",
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
    accent: "#d7ba77",
    featured: true,
    architectureTiers: [
      {
        tier: "Presentation Tier",
        technology: "React 19 & TypeScript",
        detail: "Interactive guest RSVP portal, dynamic invitation customizer, and host event management console.",
      },
      {
        tier: "Service Tier",
        technology: "Spring Boot REST Services",
        detail: "Stateless API endpoints, JWT authentication filter, guest state transitions, and check-in validation.",
      },
      {
        tier: "Persistence Tier",
        technology: "MySQL Relational Database",
        detail: "Transactional storage for guest records, seating assignments, RSVP tallies, and event configurations.",
      },
    ],
    decisions: [
      {
        title: "Decoupled Guest Portal from Host Console",
        reason:
          "Separates high-volume public RSVP requests from administrative invitation publishing, keeping the guest payload lean and eliminating accidental exposure of host controls.",
      },
      {
        title: "Cryptographically Signed QR Event Passes",
        reason:
          "Encodes a signed verification token inside the guest QR code to prevent duplicate attendance logging and ticket forgery during on-site event check-in.",
      },
    ],
    securityDetails: [
      "Stateless JWT authentication with distinct claims for event hosts and guests.",
      "Strict CORS rules and server-side request sanitization on all guest response routes.",
      "Rate limiting on public RSVP submission endpoints to safeguard database write transactions.",
    ],
    testingDetails: [
      "Spring Boot backend unit tests validating guest status transitions and seating constraints.",
      "Playwright end-to-end test suite testing create → publish → guest response → QR check-in flows.",
      "Static analysis and automated build checks in team repository workflow.",
    ],
    challenges: [
      "Handling concurrent guest responses during invitation drops without race conditions on limited table allocations.",
    ],
    lessons: [
      "Establishing strict API contracts early significantly accelerates frontend and backend team coordination.",
    ],
  },
  {
    slug: "krama",
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
    accent: "#a85245",
    repositoryLabel: "Private repository",
    featured: true,
    architectureTiers: [
      {
        tier: "Client Architecture",
        technology: "Flutter & Riverpod",
        detail: "Feature-first mobile architecture separated into presentation, application, domain, and data layers.",
      },
      {
        tier: "Authoritative Mediation",
        technology: "Firebase Cloud Functions (TypeScript)",
        detail: "Server-side functions enforcing stock decrements, commission calculations, and order state mutations.",
      },
      {
        tier: "Data & Security Rules",
        technology: "Cloud Firestore & Storage",
        detail: "Deny-by-default security rules validating document structures and role-based custom claims.",
      },
    ],
    decisions: [
      {
        title: "Server-Authoritative Mutations in Cloud Functions",
        reason:
          "Client devices cannot be trusted with inventory decrements, artisan commission payouts, or order finalization; all critical mutations execute in verified server runtimes.",
      },
      {
        title: "Deny-by-Default Firestore Security Rules",
        reason:
          "Guarantees that actors (customers, artisans, vendors, admins) can only query their authorized document subtrees through explicit role claim validations.",
      },
    ],
    securityDetails: [
      "Custom Auth claims isolating 4 distinct actor roles (Customer, Artisan, Vendor, Admin).",
      "Deny-by-default Firestore rules with strict schema field validations on every write.",
      "Sensitive operational logic isolated inside Cloud Functions rather than executed on client devices.",
    ],
    testingDetails: [
      "Flutter widget and domain unit tests validating Riverpod state transitions.",
      "Firebase Local Emulator Suite testing Firestore security rules against unauthorized cross-role access.",
      "Automated verification scripts for Cloud Functions deployment artifact integrity.",
    ],
    challenges: [
      "Enforcing role separation and data integrity across multi-actor marketplace workflows in a serverless environment.",
    ],
    lessons: [
      "Emulator-driven security rules testing catches permission bypass vulnerabilities before deploying to production.",
    ],
  },
  {
    slug: "face-attendance-studio",
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
    accent: "#67d5c5",
    repository: "https://github.com/KoeurngVireakk/face_attendance_recognition",
    featured: true,
    architectureTiers: [
      {
        tier: "Desktop Presentation Tier",
        technology: "PySide6 (Qt for Python)",
        detail: "Hardware-accelerated desktop UI with live camera viewfinder, enrollment wizard, and attendance reporting.",
      },
      {
        tier: "Computer Vision Engine",
        technology: "InsightFace, OpenCV & ONNX Runtime",
        detail: "Local face detection, landmark alignment, and 512-dimensional embedding generation without cloud latency.",
      },
      {
        tier: "Local Storage & Analytics",
        technology: "SQLite Relational Database",
        detail: "Embedded database storing cosine similarity indexing, member profiles, schedules, and audit history.",
      },
    ],
    decisions: [
      {
        title: "100% Local Inference via ONNX Runtime",
        reason:
          "Ensures complete biometric privacy by computing facial embeddings on-device without sending facial imagery across the internet, eliminating cloud breach exposure.",
      },
      {
        title: "Pre-Flight Diagnostic Doctor Script",
        reason:
          "Validates camera hardware access, model weight hashes, and CPU/CUDA driver compatibility before starting the main attendance loop to prevent runtime crashes.",
      },
    ],
    securityDetails: [
      "Zero cloud biometric transmission: facial templates and embeddings are calculated and stored purely on local disk.",
      "Audit trail logging for all manual attendance overrides and administrative policy modifications.",
      "Model weights hash integrity checks to prevent tampered or corrupted ONNX model files.",
    ],
    testingDetails: [
      "Built-in doctor diagnostic suite testing camera access, library dependencies, and hardware capabilities.",
      "Offline demo mode with synthetic/mock image feeds for automated UI verification without webcam hardware.",
      "Unit tests covering cosine similarity threshold logic and attendance policy window evaluation.",
    ],
    challenges: [
      "Optimizing inference throughput on standard CPU hardware while maintaining reliable recognition confidence thresholds.",
    ],
    lessons: [
      "A robust pre-flight diagnostic check dramatically simplifies troubleshooting when deploying desktop software across varied target machines.",
    ],
  },
  {
    slug: "e-menu-saas",
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
    accent: "#e0a55c",
    repository: "https://github.com/KoeurngVireakk/e-menu-saas",
    featured: true,
    architectureTiers: [
      {
        tier: "Client & Offline Tier",
        technology: "React 19 & PWA Service Worker",
        detail: "Vite-bundled SPA with selective cache manifest, offline item browsing, and local cart state.",
      },
      {
        tier: "Backend Service Tier",
        technology: "Laravel REST API",
        detail: "Sanctum authentication, menu item management, table QR code routing, and order session validation.",
      },
      {
        tier: "Relational Persistence",
        technology: "MySQL Database",
        detail: "Normalized catalog tables, modifier groups, pricing tiers, and restaurant tenant records.",
      },
    ],
    decisions: [
      {
        title: "Network-First Cache for Public Menus, Strict Online for Checkout",
        reason:
          "Diners can browse food catalogs smoothly even in venues with weak cellular signal, while order submissions and payment mutations strictly require verified live connectivity.",
      },
      {
        title: "Exclusion of Admin Endpoints from PWA Cache",
        reason:
          "Prevents stale permission data or administrative session tokens from lingering in service worker caches on shared devices.",
      },
    ],
    securityDetails: [
      "Laravel Sanctum token authentication for restaurant owners and staff.",
      "Explicit service worker cache manifest excluding authenticated API endpoints and customer payment payloads.",
      "Request validation rules guarding against malformed item options or price manipulation.",
    ],
    testingDetails: [
      "Laravel PHPUnit/Pest feature tests verifying catalog retrieval and order validation endpoints.",
      "Service worker offline cache behavior tests simulating disconnected network conditions.",
      "Vite production build and bundle analyzer checks.",
    ],
    challenges: [
      "Preventing split-brain cart states when a user transitions between offline browsing and online order submission.",
    ],
    lessons: [
      "Clear offline boundaries build trust: offline is an enhancement for reading, not a loophole for writing.",
    ],
  },
  {
    slug: "loan-management",
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
    accent: "#6a9ee8",
    repositoryLabel: "Private repository",
    featured: false,
    architectureTiers: [
      {
        tier: "Server-Rendered Presentation",
        technology: "Spring Boot MVC & Thymeleaf",
        detail: "Server-rendered HTML views with responsive tabular layouts, amortization charts, and PDF exports.",
      },
      {
        tier: "Security & Business Tier",
        technology: "Spring Security & Transactional Services",
        detail: "Role-based access control enforcing Officer vs. Manager sign-offs with ACID transaction boundaries.",
      },
      {
        tier: "Database & Migration Tier",
        technology: "MySQL & Flyway Migrations",
        detail: "Versioned SQL migration scripts ensuring repeatable schema deployment and audit trail logging.",
      },
    ],
    decisions: [
      {
        title: "Deterministic Schema Migrations with Flyway",
        reason:
          "Guarantees that database schemas, foreign keys, and audit tables deploy identically across local development, CI test containers, and staging environments.",
      },
      {
        title: "Multi-Tier Approval State Machine",
        reason:
          "Enforces that loan disbursement requires distinct sign-off from both Loan Officers and Branch Managers, preventing unauthorized single-actor fund approval.",
      },
    ],
    securityDetails: [
      "Spring Security URL authorization filters separating Admin, Branch Manager, and Officer endpoints.",
      "Cross-Site Request Forgery (CSRF) protection on all form post submissions.",
      "Encrypted credential storage using BCrypt and session fixation protection.",
    ],
    testingDetails: [
      "Spring Boot integration tests executed against an isolated MySQL container service in CI.",
      "Amortization schedule calculation unit tests verifying interest and principal accuracy across payment terms.",
      "Role access control tests verifying HTTP 403 Forbidden on unauthorized branch administrative routes.",
    ],
    challenges: [
      "Maintaining absolute numerical precision in compound interest and amortization calculations while enforcing branch data isolation.",
    ],
    lessons: [
      "Automating database migrations in version control eliminates drift and ensures reproducible testing.",
    ],
  },
  {
    slug: "sale-management",
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
    accent: "#59bbaa",
    repositoryLabel: "Private repository",
    featured: false,
    architectureTiers: [
      {
        tier: "POS Presentation Tier",
        technology: "ASP.NET Core MVC & Razor Views",
        detail: "Point of sale interface with barcode scanner input, real-time cart calculations, and receipt generation.",
      },
      {
        tier: "Business Logic & ORM",
        technology: "Entity Framework Core",
        detail: "Atomic transactional service layer managing negative-stock guards, inventory adjustments, and returns.",
      },
      {
        tier: "Identity & Persistence Tier",
        technology: "SQL Server & ASP.NET Identity",
        detail: "Centralized credential storage, role-based authorization policies (Admin vs. Cashier), and audit logs.",
      },
    ],
    decisions: [
      {
        title: "Negative-Stock Guards at Service Layer",
        reason:
          "Prevents concurrent cashier checkout transactions from driving inventory counts below zero by wrapping stock adjustments in atomic database transactions.",
      },
      {
        title: "Rate-Limiting on Authentication and POS Checkout",
        reason:
          "Protects login endpoints against brute-force attacks and prevents rapid duplicate receipt generations from accidental double-taps on POS touchscreens.",
      },
    ],
    securityDetails: [
      "ASP.NET Core Identity with password hashing, account lockout policies, and role authorization (Admin vs. Cashier).",
      "Antiforgery token validation enforced across all POST, PUT, and DELETE actions.",
      "Security headers (X-Frame-Options, X-Content-Type-Options) to protect administrative interfaces.",
    ],
    testingDetails: [
      "xUnit test suite covering inventory adjustment calculations and checkout transaction invariants.",
      "EF Core in-memory database tests verifying cascade rules on customer returns and receipts.",
      "GitHub Actions workflow running code formatting verification, test execution, and deployment artifact bundling.",
    ],
    challenges: [
      "Ensuring sub-second POS checkout response times while atomically updating inventory, customer balances, and tax receipts.",
    ],
    lessons: [
      "Pairing declarative Identity authorization with defensive service layer validations creates a robust multi-tier defense.",
    ],
  },
];

export const journey = [
  {
    date: "2023 — Present",
    title: "Bachelor of Science in Information Technology",
    organization: "Build Bright University · Battambang Campus",
    description:
      "Academic foundation covering software engineering, relational database architecture, LAN networking, cybersecurity, and practical IT systems.",
  },
  {
    date: "2025 — 2026",
    title: "Applied Project Engineering",
    organization: "Academic & Personal Systems",
    description:
      "Built multi-tier applications across React, Spring Boot, Laravel, ASP.NET Core, Flutter, Python, relational databases, and local computer-vision workflows.",
  },
  {
    date: "2026",
    title: "Production-Minded Engineering",
    organization: "Hardening, Migrations & CI/CD",
    description:
      "Expanded beyond CRUD into role-based authorization, database migrations with Flyway, test automation, CI/CD pipelines, PWA caching, and containerized deployment.",
  },
  {
    date: "Current",
    title: "Internship & Junior Direction",
    organization: "Backend, Full-Stack, AppSec & IT Support",
    description:
      "Actively seeking internship and junior engineering opportunities to contribute reliable code, disciplined architecture habits, and foundational IT troubleshooting.",
  },
];
