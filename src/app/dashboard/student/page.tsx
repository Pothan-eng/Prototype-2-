'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import {
  FolderGit2,
  Award,
  BookOpen,
  Building,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Projects', value: '3', icon: FolderGit2 },
    { label: 'Open Challenges', value: '18', icon: Award },
    { label: 'Faculty Labs', value: '5', icon: BookOpen },
  ];

  const challenges = [
    {
      id: 'ch-01',
      title: 'Autonomous Navigation for Urban Delivery Drones',
      company: 'NovaTech Industries',
      category: 'Robotics & AI',
      deadline: '14 Days Left',
    },
    {
      id: 'ch-02',
      title: 'Green Hydrogen Catalyst Efficiency Modeling',
      company: 'EcoEnergy Dynamics',
      category: 'CleanTech',
      deadline: '28 Days Left',
    },
    {
      id: 'ch-03',
      title: 'Edge AI for Diagnostic Medical Imaging',
      company: 'MedVance Solutions',
      category: 'Biomedical AI',
      deadline: '7 Days Left',
    },
  ];

  const activeProjects = [
    {
      title: 'Distributed Sensor Grid for Smart City Traffic',
      mentor: 'Prof. Elena Rostova',
      status: 'In Progress',
    },
    {
      title: 'Lightweight Transformer for Edge Devices',
      mentor: 'NovaTech AI Lab',
      status: 'Review Phase',
    },
  ];

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout
        activeRole="student"
        pageTitle="Student Dashboard"
        pageSubtitle={`Welcome back, ${user?.name || 'Student'}`}
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
            {/* Open Industry Challenges */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">Industry Problem Statements</h2>
                  <p className="text-xs text-slate-500">Challenges open for student submissions</p>
                </div>
                <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  View All <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {challenges.map((ch) => (
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
                        <span className="text-amber-600 dark:text-amber-400">{ch.deadline}</span>
                      </div>
                    </div>
                    <button className="shrink-0 p-1.5 rounded-lg text-slate-400 group-hover:text-indigo-600 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Ongoing Projects */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Current Projects</h2>
                <p className="text-xs text-slate-500">Your collaborative research</p>
              </div>

              <div className="space-y-3">
                {activeProjects.map((p, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                      {p.title}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Mentor: {p.mentor}</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">{p.status}</span>
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
