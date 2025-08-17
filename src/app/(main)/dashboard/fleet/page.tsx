"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { Filter } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/use-auth"; // <-- Import the hook

import TruckPage from "./truck-page";

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
          <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
          <p className="mt-1 text-gray-600">Manage your truck fleet, drivers, and maintenance schedule.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter size={16} />
          Add New Truck
        </Button>
      </div>
      <Card className="p-4">
        <TruckPage />
      </Card>
    </div>
  );
}
