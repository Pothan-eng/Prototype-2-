export type UserRole = 'student' | 'company' | 'college' | 'academician';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  organization: string;
  department?: string;
  title: string;
  initials: string;
  roleLabel: string;
  themeColor: {
    primary: string;
    bg: string;
    text: string;
    border: string;
    badge: string;
    light: string;
  };
}

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (role: UserRole, email?: string, password?: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  demoUsers: Record<UserRole, UserProfile>;
}

export const DEMO_USERS: Record<UserRole, UserProfile> = {
  student: {
    id: 'usr_student_01',
    name: 'Alex Rivera',
    email: 'alex.rivera@student.edu',
    role: 'student',
    organization: 'Apex Institute of Technology',
    department: 'Computer Science & AI',
    title: 'Final Year Undergrad Innovator',
    initials: 'AR',
    roleLabel: 'Student Innovator',
    themeColor: {
      primary: 'emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
      light: 'emerald-500',
    },
  },
  company: {
    id: 'usr_company_01',
    name: 'Sarah Chen',
    email: 'sarah.chen@novatech.io',
    role: 'company',
    organization: 'NovaTech Industries',
    department: 'Applied AI & R&D Division',
    title: 'Director of Industry Partnerships',
    initials: 'SC',
    roleLabel: 'Enterprise Partner',
    themeColor: {
      primary: 'indigo-600',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      text: 'text-indigo-700 dark:text-indigo-400',
      border: 'border-indigo-200 dark:border-indigo-800',
      badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700',
      light: 'indigo-500',
    },
  },
  college: {
    id: 'usr_college_01',
    name: 'Dr. Marcus Brody',
    email: 'm.brody@apexuniv.edu',
    role: 'college',
    organization: 'Apex University System',
    department: 'Office of Academic & Industrial Relations',
    title: 'Dean of Corporate Collaborations',
    initials: 'MB',
    roleLabel: 'College Administrator',
    themeColor: {
      primary: 'amber-600',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-300 dark:border-amber-700',
      light: 'amber-500',
    },
  },
  academician: {
    id: 'usr_academician_01',
    name: 'Prof. Elena Rostova',
    email: 'elena.rostova@lab.apexuniv.edu',
    role: 'academician',
    organization: 'Apex Quantum & Robotics Research Lab',
    department: 'Department of Electrical & Systems Engineering',
    title: 'Principal Investigator & Professor',
    initials: 'ER',
    roleLabel: 'Academician / Researcher',
    themeColor: {
      primary: 'purple-600',
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-purple-300 dark:border-purple-700',
      light: 'purple-500',
    },
  },
};

export const ROLE_CONFIGS: Record<UserRole, { label: string; description: string; dashboardPath: string; color: string }> = {
  student: {
    label: 'Student',
    description: 'Explore collaborative challenges, connect with faculty labs, and build real-world project portfolios.',
    dashboardPath: '/dashboard/student',
    color: 'emerald',
  },
  company: {
    label: 'Company',
    description: 'Post industry problem statements, sponsor capstone teams, and discover university research.',
    dashboardPath: '/dashboard/company',
    color: 'indigo',
  },
  college: {
    label: 'College',
    description: 'Manage institutional MoUs, track department incubation metrics, and foster industry ties.',
    dashboardPath: '/dashboard/college',
    color: 'amber',
  },
  academician: {
    label: 'Academician',
    description: 'Publish research proposals, engage in industry consultations, and mentor student researchers.',
    dashboardPath: '/dashboard/academician',
    color: 'purple',
  },
};
