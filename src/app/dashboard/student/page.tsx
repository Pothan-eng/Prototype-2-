'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import {
  FolderGit2,
  BookOpen,
  Award,
  Sparkles,
  ArrowUpRight,
  Clock,
  Building,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Projects', value: '3', change: '+1 this month', icon: FolderGit2, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
    { label: 'Industry Challenges', value: '18', change: '4 expiring soon', icon: Award, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' },
    { label: 'Faculty Lab Matches', value: '5', change: '92% skill match', icon: BookOpen, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40' },
    { label: 'Verified Capstones', value: '2', change: 'Industry reviewed', icon: Sparkles, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' },
  ];

  const featuredChallenges = [
    {
      id: 'ch-01',
      title: 'Autonomous Navigation for Urban Delivery Drones',
      company: 'NovaTech Industries',
      category: 'Robotics & AI',
      deadline: '14 Days Left',
      participants: 24,
      status: 'Open for Proposals',
      tag: 'Industry Problem Statement',
    },
    {
      id: 'ch-02',
      title: 'Green Hydrogen Catalyst Efficiency Modeling',
      company: 'EcoEnergy Dynamics',
      category: 'CleanTech & ChemEng',
      deadline: '28 Days Left',
      participants: 12,
      status: 'Open for Proposals',
      tag: 'Sponsored Capstone',
    },
    {
      id: 'ch-03',
      title: 'High-Throughput Edge AI for Diagnostic Imaging',
      company: 'MedVance Solutions',
      category: 'Biomedical AI',
      deadline: '7 Days Left',
      participants: 39,
      status: 'Review Phase',
      tag: 'Joint Hackathon',
    },
  ];

  const activeProjects = [
    {
      title: 'Distributed Sensor Grid for Smart City Traffic',
      lead: 'Prof. Elena Rostova',
      role: 'Student Co-Researcher',
      progress: 68,
      status: 'Active Milestone 3',
    },
    {
      title: 'Lightweight Transformer for Edge Device Inference',
      lead: 'NovaTech AI Lab',
      role: 'Capstone Innovator',
      progress: 45,
      status: 'In Progress',
    },
  ];

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout
        activeRole="student"
        pageTitle="Student Innovation Hub"
        pageSubtitle={`Welcome back, ${user?.name || 'Student'}. Here is your collaborative academic and industry activity.`}
      >
        {/* Top Summary Banner */}
        <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Collaborative Student Workspace
              </span>
              <h2 className="text-2xl font-bold">Ready to solve real-world industry challenges?</h2>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                Collaborate with leading faculty research labs and industry enterprises on real-world projects and capstones.
              </p>
            </div>
            <div className="flex gap-2.5 shrink-0">
              <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition shadow-sm">
                Explore Challenges
              </button>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-xs transition">
                My Proposals
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
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <span>{item.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two-Column Section: Challenges & Ongoing Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column: Featured Industry Challenges */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Industry Challenges</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Problem statements posted by corporate partners</p>
              </div>
              <button className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1">
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {featuredChallenges.map((ch) => (
                <div
                  key={ch.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition shadow-xs group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {ch.tag}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {ch.company}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                        {ch.title}
                      </h4>
                    </div>
                    <button className="shrink-0 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-emerald-500 group-hover:text-white transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-4">
                      <span>Domain: <strong className="text-slate-700 dark:text-slate-200 font-medium">{ch.category}</strong></span>
                      <span className="hidden sm:inline">{ch.participants} teams participating</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {ch.deadline}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Active Collaborations & Faculty Labs */}
          <div className="space-y-6">
            {/* Active Projects Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">My Collaborations</h3>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  2 Active
                </span>
              </div>

              <div className="space-y-4">
                {activeProjects.map((p, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      {p.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Lead: {p.lead}</span>
                      <span className="font-medium text-emerald-600">{p.status}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions / Tips */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
              <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Student Action Checklist
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>Update your technical skills profile for AI-driven faculty lab matching.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>Submit draft proposal for NovaTech Urban Drone Challenge before deadline.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
