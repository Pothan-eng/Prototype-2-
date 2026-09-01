'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import {
  FolderGit2,
  Landmark,
  Users,
  ChevronRight,
  ArrowUpRight,
  Plus,
} from 'lucide-react';

export default function CompanyDashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Problem Statements', value: '4', icon: FolderGit2 },
    { label: 'Partner Institutions', value: '12', icon: Landmark },
    { label: 'Proposals Received', value: '58', icon: Users },
  ];

  const publishedChallenges = [
    {
      id: 'ind-01',
      title: 'Autonomous Navigation for Urban Delivery Drones',
      department: 'Robotics & AI',
      proposals: 24,
      status: 'Open',
    },
    {
      id: 'ind-02',
      title: 'Real-Time Anomaly Detection in Smart Grids',
      department: 'Energy Systems',
      proposals: 19,
      status: 'Reviewing',
    },
    {
      id: 'ind-03',
      title: 'Enterprise LLM Quantization & Privacy',
      department: 'Machine Learning',
      proposals: 15,
      status: 'Shortlisted',
    },
  ];

  const universityLabs = [
    {
      name: 'Quantum & Systems Lab',
      institution: 'Apex Institute of Technology',
      focus: 'Edge Computing & Quantum Alg.',
    },
    {
      name: 'Biomedical Imaging Lab',
      institution: 'National Medical Research Univ',
      focus: 'Optical Diagnostics & Sensors',
    },
  ];

  return (
    <ProtectedRoute allowedRoles={['company']}>
      <DashboardLayout
        activeRole="company"
        pageTitle="Enterprise Dashboard"
        pageSubtitle={`Welcome back, ${user?.name || 'Partner'}`}
      >
        <div className="space-y-6">
          {/* Top Metrics */}
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Published Problem Statements */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">Active Problem Statements</h2>
                  <p className="text-xs text-slate-500">Corporate briefs shared with university faculties</p>
                </div>
                <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Post Brief</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {publishedChallenges.map((ch) => (
                  <div key={ch.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                        {ch.title}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span>{ch.department}</span>
                        <span>•</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{ch.proposals} Proposals Received</span>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">{ch.status}</span>
                      </div>
                    </div>
                    <button className="shrink-0 p-1.5 rounded-lg text-slate-400 group-hover:text-indigo-600 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* University Research Directory */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">University Labs</h2>
                  <p className="text-xs text-slate-500">Partner research groups</p>
                </div>
                <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  Browse <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                {universityLabs.map((lab, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      {lab.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {lab.institution}
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300">
                      Focus: {lab.focus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
