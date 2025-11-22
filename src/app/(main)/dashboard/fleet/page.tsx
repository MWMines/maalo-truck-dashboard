"use client";

import { useEffect, useState } from "react";

import { CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";

import { Card } from "@/components/ui/card";
import api from "@/lib/axios";
import { useAuth } from "@/lib/use-auth"; // <-- Import the hook

import "react-datepicker/dist/react-datepicker.css";
import { useDateRange } from "../../context/date-range-context";

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
          <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
          <p className="mt-1 text-gray-600">Manage your truck fleet, drivers, and maintenance schedule.</p>
        </div>
        <div className="mb-3 flex justify-between">
          {/* <Button variant="outline" className="gap-2">
          <Filter size={16} />
          Add New Truck
        </Button> */}
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
      </div>
      <Card className="p-4">
        <TruckPage />
      </Card>
    </div>
  );
}
