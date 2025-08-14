'use client';

import { ChevronLeft } from 'lucide-react';

export default function TruckDashboardHeader() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <ChevronLeft className="w-5 h-5" />
        <span>Fleet / RJ50GA6963</span>
      </div>
    </div>
  );
}
