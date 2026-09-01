'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import {
  FileText,
  BookOpen,
  Users,
  Building2,
  ChevronRight,
  Plus,
} from 'lucide-react';

export default function AcademicianDashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Funded Research Grants', value: '3', icon: FileText },
    { label: 'Industry Publications', value: '11', icon: BookOpen },
    { label: 'Student Mentees', value: '9', icon: Users },
  ];

  const proposals = [
    {
      id: 'prop-01',
      title: 'Quantum Decoherence Suppression for Low-Power Edge Devices',
      sponsor: 'NovaTech Industries',
      funding: '$320,000',
      status: 'Active',
    },
    {
      id: 'prop-02',
      title: 'Microgrid Dynamic Load Balancing using Graph Neural Networks',
      sponsor: 'EcoEnergy Dynamics',
      funding: '$190,000',
      status: 'Under Review',
    },
    {
      id: 'prop-03',
      title: 'Privacy-Preserving Federated Learning for Medical Diagnostics',
      sponsor: 'MedVance Solutions',
      funding: '$130,000',
      status: 'Approved',
    },
  ];

  const consultations = [
    {
      company: 'NovaTech Industries',
      topic: 'Edge Transformer Architecture Optimization',
      requestedBy: 'Sarah Chen (VP R&D)',
    },
    {
      company: 'Global Robotics Corp',
      topic: 'Autonomous Drone Flight Dynamics Safety Assessment',
      requestedBy: 'Dr. Kevin Zhao',
    },
  ];

  return (
    <ProtectedRoute allowedRoles={['academician']}>
      <DashboardLayout
        activeRole="academician"
        pageTitle="Academician & Research Hub"
        pageSubtitle={`Welcome back, ${user?.name || 'Professor'}`}
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
            {/* Active Research Grants & Proposals */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">Research Grants & Proposals</h2>
                  <p className="text-xs text-slate-500">Sponsored lab initiatives with industry partners</p>
                </div>
                <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Proposal</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {proposals.map((p) => (
                  <div key={p.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                        {p.title}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span>Sponsor: {p.sponsor}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{p.funding}</span>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">{p.status}</span>
                      </div>
                    </div>
                    <button className="shrink-0 p-1.5 rounded-lg text-slate-400 group-hover:text-indigo-600 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Inquiries */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Consultation Inquiries</h2>
                <p className="text-xs text-slate-500">Industry advisory requests</p>
              </div>

              <div className="space-y-3">
                {consultations.map((c, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.company}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300">
                      {c.topic}
                    </div>
                    <div className="pt-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">{c.requestedBy}</span>
                      <button className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                        Respond →
                      </button>
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
