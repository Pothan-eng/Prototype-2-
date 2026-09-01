'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROLE_CONFIGS, UserRole } from '@/types/auth';
import {
  GraduationCap,
  Building2,
  Landmark,
  BookOpen,
  LayoutDashboard,
  FolderGit2,
  FileText,
  Users,
  Search,
  Bell,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeRole: UserRole;
  pageTitle: string;
  pageSubtitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeRole,
  pageTitle,
  pageSubtitle,
}) => {
  const { user, logout, switchRole } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Role specific navigation items
  const roleNavItems: Record<UserRole, Array<{ label: string; href: string; icon: React.ElementType; badge?: string }>> = {
    student: [
      { label: 'Overview', href: '/dashboard/student', icon: LayoutDashboard },
      { label: 'Industry Challenges', href: '/dashboard/student#challenges', icon: FolderGit2, badge: '6 New' },
      { label: 'Faculty Research Labs', href: '/dashboard/student#faculty', icon: BookOpen },
      { label: 'Capstone Projects', href: '/dashboard/student#projects', icon: FileText },
      { label: 'Peer Network', href: '/dashboard/student#network', icon: Users },
    ],
    company: [
      { label: 'Overview', href: '/dashboard/company', icon: LayoutDashboard },
      { label: 'Problem Statements', href: '/dashboard/company#challenges', icon: FolderGit2, badge: 'Active' },
      { label: 'University Research', href: '/dashboard/company#research', icon: BookOpen },
      { label: 'Student Innovators', href: '/dashboard/company#talent', icon: Users },
      { label: 'Institutional MoUs', href: '/dashboard/company#mous', icon: Landmark },
    ],
    college: [
      { label: 'Overview', href: '/dashboard/college', icon: LayoutDashboard },
      { label: 'Industry MoUs', href: '/dashboard/college#mous', icon: Landmark, badge: '14 Signed' },
      { label: 'Incubation Cell', href: '/dashboard/college#incubation', icon: Sparkles },
      { label: 'Department Analytics', href: '/dashboard/college#departments', icon: FileText },
      { label: 'Faculty Directory', href: '/dashboard/college#faculty', icon: Users },
    ],
    academician: [
      { label: 'Overview', href: '/dashboard/academician', icon: LayoutDashboard },
      { label: 'Research Proposals', href: '/dashboard/academician#proposals', icon: FileText, badge: '3 Funded' },
      { label: 'Industry Whitepapers', href: '/dashboard/academician#publications', icon: BookOpen },
      { label: 'Consultation Requests', href: '/dashboard/academician#consultation', icon: Building2 },
      { label: 'Student Mentees', href: '/dashboard/academician#mentees', icon: Users },
    ],
  };

  const currentNav = roleNavItems[activeRole] || roleNavItems.student;

  const roleTheme = {
    student: {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
      activeItem: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold',
      accentDot: 'bg-emerald-500',
      avatarBg: 'bg-emerald-600',
    },
    company: {
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800',
      activeItem: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold',
      accentDot: 'bg-indigo-500',
      avatarBg: 'bg-indigo-600',
    },
    college: {
      badge: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
      activeItem: 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-semibold',
      accentDot: 'bg-amber-500',
      avatarBg: 'bg-amber-600',
    },
    academician: {
      badge: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800',
      activeItem: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 font-semibold',
      accentDot: 'bg-purple-500',
      avatarBg: 'bg-purple-600',
    },
  }[activeRole];

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              AI
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-base">AcademiaPortal</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${roleTheme.badge}`}>
            {ROLE_CONFIGS[activeRole].label}
          </span>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-base shadow-md shadow-indigo-500/20">
              AI
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-base leading-tight">Academia–Industry</div>
              <div className="text-[11px] text-slate-500 font-medium">Collaboration Engine</div>
            </div>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Role Card */}
        <div className="p-4 mx-4 my-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${roleTheme.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-sm`}>
              {user?.initials || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {user?.name || 'Authorized User'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {user?.organization || 'Institution'}
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${roleTheme.accentDot}`} />
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {user?.roleLabel || ROLE_CONFIGS[activeRole].label}
              </span>
            </div>
            <span className="text-[10px] bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded font-mono">
              RBAC: OK
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Role Workspace
          </div>
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href.includes('#') && pathname === item.href.split('#')[0]);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? roleTheme.activeItem
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${roleTheme.badge}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 px-3 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Quick Switch Perspective
          </div>

          {/* Role Quick Switch Buttons */}
          <div className="grid grid-cols-2 gap-1.5 px-1">
            {(['student', 'company', 'college', 'academician'] as UserRole[]).map((r) => {
              const isCurr = r === activeRole;
              return (
                <button
                  key={r}
                  onClick={() => handleRoleSwitch(r)}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition flex items-center gap-1.5 ${
                    isCurr
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold ring-1 ring-slate-300 dark:ring-slate-600'
                      : 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    r === 'student' ? 'bg-emerald-500' :
                    r === 'company' ? 'bg-indigo-500' :
                    r === 'college' ? 'bg-amber-500' : 'bg-purple-500'
                  }`} />
                  <span className="capitalize">{r}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Public Portal Home
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" />
              Sign Out Session
            </span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="hidden lg:flex h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                  {pageTitle}
                </h1>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${roleTheme.badge}`}>
                  {ROLE_CONFIGS[activeRole].label} Space
                </span>
              </div>
              {pageSubtitle && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {pageSubtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input Mock */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search portal (Ctrl+K)..."
                className="pl-9 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 rounded-xl w-60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition"
              />
            </div>

            {/* Notifications Popover Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative focus:outline-none"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 bg-indigo-500 rounded-full absolute top-1.5 right-1.5" />
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Recent Notifications</span>
                    <span className="text-[10px] text-indigo-600 font-semibold cursor-pointer">Mark read</span>
                  </div>
                  <div className="py-2 space-y-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                      <div className="font-semibold text-slate-900 dark:text-white">New Industry Challenge</div>
                      <div className="text-[11px] text-slate-500">Autonomous Drone Navigation problem posted.</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                      <div className="font-semibold text-slate-900 dark:text-white">MoU Renewal Notice</div>
                      <div className="text-[11px] text-slate-500">TechCorp annual collaboration term updated.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Switch Role:</span>
                <span className="capitalize text-indigo-600 dark:text-indigo-400">{activeRole}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in-50">
                  <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Demo Role Switcher
                  </div>
                  {(['student', 'company', 'college', 'academician'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleSwitch(r)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition ${
                        r === activeRole
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 capitalize">
                        {r === 'student' && <GraduationCap className="w-4 h-4 text-emerald-500" />}
                        {r === 'company' && <Building2 className="w-4 h-4 text-indigo-500" />}
                        {r === 'college' && <Landmark className="w-4 h-4 text-amber-500" />}
                        {r === 'academician' && <BookOpen className="w-4 h-4 text-purple-500" />}
                        <span>{r}</span>
                      </div>
                      {r === activeRole && <span className="text-[10px] font-bold text-indigo-600">Active</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
              <div className={`w-8 h-8 rounded-xl ${roleTheme.avatarBg} text-white flex items-center justify-center font-bold text-xs shadow-sm`}>
                {user?.initials || 'U'}
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
