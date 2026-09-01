'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import {
  BookOpen,
  FileText,
  Building2,
  Users,
  PlusCircle,
  ArrowUpRight,
  Sparkles,
  Award,
  ChevronRight,
  Send,
} from 'lucide-react';

export default function AcademicianDashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Funded Research Grants', value: '3', change: '$640k active funding', icon: FileText, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40' },
    { label: 'Industry Co-Publications', value: '11', change: '2 in peer review', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40' },
    { label: 'Patent Disclosures', value: '4', change: '2 granted commercial', icon: Award, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' },
    { label: 'Supervised Mentees', value: '9', change: '3 student innovators', icon: Users, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
  ];

  const researchProposals = [
    {
      id: 'prop-01',
      title: 'Fault-Tolerant Quantum Decoherence Suppression for Low-Power Edge Devices',
      sponsor: 'NovaTech Industries & National Science Foundation',
      fundingAmount: '$320,000',
      duration: '24 Months',
      status: 'Active Milestone 2',
      team: '4 Student Fellows, 2 Postdocs',
    },
    {
      id: 'prop-02',
      title: 'Decentralized Microgrid Dynamic Load Balancing using Graph Neural Networks',
      sponsor: 'EcoEnergy Dynamics',
      fundingAmount: '$190,000',
      duration: '18 Months',
      status: 'Under Review',
      team: '3 Student Fellows',
    },
    {
      id: 'prop-03',
      title: 'Privacy-Preserving Federated Learning for Multi-Hospital Medical Diagnostics',
      sponsor: 'MedVance Solutions',
      fundingAmount: '$130,000',
      duration: '12 Months',
      status: 'Funded & Starting',
      team: '2 Graduate Researchers',
    },
  ];

  const consultationRequests = [
    {
      company: 'NovaTech Industries',
      topic: 'Edge Transformer Architecture Optimization Consultation',
      urgency: 'Requested this week',
      contact: 'Sarah Chen (VP R&D)',
    },
    {
      company: 'Global Robotics Corp',
      topic: 'Autonomous Drone Flight Dynamics Safety Assessment',
      urgency: 'Next Month',
      contact: 'Dr. Kevin Zhao',
    },
  ];

  return (
    <ProtectedRoute allowedRoles={['academician']}>
      <DashboardLayout
        activeRole="academician"
        pageTitle="Faculty Research & Industrial Consultation"
        pageSubtitle={`Welcome, ${user?.name || 'Professor'}. Manage lab grant proposals, industry consultations, and student researchers.`}
      >
        {/* Top Summary Banner */}
        <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                Principal Investigator Workspace
              </span>
              <h2 className="text-2xl font-bold">Commercialize research breakthroughs with industry leaders</h2>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                Submit sponsored research proposals, license laboratory patents, and mentor the next generation of student innovators.
              </p>
            </div>
            <div className="flex gap-2.5 shrink-0">
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold transition shadow-sm flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4" />
                New Grant Proposal
              </button>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-xs transition">
                Patent Disclosures
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
          {/* Main Column: Active Research Proposals */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Research Grants & Proposals</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Co-funded R&D projects bridging academia and enterprise labs</p>
              </div>
              <button className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1">
                View All Proposals <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {researchProposals.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 transition shadow-xs group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                          {p.status}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          {p.fundingAmount}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition">
                        {p.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Sponsor: {p.sponsor} • Duration: {p.duration}
                      </p>
                    </div>
                    <button className="shrink-0 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-purple-600 group-hover:text-white transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Research Team: <strong className="text-slate-700 dark:text-slate-200">{p.team}</strong></span>
                    <button className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                      Milestone Reports →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Industry Consultation Requests */}
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Consultation Requests</h3>
                <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full">
                  2 Pending
                </span>
              </div>

              <div className="space-y-3">
                {consultationRequests.map((req, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {req.company}
                      </span>
                      <span className="text-[10px] text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded font-medium">
                        {req.urgency}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      {req.topic}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">{req.contact}</span>
                      <button className="text-purple-600 dark:text-purple-400 font-semibold hover:underline flex items-center gap-1">
                        <Send className="w-3 h-3" /> Respond
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions / Tips */}
            <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40">
              <h4 className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                IP & Technology Transfer
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Publish lab invention disclosures directly to partner industry tech scouts for commercial licensing and joint patent filings.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
