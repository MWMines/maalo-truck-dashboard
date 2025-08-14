"use client";

import { TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NetProfitCard } from "@/components/ui/NetProfitCard";
import { Progress } from "@/components/ui/progress";

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
  let progressColor = "bg-green-600";
  if (efficiency < 40) progressColor = "bg-red-600";
  else if (efficiency < 70) progressColor = "bg-yellow-500";

  return (
    <Card>
      <CardHeader className="flex flex-col gap-1">
        <div className="flex w-full justify-between">
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-xl font-semibold">{value}</CardTitle>
        </div>
        <div className="flex w-full justify-between text-sm text-gray-600">
          <span className="border-l-2 border-gray-200 pl-2">{status}</span>
          <span>{trips}</span>
        </div>
        <Progress value={efficiency} className={`${progressColor} h-2 rounded`} />
      </CardHeader>
    </Card>
  );
};

export default function OwnerDashboard() {
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
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Truck Earnings Distribution</CardTitle>
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
