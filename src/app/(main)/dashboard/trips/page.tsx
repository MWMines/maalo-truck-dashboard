"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { Filter } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/use-auth"; // <-- Import the hook

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

  const [selectedTab, setSelectedTab] = useState("Upcoming");
  const [tripStatistics, setTripStatistics] = useState<any>([]);
  const stats = dtoToStats(tripStatistics);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/trips/statistics")
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
        <Button variant="outline" className="gap-2">
          <Filter size={16} />
          Filters
        </Button>
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
