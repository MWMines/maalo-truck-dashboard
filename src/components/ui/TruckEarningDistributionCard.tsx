import { Fragment, useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TruckDetailsModal } from "./TruckDetailsModal";

export const TruckEarningDistributionCard = ({ title, value, status, trips, efficiency }: any) => {
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

  const statusClass =
    status.startsWith("Active")
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";

  return (
    <Fragment>
      <Card className="w-full max-w-xs" onClick={() => setOpen(true)}>
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <CardDescription className="text-sm font-medium text-gray-500">{title}</CardDescription>
            <CardTitle className="text-lg font-semibold text-green-700">{value}</CardTitle>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusClass}`}>
              {status}
            </span>
            <span className="text-gray-600">{trips} Trips</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium text-gray-500">
              <span>Efficiency</span>
              <span className={`${efficiencyTextColor}`}>{efficiency}%</span>
            </div>
            <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
              <div
                className={`h-full rounded ${progressColor}`}
                style={{ width: `${efficiency}%` }}
              />
            </div>
          </div>
        </CardHeader>
      </Card>
      <TruckDetailsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        truck={truckData}
      />
    </Fragment>
  );
};