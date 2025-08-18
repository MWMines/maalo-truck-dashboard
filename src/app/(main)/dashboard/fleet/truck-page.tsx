"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import api from "@/lib/axios";

import { GenericTable } from "../../../../components/table/generic-table";

type Truck = {
  truckNumber: string;
  truckId: number;
  vehicleClass: string;
  bodyType: string;
  makerModel: string;
  regMobileNo: string | null;
  truckHypothecated: boolean;
  noOfTrips: number;
  driverContact: string;
  truckStatus: string | null;
  driverName: string;
  profile: string;
};
type Column = {
  key: keyof Truck;
  label: string;
  sortable: boolean;
  render?: (_: any, row: Truck) => React.ReactNode;
};
// Remove this local Column type definition, as we now import it from GenericTable

type TruckLinkProps = {
  value: string;
  truckNumber: string;
};

const TruckLink: React.FC<TruckLinkProps> = ({ value, truckNumber }) => {
  const router = useRouter();

  return (
    <button
      className="text-blue-600 underline hover:text-blue-800"
      onClick={() => router.push(`/dashboard/fleet/${truckNumber}`)}
    >
      {value}
    </button>
  );
};
const columns: Column[] = [
  {
    key: "truckNumber",
    label: "Truck Number",
    sortable: true,
    render: (value: string, row: Truck) => <TruckLink value={value} truckNumber={row.truckNumber} />,
  },
  {
    key: "truckHypothecated",
    label: "Hypothecated",
    sortable: true,
    render: (value: boolean) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          value ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
        }`}
      >
        {value ? "Yes" : "No"}
      </span>
    ),
  },
  {
    key: "truckStatus",
    label: "Truck Status",
    sortable: true,
    render: (value: string | null) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          value === "Active"
            ? "bg-green-100 text-green-700"
            : value === "Inactive"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
        }`}
      >
        {value ?? "NA"}
      </span>
    ),
  },
  {
    key: "profile",
    label: "Driver Profile",
    sortable: false,
    render: (_: any, row: Truck) => (
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
  {
    key: "noOfTrips",
    label: "No. of Trips",
    sortable: true,
    render: (value: string) => (
      <span className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
        {value}
      </span>
    ),
  },
  { key: "vehicleClass", label: "Vehicle Class", sortable: true },
  { key: "bodyType", label: "Body Type", sortable: true },
  { key: "makerModel", label: "Maker Model", sortable: true },
];

export default function TruckPage() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortKey, setSortKey] = useState<keyof Truck>("truckId");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/trucks/list`, {
        params: {
          page: page - 1,
          size: pageSize,
          sortBy: sortKey,
          sortDir: sortOrder,
          search,
        },
      })
      .then((res) => {
        setTrucks(res.data.content ?? []);
        setTotalPages(res.data.totalPages ?? 1);
      })
      .catch((err) => {
        console.error("Failed to fetch trucks data", err);
        setTrucks([]);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize, sortKey, sortOrder, search]);

  const handleSort = (key: keyof Truck) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    setPage(1);
  };

  return (
    <div className="p-1">
      <GenericTable
        data={trucks}
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
