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
  }> = [
    {
      role: 'student',
      title: 'Students',
      description: 'Solve industry problem statements, connect with faculty labs, and showcase capstones.',
      icon: GraduationCap,
    },
    {
      role: 'company',
      title: 'Companies',
      description: 'Post real-world R&D briefs, sponsor student capstone teams, and discover university research.',
      icon: Building2,
    },
    {
      role: 'college',
      title: 'Colleges',
      description: 'Manage formal institutional MoUs, track department collaborations, and support incubation.',
      icon: Landmark,
    },
    {
      role: 'academician',
      title: 'Academicians',
      description: 'Lead sponsored research grant proposals, provide expert consultation, and mentor student fellows.',
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              AI
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm leading-tight">Academia–Industry</div>
              <div className="text-[11px] text-slate-400">Collaboration Portal</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <Link
                href={ROLE_CONFIGS[user.role].dashboardPath}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                <span>Dashboard ({ROLE_CONFIGS[user.role].label})</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Hero & Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 sm:py-20 w-full space-y-16">
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2">
            Step 1: Frontend & Role-Based Access Control
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Bridging Academia & Industry
          </h1>

          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            A collaborative workspace connecting students, enterprise partners, universities, and academic researchers.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-xs"
            >
              <span>Explore Roles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 4 Role Selector Grid */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Select Your Role
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Launch directly into a role dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roleCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.role}
                  className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between transition hover:border-slate-300 dark:hover:border-slate-700 shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRoleQuickStart(card.role)}
                    className="mt-5 w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/60 dark:border-slate-700/60 transition flex items-center justify-center gap-1.5"
                  >
                    <span>Enter Space</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-6 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2026 Academia–Industry Collaboration Portal
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard/student" className="hover:text-slate-900 dark:hover:text-white transition">Student</Link>
            <Link href="/dashboard/company" className="hover:text-slate-900 dark:hover:text-white transition">Company</Link>
            <Link href="/dashboard/college" className="hover:text-slate-900 dark:hover:text-white transition">College</Link>
            <Link href="/dashboard/academician" className="hover:text-slate-900 dark:hover:text-white transition">Academician</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
