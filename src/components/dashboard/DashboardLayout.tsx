'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROLE_CONFIGS, UserRole } from '@/types/auth';
import {
  Building2,
  Landmark,
  BookOpen,
  LayoutDashboard,
  FolderGit2,
  FileText,
  Users,
  CheckCircle2,
  Search,
  LogOut,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeRole: UserRole;
  pageTitle: string;
  pageSubtitle?: string;
  headerAction?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeRole,
  pageTitle,
  pageSubtitle,
  headerAction,
}) => {
  const { user, logout, switchRole } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Role specific navigation items
  const roleNavItems: Record<UserRole, Array<{ label: string; href: string; icon: React.ElementType }>> = {
    student: [
      { label: 'Overview', href: '/dashboard/student', icon: LayoutDashboard },
      { label: 'Skill Assessments', href: '/dashboard/student/assessments', icon: CheckCircle2 },
      { label: 'Industry Challenges', href: '/dashboard/student#challenges', icon: FolderGit2 },
      { label: 'Faculty Research', href: '/dashboard/student#faculty', icon: BookOpen },
    ],
    company: [
      { label: 'Overview', href: '/dashboard/company', icon: LayoutDashboard },
      { label: 'Problem Statements', href: '/dashboard/company#challenges', icon: FolderGit2 },
      { label: 'University Labs', href: '/dashboard/company#research', icon: BookOpen },
      { label: 'Student Talent', href: '/dashboard/company#talent', icon: Users },
    ],
    college: [
      { label: 'Overview', href: '/dashboard/college', icon: LayoutDashboard },
      { label: 'Industry MoUs', href: '/dashboard/college#mous', icon: Landmark },
      { label: 'Department Analytics', href: '/dashboard/college#departments', icon: FileText },
      { label: 'Faculty Directory', href: '/dashboard/college#faculty', icon: Users },
    ],
    academician: [
      { label: 'Overview', href: '/dashboard/academician', icon: LayoutDashboard },
      { label: 'Research Proposals', href: '/dashboard/academician#proposals', icon: FileText },
      { label: 'Consultations', href: '/dashboard/academician#consultation', icon: Building2 },
      { label: 'Student Mentees', href: '/dashboard/academician#mentees', icon: Users },
    ],
  };

  const currentNav = roleNavItems[activeRole] || roleNavItems.student;

  const roleBadgeStyles: Record<UserRole, string> = {
    student: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    company: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
    college: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    academician: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    setIsRoleDropdownOpen(false);
    router.push(ROLE_CONFIGS[newRole].dashboardPath);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* Mobile Top Header */}
      <header className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              AI
            </div>
            <span className="font-semibold text-slate-900 dark:text-white text-sm">AcademiaPortal</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${roleBadgeStyles[activeRole]}`}>
            {ROLE_CONFIGS[activeRole].label}
          </span>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-slate-500 hover:text-rose-600"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              AI
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm leading-tight">Academia–Industry</div>
              <div className="text-[11px] text-slate-400">Collaboration Portal</div>
            </div>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Card */}
        <div className="px-4 py-3 mx-3 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs shrink-0">
            {user?.initials || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
              {user?.name || 'User'}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 capitalize truncate">
              {user?.roleLabel || activeRole}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pt-2">
          <div className="px-3 pb-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Menu
          </div>
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href.includes('#') && pathname === item.href.split('#')[0]);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 text-slate-500" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-6 px-3 pb-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Switch Perspective
          </div>

          <div className="space-y-1">
            {(['student', 'company', 'college', 'academician'] as UserRole[]).map((r) => {
              const isCurr = r === activeRole;
              return (
                <button
                  key={r}
                  onClick={() => handleRoleSwitch(r)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                    isCurr
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                      : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <span className="capitalize">{r}</span>
                  {isCurr && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Portal Home</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="hidden lg:flex h-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-8 items-center justify-between sticky top-0 z-30">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-base font-bold text-slate-900 dark:text-white leading-none">
                {pageTitle}
              </h1>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${roleBadgeStyles[activeRole]}`}>
                {ROLE_CONFIGS[activeRole].label}
              </span>
            </div>
            {pageSubtitle && (
              <p className="text-xs text-slate-500 mt-1">
                {pageSubtitle}
              </p>
            )}
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {headerAction}

            {/* Search Input Mock */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-lg w-48 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Quick Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 transition"
              >
                <span>Role:</span>
                <span className="capitalize font-semibold text-slate-900 dark:text-white">{activeRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in-50">
                  {(['student', 'company', 'college', 'academician'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleSwitch(r)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                        r === activeRole
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="capitalize">{r}</span>
                      {r === activeRole && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Avatar & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
              <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs">
                {user?.initials || 'U'}
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-md"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
