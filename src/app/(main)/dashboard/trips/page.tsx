"use client";

import { useState } from "react";

import { Filter } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const stats = [
  { title: "Total Trips Completed", value: 127, change: 10 },
  { title: "Trips In-Transit", value: 117, change: 10 },
  { title: "Total Distance", value: "117 Km", change: 10 },
  { title: "Total Earnings", value: "₹3,10,700", change: 10 },
];

const tabs = ["Upcoming", "In-progress", "Completed", "Action needed", "All Trips"];

const trips = [
  {
    refNo: "028/187634/3024",
    truckNo: "RJ50GA6963",
    buyer: "CHEMICAL & MINERAL INDUSTRIES",
    material: "Limestone",
    status: "Trips Finalised",
    driver: { name: "Arjun Ram", phone: "9601497326" },
  },
  {
    refNo: "028/187634/3024",
    truckNo: "RJ20EG4714",
    buyer: "BIRLA CORPORATION LTD.",
    material: "Limestone",
    status: "Truck left site",
    driver: { name: "ANIL", phone: "9941018726" },
  },
  {
    refNo: "028/188820/0434",
    truckNo: "RJ20CG5773",
    buyer: "LARSEN & TOUBRO LIMITED",
    material: "Limestone",
    status: "Truck left site",
    driver: { name: "BHOM SINGH", phone: "9467545128" },
  },
];

export default function Page() {
  const [selectedTab, setSelectedTab] = useState("Upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrips = trips.filter((trip) => trip.truckNo.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen space-y-6 p-6">
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
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="p-4">
                <CardDescription className="text-gray-500">{stat.title}</CardDescription>
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
        <div className="w-full sm:max-w-sm">
          <Input placeholder="Search for Trucks" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="overflow-auto">
          <table className="min-w-full rounded-lg bg-white shadow-sm">
            <thead className="bg-gray-100 text-sm text-gray-600">
              <tr>
                <th className="p-4 text-left">Reference No</th>
                <th className="p-4 text-left">Truck No</th>
                <th className="p-4 text-left">Buyer Name</th>
                <th className="p-4 text-left">Material</th>
                <th className="p-4 text-left">Trip Status</th>
                <th className="p-4 text-left">Driver Info</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.map((trip, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-4 text-sm text-gray-700">{trip.refNo}</td>
                  <td className="cursor-pointer p-4 text-sm text-blue-600 underline">{trip.truckNo}</td>
                  <td className="p-4 text-sm text-gray-700">{trip.buyer}</td>
                  <td className="p-4 text-sm text-gray-700">{trip.material}</td>
                  <td className="p-4 text-sm">
                    <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600">
                      {trip.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {trip.driver.name}
                    <br />
                    <span className="text-xs text-gray-500">{trip.driver.phone}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
              <button key={page} className="rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
                {page}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}
