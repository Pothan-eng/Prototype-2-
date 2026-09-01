'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import {
  Landmark,
  Building,
  Sparkles,
  ChevronRight,
  Plus,
} from 'lucide-react';

export default function CollegeDashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Industry MoUs', value: '14', icon: Landmark },
    { label: 'Industry Partners', value: '28', icon: Building },
    { label: 'Incubation Units', value: '16', icon: Sparkles },
  ];

  const activeMoUs = [
    {
      partner: 'NovaTech Industries',
      scope: 'Joint R&D Lab in Edge AI & Capstones',
      validity: 'Valid thru 2027',
      status: 'Active',
    },
    {
      partner: 'EcoEnergy Dynamics',
      scope: 'CleanTech Catalyst Modeling Incubation',
      validity: 'Valid thru 2026',
      status: 'Active',
    },
    {
      partner: 'MedVance Solutions',
      scope: 'Biomedical Diagnostic Sensors',
      validity: 'Reviewing Terms',
      status: 'Renewal Pending',
    },
  ];

  const departments = [
    { name: 'Computer Science & AI', projects: 12, mous: 5 },
    { name: 'Electrical & Systems Engineering', projects: 8, mous: 4 },
    { name: 'Mechanical & Robotics', projects: 7, mous: 3 },
  ];

  return (
    <ProtectedRoute allowedRoles={['college']}>
      <DashboardLayout
        activeRole="college"
        pageTitle="College Administrator"
        pageSubtitle={`Welcome back, ${user?.name || 'Administrator'}`}
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
            {/* Active Institutional MoUs */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">Active Industry MoUs</h2>
                  <p className="text-xs text-slate-500">Formal agreements with enterprise partners</p>
                </div>
                <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Draft MoU</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {activeMoUs.map((mou, idx) => (
                  <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                        {mou.partner}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span>{mou.scope}</span>
                        <span>•</span>
                        <span>{mou.validity}</span>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">{mou.status}</span>
                      </div>
                    </div>
                    <button className="shrink-0 p-1.5 rounded-lg text-slate-400 group-hover:text-indigo-600 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Summary */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Department Overview</h2>
                <p className="text-xs text-slate-500">Industry collaboration distribution</p>
              </div>

              <div className="space-y-3">
                {departments.map((dept, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      {dept.name}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center justify-between">
                      <span>{dept.projects} Projects</span>
                      <span>{dept.mous} Active MoUs</span>
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
