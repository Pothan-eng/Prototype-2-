'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import {
  Landmark,
  FileText,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  PlusCircle,
  Building,
  ChevronRight,
} from 'lucide-react';

export default function CollegeDashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Industry MoUs', value: '14', change: '+3 signed this year', icon: Landmark, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' },
    { label: 'Campus Innovation Index', value: '88.4', change: '+4.2% institutional ranking', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
    { label: 'Incubation Startups', value: '16', change: '4 ready for seed round', icon: Sparkles, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40' },
    { label: 'Industry Research Grants', value: '$1.4M', change: 'Across 6 departments', icon: FileText, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' },
  ];

  const activeMoUs = [
    {
      partner: 'NovaTech Industries',
      scope: 'Joint R&D Lab in Edge AI & Sponsored Student Capstones',
      validity: 'Valid thru Dec 2027',
      status: 'Active & Funded',
      coordinators: 'Prof. E. Rostova & S. Chen',
    },
    {
      partner: 'EcoEnergy Dynamics',
      scope: 'CleanTech Catalyst Modeling & Green Hydrogen Incubation',
      validity: 'Valid thru Aug 2026',
      status: 'Active',
      coordinators: 'Dept of Chemical Eng',
    },
    {
      partner: 'MedVance Solutions',
      scope: 'Biomedical Diagnostic Sensors & Clinical Trials',
      validity: 'Renewal in 60 Days',
      status: 'Reviewing Terms',
      coordinators: 'Office of Dean Research',
    },
  ];

  const departmentPerformance = [
    { department: 'Computer Science & AI', projects: 12, mous: 5, score: '94%' },
    { department: 'Electrical & Systems Engineering', projects: 8, mous: 4, score: '89%' },
    { department: 'Mechanical & Robotics', projects: 7, mous: 3, score: '82%' },
    { department: 'Biotechnology & Healthcare', projects: 5, mous: 2, score: '78%' },
  ];

  return (
    <ProtectedRoute allowedRoles={['college']}>
      <DashboardLayout
        activeRole="college"
        pageTitle="Institutional Collaboration & MoU Hub"
        pageSubtitle={`Welcome, ${user?.name || 'Dean'}. Oversee university-wide corporate MoUs, incubation cells, and department performance.`}
      >
        {/* Top Summary Banner */}
        <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
                <Landmark className="w-3.5 h-3.5" />
                University Governance & Industry Relations
              </span>
              <h2 className="text-2xl font-bold">Empower institutional research and corporate partnerships</h2>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                Track formal industry MoUs, manage department incubation output, and monitor faculty research grants.
              </p>
            </div>
            <div className="flex gap-2.5 shrink-0">
              <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold transition shadow-sm flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4" />
                Draft New MoU
              </button>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-xs transition">
                Accreditation Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{item.label}</span>
                  <div className={`p-2 rounded-xl ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{item.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>{item.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column: Active Institutional MoUs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Institutional MoUs</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Formal legal and technological agreements with corporate partners</p>
              </div>
              <button className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1">
                View All MoUs <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {activeMoUs.map((mou, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 transition shadow-xs group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 group-hover:text-amber-600 transition">
                          <Building className="w-4 h-4 text-slate-400" />
                          {mou.partner}
                        </span>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          {mou.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        {mou.scope}
                      </p>
                    </div>
                    <button className="shrink-0 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-amber-600 group-hover:text-white transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Lead Coordinators: <strong className="text-slate-700 dark:text-slate-200">{mou.coordinators}</strong></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{mou.validity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Department Performance Summary */}
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Department Output</h3>
                <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                  Innovation Matrix
                </span>
              </div>

              <div className="space-y-3">
                {departmentPerformance.map((dept, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                      <span>{dept.department}</span>
                      <span className="text-emerald-600 font-mono">{dept.score}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{dept.projects} Industry Projects</span>
                      <span>{dept.mous} Active MoUs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance / Accreditation Note */}
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
              <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Institutional Accreditation
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                All joint industry-academia publications and student capstones are automatically indexed for NAAC/NIRF accreditation metrics.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
