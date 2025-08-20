"use client";

import { useRouter } from "next/navigation";

import { ChevronLeft, Truck } from "lucide-react";

type TruckDashboardHeaderProps = {
  breadcum: string;
};

export default function TruckDashboardHeader({ breadcum }: TruckDashboardHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <button
        className="flex items-center gap-2 text-sm text-gray-600 transition hover:text-blue-600"
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-5 w-5" />
        <Truck className="h-5 w-5 text-blue-400" />
        <span>{breadcum}</span>
      </button>
    </div>
  );
}
