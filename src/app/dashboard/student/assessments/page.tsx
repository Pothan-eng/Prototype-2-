'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Award,
  Play,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  category: string;
  questions: number;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'verified' | 'available' | 'in_progress';
  score?: string;
}

export default function StudentAssessmentsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'available'>('all');

  const assessments: Assessment[] = [
    {
      id: 'asm-01',
      title: 'PyTorch & Deep Neural Network Architecture',
      category: 'Machine Learning',
      questions: 25,
      duration: '35 mins',
      difficulty: 'Advanced',
      status: 'verified',
      score: '96% (Expert)',
    },
    {
      id: 'asm-02',
      title: 'Edge AI Quantization & ONNX Runtime',
      category: 'Edge Computing',
      questions: 20,
      duration: '30 mins',
      difficulty: 'Intermediate',
      status: 'verified',
      score: '88% (Proficient)',
    },
    {
      id: 'asm-03',
      title: 'Distributed Systems & Microservices Architecture',
      category: 'Cloud Infrastructure',
      questions: 30,
      duration: '45 mins',
      difficulty: 'Advanced',
      status: 'verified',
      score: '92% (Advanced)',
    },
    {
      id: 'asm-04',
      title: 'ROS2 Navigation & Autonomous Robot Dynamics',
      category: 'Robotics',
      questions: 20,
      duration: '30 mins',
      difficulty: 'Intermediate',
      status: 'available',
    },
    {
      id: 'asm-05',
      title: 'Embedded C++ & Real-Time Firmware Systems',
      category: 'Embedded Systems',
      questions: 25,
      duration: '40 mins',
      difficulty: 'Advanced',
      status: 'available',
    },
    {
      id: 'asm-06',
      title: 'Biomedical Signal Processing with Wavelets',
      category: 'Healthcare Tech',
      questions: 15,
      duration: '25 mins',
      difficulty: 'Intermediate',
      status: 'available',
    },
  ];

  const filtered = assessments.filter((a) => {
    if (activeTab === 'verified') return a.status === 'verified';
    if (activeTab === 'available') return a.status === 'available';
    return true;
  });

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout
        activeRole="student"
        pageTitle="Skill Assessments"
        pageSubtitle="Demonstrate your competencies for industry projects and faculty labs"
      >
        <div className="space-y-6">
          {/* Back link & Overview row */}
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/student"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Student Dashboard</span>
            </Link>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-md transition ${
                  activeTab === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                All Assessments
              </button>
              <button
                onClick={() => setActiveTab('verified')}
                className={`px-3 py-1 rounded-md transition ${
                  activeTab === 'verified'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Verified (3)
              </button>
              <button
                onClick={() => setActiveTab('available')}
                className={`px-3 py-1 rounded-md transition ${
                  activeTab === 'available'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Available (3)
              </button>
            </div>
          </div>

          {/* Assessment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((asm) => (
              <div
                key={asm.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-500">
                      {asm.category}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        asm.status === 'verified'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                          : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                      }`}
                    >
                      {asm.status === 'verified' ? 'Verified' : 'Available'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {asm.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {asm.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {asm.questions} Qs
                    </span>
                    <span>•</span>
                    <span>{asm.difficulty}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  {asm.status === 'verified' ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{asm.score}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      Earn Credential
                    </span>
                  )}

                  <button
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                      asm.status === 'verified'
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                    }`}
                  >
                    {asm.status === 'verified' ? (
                      <span>Retake</span>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span>Start Test</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Info Banner */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                How Skill Verification Works
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Completing assessments unlocks verified badges on your profile, boosting your readiness score for your Target Role and granting direct fast-track matching to industry problem statements.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
