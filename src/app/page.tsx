'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROLE_CONFIGS, UserRole } from '@/types/auth';
import {
  GraduationCap,
  Building2,
  Landmark,
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Users,
  Layers,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();

  const handleRoleQuickStart = async (role: UserRole) => {
    await login(role);
    router.push(ROLE_CONFIGS[role].dashboardPath);
  };

  const roleCards: Array<{
    role: UserRole;
    title: string;
    description: string;
    icon: React.ElementType;
    badge: string;
    features: string[];
    theme: {
      border: string;
      bg: string;
      text: string;
      button: string;
      iconBg: string;
    };
  }> = [
    {
      role: 'student',
      title: 'Student Innovators',
      description: 'Engage with real corporate problem statements, collaborate with faculty labs, and build your capstone portfolio.',
      icon: GraduationCap,
      badge: 'Student Role',
      features: ['Industry Challenges & Hackathons', 'Faculty Lab Research Matching', 'Capstone Project Showcase'],
      theme: {
        border: 'hover:border-emerald-400 dark:hover:border-emerald-600',
        bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
        text: 'text-emerald-700 dark:text-emerald-300',
        button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        iconBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
      },
    },
    {
      role: 'company',
      title: 'Enterprise Partners',
      description: 'Post industry R&D briefs, sponsor student capstone teams, and discover commercializable university patents.',
      icon: Building2,
      badge: 'Company Role',
      features: ['Publish Problem Statements', 'Discover University Patents', 'Capstone Sponsorship Pipeline'],
      theme: {
        border: 'hover:border-indigo-400 dark:hover:border-indigo-600',
        bg: 'bg-indigo-50/50 dark:bg-indigo-950/20',
        text: 'text-indigo-700 dark:text-indigo-300',
        button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        iconBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400',
      },
    },
    {
      role: 'college',
      title: 'College / University',
      description: 'Manage formal institutional MoUs, oversee department incubation cells, and track accreditation metrics.',
      icon: Landmark,
      badge: 'College Role',
      features: ['Institutional MoU Management', 'Campus Incubation Tracker', 'NIRF/NAAC Metric Indexing'],
      theme: {
        border: 'hover:border-amber-400 dark:hover:border-amber-600',
        bg: 'bg-amber-50/50 dark:bg-amber-950/20',
        text: 'text-amber-800 dark:text-amber-300',
        button: 'bg-amber-600 hover:bg-amber-700 text-white',
        iconBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400',
      },
    },
    {
      role: 'academician',
      title: 'Academicians & Faculty',
      description: 'Submit sponsored research grant proposals, provide industry consultations, and mentor student researchers.',
      icon: BookOpen,
      badge: 'Academician Role',
      features: ['Funded Grant Proposal Hub', 'Industry Consultation Requests', 'Student Cohort Mentorship'],
      theme: {
        border: 'hover:border-purple-400 dark:hover:border-purple-600',
        bg: 'bg-purple-50/50 dark:bg-purple-950/20',
        text: 'text-purple-700 dark:text-purple-300',
        button: 'bg-purple-600 hover:bg-purple-700 text-white',
        iconBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-base shadow-md shadow-indigo-500/20">
              AI
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-base leading-tight">Academia–Industry</div>
              <div className="text-[11px] text-slate-500 font-medium">Collaboration Engine</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <Link
                href={ROLE_CONFIGS[user.role].dashboardPath}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm"
              >
                <span>Dashboard ({ROLE_CONFIGS[user.role].label})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm shadow-indigo-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Demo</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Hero & Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-6 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Step 1: Role-Based Access Control Prototype</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            Bridging the Divide Between{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-600">
              Academia & Industry
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto leading-relaxed">
            A unified collaboration engine connecting ambitious students, pioneering faculty researchers, visionary enterprises, and forward-thinking universities.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-md shadow-indigo-600/25"
            >
              <span>Explore Role Dashboards</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#roles"
              className="px-6 py-3 rounded-xl text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 transition"
            >
              Select Your Role Below
            </a>
          </div>
        </section>

        {/* 4 Role Selector Matrix Section */}
        <section id="roles" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Choose Your Role Workspace
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Select one of the 4 supported ecosystem roles to immediately enter its dedicated dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roleCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.role}
                  className={`rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-xl ${card.theme.border}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.theme.iconBg}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${card.theme.bg} ${card.theme.text}`}>
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                      {card.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {card.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleRoleQuickStart(card.role)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 shadow-xs ${card.theme.button}`}
                  >
                    <span>Launch {ROLE_CONFIGS[card.role].label} Space</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Feature Pillars */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Architecture Highlights
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Modular Frontend & Role-Based Access Control
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
                Built strictly to Step 1 specifications with clean component separation, mock authentication context, and dedicated role dashboards ready for backend integration.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <ShieldCheck className="w-6 h-6 text-indigo-600 mb-3" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Strict RBAC Routing</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Route protection guards each dashboard against unauthorized role access with fallback redirection.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <Layers className="w-6 h-6 text-emerald-600 mb-3" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Modular Architecture</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Clean interface boundaries allowing real REST or GraphQL APIs to connect seamlessly in subsequent steps.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <Users className="w-6 h-6 text-amber-600 mb-3" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Instant Switcher</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Quick demo role switcher allows hackathon evaluators to inspect all 4 perspectives in seconds.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Academia–Industry Collaboration Portal. Step 1 Frontend & Auth Prototype.
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-indigo-600 transition">Login Hub</Link>
            <Link href="/dashboard/student" className="hover:text-indigo-600 transition">Student</Link>
            <Link href="/dashboard/company" className="hover:text-indigo-600 transition">Company</Link>
            <Link href="/dashboard/college" className="hover:text-indigo-600 transition">College</Link>
            <Link href="/dashboard/academician" className="hover:text-indigo-600 transition">Academician</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
