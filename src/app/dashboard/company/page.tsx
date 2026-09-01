'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import {
  Building2,
  FolderGit2,
  Users,
  Landmark,
  PlusCircle,
  ArrowUpRight,
  Sparkles,
  FileCheck,
  ChevronRight,
  Award,
} from 'lucide-react';

export default function CompanyDashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Problem Statements', value: '4', change: '1 published this week', icon: FolderGit2, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40' },
    { label: 'University Partner MoUs', value: '12', change: '2 pending renewal', icon: Landmark, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
    { label: 'Proposals Received', value: '58', change: '+14 new submissions', icon: Users, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' },
    { label: 'Sponsored Capstones', value: '8', change: 'Across 5 institutions', icon: Award, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' },
  ];

  const publishedChallenges = [
    {
      id: 'ind-01',
      title: 'Autonomous Navigation for Urban Delivery Drones',
      department: 'Robotics & Edge AI',
      submittedProposals: 24,
      status: 'Accepting Proposals',
      targetColleges: 'Apex Univ, Stanford, MIT Network',
    },
    {
      id: 'ind-02',
      title: 'Real-Time Anomaly Detection in High-Voltage Smart Grids',
      department: 'Energy Systems & IoT',
      submittedProposals: 19,
      status: 'Review Phase',
      targetColleges: 'All Partner Universities',
    },
    {
      id: 'ind-03',
      title: 'Enterprise LLM Quantization & Privacy Preservation',
      department: 'Applied Machine Learning',
      submittedProposals: 15,
      status: 'Shortlisted',
      targetColleges: 'Tier-1 AI Labs',
    },
  ];

  const universityResearchLabs = [
    {
      name: 'Quantum & Distributed Systems Lab',
      institution: 'Apex Institute of Technology',
      lead: 'Prof. Elena Rostova',
      focusArea: 'Fault-tolerant Quantum Algorithms & Edge Computing',
      patentsAvailable: 3,
    },
    {
      name: 'Biomedical Imaging & Sensor Lab',
      institution: 'National Medical Research Univ',
      lead: 'Dr. Arthur Vance',
      focusArea: 'Non-invasive Optical Diagnostics & Nanotech',
      patentsAvailable: 2,
    },
  ];

  return (
    <ProtectedRoute allowedRoles={['company']}>
      <DashboardLayout
        activeRole="company"
        pageTitle="Enterprise R&D Command Center"
        pageSubtitle={`Welcome, ${user?.name || 'Partner'}. Manage corporate challenges, university partnerships, and student talent pipelines.`}
      >
        {/* Top Summary Banner */}
        <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
                <Building2 className="w-3.5 h-3.5" />
                Enterprise Innovation Portal
              </span>
              <h2 className="text-2xl font-bold">Bridge corporate challenges with academic ingenuity</h2>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                Publish real-world problem statements, sponsor academic capstone teams, and discover commercializable university patents.
              </p>
            </div>
            <div className="flex gap-2.5 shrink-0">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition shadow-sm flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4" />
                Post Problem Statement
              </button>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-xs transition">
                Manage MoUs
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
          {/* Main Column: Published Problem Statements */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Industry Problem Statements</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Open R&D briefs broadcast to university faculties and students</p>
              </div>
              <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1">
                Manage All <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {publishedChallenges.map((ch) => (
                <div
                  key={ch.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition shadow-xs group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          {ch.department}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          {ch.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Audience: {ch.targetColleges}
                      </p>
                    </div>
                    <button className="shrink-0 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {ch.submittedProposals} Student & Faculty Proposals
                    </span>
                    <button className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                      Review Submissions →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: University Research Labs */}
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">University Research Labs</h3>
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
                  Partner Network
                </span>
              </div>

              <div className="space-y-4">
                {universityResearchLabs.map((lab, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {lab.name}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {lab.institution} • Lead: {lab.lead}
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                      Focus: {lab.focusArea}
                    </div>
                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {lab.patentsAvailable} Available Patents
                      </span>
                      <button className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                        Contact Lab
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions / Tips */}
            <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
              <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-indigo-600" />
                Enterprise Workflow
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect directly with university technology transfer offices to co-sponsor capstone projects or license patent portfolios.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
