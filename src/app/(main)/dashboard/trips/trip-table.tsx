"use client";
import React, { useEffect, useState } from "react";

import api from "@/lib/axios";

import { GenericTable } from "../../../../components/table/generic-table";

type Trip = {
  tripId: number;
  ravanaNo: string;
  buyerName: string;
  material: string;
  tripStatus: string;
  driverContact: string;
  truckNumber: string;
  driverName: string;
  modifiedDate: Date;
  createdDate: Date;
  createdBy: string;
  modifiedBy: string;
  profile: string;
};

type Column = {
  key: keyof Trip;
  label: string;
  sortable: boolean;
  render?: (_: any, row: Trip) => React.ReactNode;
};

type TripStatus =
  | "Trip Created"
  | "Trip Finalised"
  | "Truck Arrived at MW"
  | "Stock Allocation"
  | "In Transit"
  | "Truck reached Buyer's weight bridge"
  | "Material delivered"
  | "Payment Done"
  | "Truck left Site"
  | "Pending";

function getTripStatusClasses(status: TripStatus | string): string {
  const statusStyles: Record<TripStatus, string> = {
    "Trip Created": "bg-blue-100 text-blue-700",
    "Trip Finalised": "bg-purple-100 text-purple-700",
    "Truck Arrived at MW": "bg-indigo-100 text-indigo-700",
    "Stock Allocation": "bg-orange-100 text-orange-700",
    "In Transit": "bg-yellow-100 text-yellow-700",
    "Truck reached Buyer's weight bridge": "bg-teal-100 text-teal-700",
    "Material delivered": "bg-green-100 text-green-700",
    "Payment Done": "bg-pink-100 text-pink-700",
    "Truck left Site": "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (statusStyles as Record<string, string>)[status] || "bg-gray-100 text-gray-700";
}

const columns: Column[] = [
  { key: "tripId", label: "Trip ID", sortable: true },
  { key: "ravanaNo", label: "Ravana No", sortable: true },
  { key: "buyerName", label: "Buyer Name", sortable: true },
  { key: "material", label: "Material", sortable: true },
  {
    key: "tripStatus",
    label: "Trip Status",
    sortable: true,
    render: (value: string) => (
      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getTripStatusClasses(value)}`}>{value}</span>
    ),
  },
  { key: "truckNumber", label: "Truck Number", sortable: true },
  {
    key: "profile",
    label: "Driver Profile",
    sortable: false,
    render: (_: any, row: Trip) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" fill="#cbd5e1" />
            <rect x="6" y="14" width="12" height="6" rx="3" fill="#cbd5e1" />
          </svg>
        </div>
        <div>
          <div className="font-medium">{row.driverName}</div>
          <div className="text-xs text-gray-500">{row.driverContact}</div>
        </div>
      </div>
    ),
  },
];

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortKey, setSortKey] = useState<keyof Trip>("modifiedDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/trips/list?`, {
        params: {
          page: page - 1,
          size: pageSize,
          sortBy: sortKey,
          sortDir: sortOrder,
          search, // Pass search query to API
        },
      })
      .then((res) => {
        setTrips(res.data.content ?? []);
        setTotalPages(res.data.totalPages ?? 1);
      })
      .catch((err) => {
        console.error("Failed to fetch trips data", err);
        setTrips([]);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize, sortKey, sortOrder, search]);

  // Handler for sorting
  const handleSort = (key: keyof Trip) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    setPage(1); // Reset to first page on sort
  };

  return (
    <div className="p-1">
      <GenericTable
        data={trips}
        columns={columns}
        pageSize={pageSize}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        loading={loading}
        onSort={handleSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onPageSizeChange={setPageSize}
        search={search}
        onSearch={setSearch}
      />
    </div>
  );
}
