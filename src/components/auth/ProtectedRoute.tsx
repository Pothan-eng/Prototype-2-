'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROLE_CONFIGS, UserRole } from '@/types/auth';
import { ShieldAlert, ArrowRight, RefreshCw, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading, switchRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-medium">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Verifying session permissions...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }

  // Check role authorization if restricted
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const requiredRole = allowedRoles[0];
    const requiredConfig = ROLE_CONFIGS[requiredRole];

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 text-center">
          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Access Restricted
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            This workspace is intended for the <span className="font-semibold text-slate-900 dark:text-white capitalize">{requiredRole}</span> role.
            You are currently signed in as <span className="font-semibold text-slate-900 dark:text-white">{user.name}</span> ({user.roleLabel}).
          </p>

          <div className="space-y-3">
            <button
              onClick={() => {
                switchRole(requiredRole);
                router.push(requiredConfig.dashboardPath);
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Switch to {requiredConfig.label} Role
            </button>

            <Link
              href={ROLE_CONFIGS[user.role].dashboardPath}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
            >
              Go to My {ROLE_CONFIGS[user.role].label} Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
