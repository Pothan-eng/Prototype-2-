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
  Zap,
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
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Already Signed In
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            You are authenticated as <strong className="text-slate-900 dark:text-white">{user.name}</strong> ({user.roleLabel}).
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push(userRoleConfig.dashboardPath)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm"
            >
              Continue to {userRoleConfig.label} Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/"
              className="block text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition"
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="p-6 max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20">
            AI
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-base leading-tight">Academia–Industry</div>
            <div className="text-xs text-slate-500 font-medium">Collaboration Engine</div>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        >
          ← Return to Home
        </Link>
      </header>

      {/* Main Login Form Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Role Overview & One-Click Demo Logins */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-3">
                <Zap className="w-3.5 h-3.5" />
                Step 1: Role-Based Access Control
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Sign in to your role workspace
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Choose your sector profile to access dedicated dashboards, tools, and collaboration channels.
              </p>
            </div>

            {/* Quick 1-Click Demo Buttons for Hackathon Judges */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Instant Demo Access
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                  1-Click Jump
                </span>
              </div>

              <div className="space-y-2">
                {(['student', 'company', 'college', 'academician'] as UserRole[]).map((r) => {
                  const demo = DEMO_USERS[r];
                  const Icon = roleIcons[r];
                  return (
                    <button
                      key={r}
                      onClick={() => handleOneClickDemo(r)}
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 hover:border-indigo-200 dark:hover:border-indigo-800 text-left transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          r === 'student' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' :
                          r === 'company' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400' :
                          r === 'college' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400' :
                          'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white capitalize">
                            {demo.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {demo.roleLabel}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition transform group-hover:translate-x-0.5" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Login Card */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative">
              {/* Role Selection Tabs */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Select User Role
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['student', 'company', 'college', 'academician'] as UserRole[]).map((r) => {
                    const isSelected = selectedRole === r;
                    const Icon = roleIcons[r];
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleRoleTabChange(r)}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs capitalize">{r}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Role Description Callout */}
              <div className="p-3.5 mb-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs">
                <div className="font-semibold text-slate-900 dark:text-white capitalize">
                  {ROLE_CONFIGS[selectedRole].label} Space
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                  {ROLE_CONFIGS[selectedRole].description}
                </div>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-600 dark:text-rose-400">
                  {errorMsg}
                </div>
              )}

              {/* Form Inputs */}
              <form onSubmit={handleFormLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="user@institution.edu"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <span className="text-[11px] text-slate-400">Mock demo: any password</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-md shadow-indigo-600/20 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In as {ROLE_CONFIGS[selectedRole].label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-xs text-slate-500">
                  Mock Authentication Prototype • RBAC Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-400">
        © 2026 Academia–Industry Collaboration Portal • Step 1 Frontend & Auth Foundation
      </footer>
    </div>
  );
}
