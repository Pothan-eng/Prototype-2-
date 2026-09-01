'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { TARGET_ROLES } from '@/types/auth';
import {
  FolderGit2,
  Award,
  BookOpen,
  Building,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Target,
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { user, setTargetRole } = useAuth();
  const [isChangingRole, setIsChangingRole] = useState(false);

  const currentTargetRole = user?.targetRole || 'AI & Edge Computing Researcher';

  const stats = [
    { label: 'Active Projects', value: '3', icon: FolderGit2 },
    { label: 'Verified Skills', value: '8', icon: Award },
    { label: 'Matched Opportunities', value: '14', icon: BookOpen },
  ];

  const targetRoleSkills = [
    { name: 'PyTorch & Deep Learning', level: 'Advanced', verified: true },
    { name: 'Edge AI Deployment & ONNX', level: 'Intermediate', verified: true },
    { name: 'Distributed Systems Architecture', level: 'Proficient', verified: true },
    { name: 'ROS2 & Robot Navigation', level: 'Unverified', verified: false },
  ];

  const recommendedChallenges = [
    {
      id: 'ch-01',
      title: 'Autonomous Navigation for Urban Delivery Drones',
      company: 'NovaTech Industries',
      category: 'Robotics & AI',
      matchScore: '94% Match',
      deadline: '14 Days Left',
    },
    {
      id: 'ch-02',
      title: 'High-Throughput Edge AI for Diagnostic Imaging',
      company: 'MedVance Solutions',
      category: 'Biomedical AI',
      matchScore: '88% Match',
      deadline: '7 Days Left',
    },
    {
      id: 'ch-03',
      title: 'Green Hydrogen Catalyst Efficiency Modeling',
      company: 'EcoEnergy Dynamics',
      category: 'CleanTech',
      matchScore: '76% Match',
      deadline: '28 Days Left',
    },
  ];

  const activeProjects = [
    {
      title: 'Distributed Sensor Grid for Smart City Traffic',
      mentor: 'Prof. Elena Rostova',
      role: 'Student Co-Researcher',
      status: 'In Progress',
    },
    {
      title: 'Lightweight Transformer for Edge Devices',
      mentor: 'NovaTech AI Lab',
      role: 'Capstone Innovator',
      status: 'Review Phase',
    },
  ];

  const handleSelectTargetRole = (role: string) => {
    setTargetRole(role);
    setIsChangingRole(false);
  };

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout
        activeRole="student"
        pageTitle="Student Dashboard"
        pageSubtitle={`Welcome back, ${user?.name || 'Student'}`}
        headerAction={
          <Link
            href="/dashboard/student/assessments"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test Your Skills</span>
          </Link>
        }
      >
        <div className="space-y-6">
          {/* Target Role Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Target className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Current Target Role
                  </span>
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <span>{currentTargetRole}</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    84% Readiness
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Your recommendations and research matches are optimized for this career pathway.
                </p>
              </div>

              {/* Change Target Role Dropdown / Button */}
              <div className="relative shrink-0">
                <button
                  onClick={() => setIsChangingRole(!isChangingRole)}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition flex items-center gap-2"
                >
                  <span>Change Target Role</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isChangingRole ? 'rotate-90' : ''}`} />
                </button>

                {isChangingRole && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-2 z-30 animate-in fade-in-50">
                    <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Select Aspiration
                    </div>
                    {TARGET_ROLES.map((role) => (
                      <button
                        key={role}
                        onClick={() => handleSelectTargetRole(role)}
                        className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition flex items-center justify-between ${
                          role === currentTargetRole
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>{role}</span>
                        {role === currentTargetRole && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Target Role Progress Bar & Skills */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Skill Verification Progress</span>
                <span className="font-semibold text-slate-900 dark:text-white">3 of 4 Core Skills Verified</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: '75%' }} />
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {targetRoleSkills.map((sk) => (
                  <span
                    key={sk.name}
                    className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border ${
                      sk.verified
                        ? 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        : 'bg-amber-50/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
                    }`}
                  >
                    {sk.verified ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    )}
                    <span>{sk.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({sk.level})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Top 3 Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 shadow-xs flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-medium text-slate-500">{item.label}</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{item.value}</div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recommended Industry Problem Statements */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">Recommended Challenges</h2>
                  <p className="text-xs text-slate-500">Problem statements aligned with your target role</p>
                </div>
                <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  View All <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {recommendedChallenges.map((ch) => (
                  <div key={ch.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                        {ch.title}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3 text-slate-400" />
                          {ch.company}
                        </span>
                        <span>•</span>
                        <span>{ch.category}</span>
                        <span>•</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">{ch.matchScore}</span>
                      </div>
                    </div>
                    <button className="shrink-0 p-1.5 rounded-lg text-slate-400 group-hover:text-indigo-600 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Active Projects & Quick Assessment Entry */}
            <div className="space-y-6">
              {/* Active Projects */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">Active Projects</h2>
                  <p className="text-xs text-slate-500">Current research and capstones</p>
                </div>

                <div className="space-y-3">
                  {activeProjects.map((p, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                        {p.title}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center justify-between">
                        <span>Lead: {p.mentor}</span>
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">{p.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dedicated Skill Testing Callout */}
              <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-semibold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>Skill Assessments</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Verify your technical competencies to unlock priority faculty lab matching and sponsored project invitations.
                </p>
                <Link
                  href="/dashboard/student/assessments"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition"
                >
                  <span>Go to Assessment Center</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
