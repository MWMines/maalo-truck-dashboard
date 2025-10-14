"use client";

import TripsTableComponent from "@/app/(main)/dashboard/trips/trips-table-component";

export default function TripsPage() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <TripsTableComponent />
    </div>
  );
}
