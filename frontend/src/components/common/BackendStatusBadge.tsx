'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Database, Server, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  featureName?: string;
  requireBackend?: boolean;
}

export default function BackendStatusBadge({ featureName, requireBackend = false }: Props) {
  const { isBackendConnected, backendApiUrl } = useApp();

  return (
    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Server className="w-4 h-4 text-navy-700" />
        <div>
          <span className="font-semibold text-slate-800">
            {featureName ? `${featureName}: ` : 'Backend Architecture: '}
          </span>
          {isBackendConnected ? (
            <span className="text-emerald-700 font-medium">
              Live Spring Boot REST API Connected at {backendApiUrl}
            </span>
          ) : (
            <span className="text-slate-600">
              Interactive Preview Engine active. Connects to Java Spring Boot REST API (Port 8080) in Stage 2.
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isBackendConnected ? (
          <span className="inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-100/70 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Backend Online
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-navy-800 font-medium bg-navy-100/70 px-2 py-0.5 rounded">
            <AlertCircle className="w-3.5 h-3.5 text-navy-700" />
            Preview Mode
          </span>
        )}
      </div>
    </div>
  );
}
