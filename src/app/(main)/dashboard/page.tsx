"use client";

import { Fragment, useState } from "react";

import Link from "next/link";

import { TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NetProfitCard } from "@/components/ui/NetProfitCard";
import { TruckDetailsModal } from "@/components/ui/TruckDetailsModal";
import { useAuth } from "@/lib/use-auth";

const fleetUtilisationCardSchema = [
  { title: "Total Trucks", value: "18" },
  { title: "In Tenure", value: "12" },
  { title: "Idle", value: "4" },
  { title: "In Transit", value: "8" },
];

const fleetSummaryCardSchema = [
  { title: "Trips Completed", value: "127", isAction: true, actionPercent: 10 },
  { title: "Ongoing Trips", value: "118", isAction: false },
  { title: "Total Kilometers", value: "6.2 km/l", isAction: false },
];

const truckEarningDistributionCardSchema = [
  {
    title: "MH12AB1234",
    value: "₹45,670",
    status: "Active (In-tenure)",
    trips: "12 Trips",
    efficiency: 90,
  },
  {
    title: "MH12BD1933",
    value: "₹45,670",
    status: "Active (In-tenure)",
    trips: "12 Trips",
    efficiency: 70,
  },
  {
    title: "MH11JB9239",
    value: "—",
    status: "Idle (0-tenure)",
    trips: "0 Trips",
    efficiency: 10,
  },
];

const FleetUtilisationCard = ({ title, value }: any) => (
  <Card className="flex h-[50px] justify-between bg-gray-100 p-2">
    <CardHeader className="flex items-center justify-between p-0">
      <CardDescription className="font-semibold">{title}</CardDescription>
      <CardTitle className="text-xl font-semibold">{value}</CardTitle>
    </CardHeader>
  </Card>
);

const FleetSummaryCard = ({ title, value, isAction, actionPercent }: any) => (
  <Card className="flex h-[65px] flex-col justify-between bg-gray-100 p-3">
    <CardHeader className="flex w-full flex-col p-0">
      <CardDescription>{title}</CardDescription>
      <div className="flex w-full items-center justify-between gap-2">
        <CardTitle className="text-x font-semibold">{value}</CardTitle>
        {isAction && (
          <Badge variant="outline" className="flex items-center gap-1 border-green-600 text-green-600">
            <TrendingUp size={16} />+{actionPercent}%
          </Badge>
        )}
      </div>
    </CardHeader>
  </Card>
);

const TruckEarningDistributionCard = ({ title, value, status, trips, efficiency }: any) => {
  const [open, setOpen] = useState(false);

  const truckData = {
    title: "Truck: MH-12-AB-1234",
    dateRange: "Jan 12, 2024 – Jan 18, 2024",
    totalTrips: 18,
    completedTrips: 10,
    ongoingTrips: 9,
    earnings: "₹45,670",
    earningsGrowth: "4%",
    itStrength: { label: "Strong", value: 70 },
    drivers: [
      {
        name: "Rajesh Kumar",
        rating: 4.8,
        trips: 12,
        earnings: "₹45,670",
        efficiency: 90,
      },
      {
        name: "Sunit Verma",
        rating: 4.8,
        trips: 12,
        earnings: "₹45,670",
        efficiency: 90,
      },
    ],
    recentTrips: [
      { route: "Mumbai → Delhi", value: "₹1,45,000", trips: "8 Trips" },
      { route: "Chennai → Bangalore", value: "₹89,500", trips: "12 Trips" },
      { route: "Pune → Hyderabad", value: "₹1,85,000", trips: "12 Trips" },
    ],
  };

  let progressColor = "bg-green-600";
  if (efficiency < 40) progressColor = "bg-red-600";
  else if (efficiency < 70) progressColor = "bg-indigo-600";

  let efficiencyTextColor = "text-green-600";
  if (efficiency < 40) efficiencyTextColor = "text-red-600";
  else if (efficiency < 70) efficiencyTextColor = "text-indigo-600";

  const statusClass = status.startsWith("Active") ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";

  return (
    <Fragment>
      <Card className="w-full max-w-xs" onClick={() => setOpen(true)}>
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <CardDescription className="text-sm font-medium text-gray-500">{title}</CardDescription>
            <CardTitle className="text-lg font-semibold text-green-700">{value}</CardTitle>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusClass}`}>{status}</span>
            <span className="text-gray-600">{trips} Trips</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium text-gray-500">
              <span>Efficiency</span>
              <span className={`${efficiencyTextColor}`}>{efficiency}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
              <div className={`h-full rounded ${progressColor}`} style={{ width: `${efficiency}%` }} />
            </div>
          </div>
        </CardHeader>
      </Card>
      <TruckDetailsModal isOpen={open} onClose={() => setOpen(false)} truck={truckData} />
    </Fragment>
  );
};

export default function OwnerDashboard() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen space-y-6 p-2">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
        <p className="mt-1 text-gray-600">Track revenue, analyze performance, and optimize fleet profitability</p>
      </header>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Fleet Utilisation</CardTitle>
              <CardDescription>Overview of your truck fleet status and availability</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-4">
              {fleetUtilisationCardSchema.map((item) => (
                <FleetUtilisationCard key={item.title} {...item} />
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Fleet Summary</CardTitle>
              <CardDescription>Key performance metrics for this month</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-1 gap-4 px-4 pb-4 sm:grid-cols-2 md:grid-cols-3">
              {fleetSummaryCardSchema.map((item) => (
                <FleetSummaryCard key={item.title} {...item} />
              ))}
            </div>
          </Card>
        </div>

        <NetProfitCard />
      </section>

      <section>
        <Card className="cursor-pointer">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-xl font-semibold">Truck Earnings Distribution</CardTitle>
            <Link href="/dashboard/trips" className="text-sm font-medium text-blue-600 hover:underline">
              View all trips
            </Link>
          </CardHeader>
          <div className="grid grid-cols-1 gap-4 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-3">
            {truckEarningDistributionCardSchema.map((item) => (
              <TruckEarningDistributionCard key={item.title} {...item} />
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
