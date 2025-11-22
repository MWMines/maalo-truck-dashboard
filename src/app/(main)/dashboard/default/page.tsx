"use client";

import { TrendingUp, CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NetProfitCard } from "@/components/ui/NetProfitCard";
import TruckEarningsSection from "@/components/ui/TruckEarningsSection";
import { useAuth } from "@/lib/use-auth";

import "react-datepicker/dist/react-datepicker.css";
import { useDateRange } from "../../context/date-range-context";

const fleetUtilisationCardSchema = [
  { title: "Registered Trucks", value: "18" },
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
    title: "MH11JB5239",
    value: "—",
    status: "Idle (0-tenure)",
    trips: "0 Trips",
    efficiency: 10,
  },
  {
    title: "MH11JB4239",
    value: "—",
    status: "Idle (0-tenure)",
    trips: "0 Trips",
    efficiency: 10,
  },
  {
    title: "MH11JB3239",
    value: "—",
    status: "Idle (0-tenure)",
    trips: "0 Trips",
    efficiency: 10,
  },
  {
    title: "MH11JB2239",
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

export default function OwnerDashboard() {
  const isAuthenticated = useAuth();
  const { globalDateRange, setGlobalDateRange } = useDateRange();

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen space-y-6 p-2">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
        <div className="mb-3 flex justify-between">
          <p className="mt-1 text-gray-600">Track revenue, analyze performance, and optimize fleet profitability</p>
          <div className="flex items-center gap-2 rounded border px-2 py-1 text-xs text-gray-800">
            <CalendarDays size={14} />
            <DatePicker
              selected={globalDateRange.startDate}
              onChange={(date) => setGlobalDateRange({ ...globalDateRange, startDate: date })}
              selectsStart
              startDate={globalDateRange.startDate}
              endDate={globalDateRange.endDate}
              placeholderText="Start date"
              dateFormat="dd MMM yyyy"
              className="w-[90px] bg-transparent focus:outline-none"
            />
            <span className="mx-1">–</span>
            <DatePicker
              selected={globalDateRange.endDate}
              onChange={(date) => setGlobalDateRange({ ...globalDateRange, endDate: date })}
              selectsEnd
              startDate={globalDateRange.startDate}
              endDate={globalDateRange.endDate}
              placeholderText="End date"
              dateFormat="dd MMM yyyy"
              className="w-[90px] bg-transparent focus:outline-none"
            />
          </div>
        </div>
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
      <TruckEarningsSection truckEarningDistributionCardSchema={truckEarningDistributionCardSchema} />
    </div>
  );
}
