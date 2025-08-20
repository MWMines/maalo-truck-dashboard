"use client";

import { useEffect, useState } from "react";

import { CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/axios";
import { useAuth } from "@/lib/use-auth"; // <-- Import the hook

import "react-datepicker/dist/react-datepicker.css";
import { useDateRange } from "../../context/date-range-context";

import TripsPage from "./trip-table";

type TripStatisticsDTO = {
  totalTrips: number;
  inTransientTrips: number;
  totalDistance: number;
  totalEarnings: number;
};

const titleMap: Record<keyof TripStatisticsDTO, string> = {
  totalTrips: "Total Trips",
  inTransientTrips: "Trips In-Transit",
  totalDistance: "Total Distance (km)",
  totalEarnings: "Total Earnings (₹)",
};

function dtoToStats(dto: TripStatisticsDTO) {
  return Object.entries(dto).map(([key, value]) => ({
    title: titleMap[key as keyof TripStatisticsDTO] ?? key,
    value,
    change: 0,
  }));
}
const tabs = ["Upcoming", "In-progress", "Completed", "Action needed", "All Trips"];

type Props = {
  tripStats: TripStatisticsDTO;
};

export default function Page() {
  const isAuthenticated = useAuth(); // <-- Use the hook
  const { globalDateRange } = useDateRange();
  const [localRange, setLocalRange] = useState<{ startDate: Date | null; endDate: Date | null } | null>(null);

  const activeRange = localRange ?? globalDateRange;

  const [selectedTab, setSelectedTab] = useState("Upcoming");
  const [tripStatistics, setTripStatistics] = useState<any>([]);
  const stats = dtoToStats(tripStatistics);

  useEffect(() => {
    api
      .get("/api/trips/statistics")
      .then((response) => {
        setTripStatistics(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trips data:", error);
      });
  }, []);

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen space-y-3 p-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trips</h1>
          <p className="mt-1 text-gray-600">
            View and manage all completed, in-transit, and failed trips handled by your trucks and drivers
          </p>
        </div>
        <div className="ml-2 flex items-center gap-2 rounded border px-2 py-1 text-xs text-gray-800">
          <CalendarDays size={14} />
          <DatePicker
            selected={activeRange.startDate}
            onChange={(date) => setLocalRange({ ...activeRange, startDate: date })}
            selectsStart
            startDate={activeRange.startDate}
            endDate={activeRange.endDate}
            placeholderText="Start date"
            dateFormat="dd MMM yyyy"
            className="w-[90px] bg-transparent focus:outline-none"
          />
          <span className="mx-1">–</span>
          <DatePicker
            selected={activeRange.endDate}
            onChange={(date) => setLocalRange({ ...activeRange, startDate: date })}
            selectsEnd
            startDate={activeRange.startDate}
            endDate={activeRange.endDate}
            placeholderText="End date"
            dateFormat="dd MMM yyyy"
            className="w-[90px] bg-transparent focus:outline-none"
          />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Trips Statistics Overview</CardTitle>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="from-grey-50 via-grey-100 to-grey-300 bg-gradient-to-b p-4">
                <CardDescription className="text-blue-500">{stat.title}</CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{stat.value}</span>
                  <Badge variant="outline" className="border-green-600 text-green-600">
                    +{stat.change}%
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </CardHeader>
      </Card>
      <Card className="p-4">
        <div className="flex flex-wrap gap-3 border-b pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`border-b-2 pb-2 text-sm font-medium transition ${
                selectedTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-blue-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <TripsPage />
      </Card>
    </div>
  );
}
