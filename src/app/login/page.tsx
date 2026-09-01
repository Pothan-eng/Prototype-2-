'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { DEMO_USERS, ROLE_CONFIGS, UserRole } from '@/types/auth';
import {
  GraduationCap,
  Building2,
  Landmark,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
  Loader2,
} from 'lucide-react';

export default function LoginPage() {
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState<string>(DEMO_USERS.student.email);
  const [password, setPassword] = useState<string>('demo123');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // If already logged in, show quick redirect
  if (isAuthenticated && user) {
    const userRoleConfig = ROLE_CONFIGS[user.role];
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Already Signed In
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Signed in as <strong className="text-slate-900 dark:text-white">{user.name}</strong> ({user.roleLabel})
          </p>
          <div className="space-y-2">
            <button
              onClick={() => router.push(userRoleConfig.dashboardPath)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition"
            >
              Continue to {userRoleConfig.label} Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/"
              className="block text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition py-1"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleRoleTabChange = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(DEMO_USERS[role].email);
    setErrorMsg(null);
  };

  const handleFormLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const success = await login(selectedRole, email, password);
    if (success) {
      router.push(ROLE_CONFIGS[selectedRole].dashboardPath);
    } else {
      setErrorMsg('Authentication failed. Please select a demo profile.');
      setIsSubmitting(false);
    }
  };

  const handleOneClickDemo = async (role: UserRole) => {
    setSelectedRole(role);
    setIsSubmitting(true);
    setErrorMsg(null);

    const success = await login(role);
    if (success) {
      router.push(ROLE_CONFIGS[role].dashboardPath);
    } else {
      setErrorMsg('Failed to initialize demo session.');
      setIsSubmitting(false);
    }
  };

  const roleIcons = {
    student: GraduationCap,
    company: Building2,
    college: Landmark,
    academician: BookOpen,
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 flex flex-col justify-between font-sans">
      {/* Top Navbar */}
      <header className="p-6 max-w-5xl w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            AI
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-sm leading-tight">Academia–Industry</div>
            <div className="text-[11px] text-slate-400">Collaboration Portal</div>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        >
          ← Home
        </Link>
      </header>

      {/* Main Login Form Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Sign In
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Select your role to access your dashboard
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-5">
            {(['student', 'company', 'college', 'academician'] as UserRole[]).map((r) => {
              const isSelected = selectedRole === r;
              const Icon = roleIcons[r];
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleTabChange(r)}
                  className={`py-2 px-1 rounded-lg text-center transition flex flex-col items-center gap-1 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[11px] capitalize">{r}</span>
                </button>
              );
            })}
          </div>

          {errorMsg && (
            <div className="mb-4 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-400">
              {errorMsg}
            </div>
          )}

          {/* Form Inputs */}
          <form onSubmit={handleFormLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-2.5 px-4 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Sign In as {ROLE_CONFIGS[selectedRole].label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Demo Buttons */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-2.5">
              1-Click Demo Jump
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {(['student', 'company', 'college', 'academician'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleOneClickDemo(r)}
                  disabled={isSubmitting}
                  className="py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 capitalize transition text-center"
                >
                  Demo {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-400">
        © 2026 Academia–Industry Collaboration Portal
      </footer>
    </div>
  );
}
