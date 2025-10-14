"use client";

import { useState, useEffect } from "react";

import axios from "axios";
import { format } from "date-fns";
import { Plus, ListFilter, Search, CircleUser, ArrowDown, Loader2 } from "lucide-react";

import FilterPopup from "@/app/(main)/dashboard/trips/filter-popup";
import { TripTablePagination } from "@/components/data-table/trip-table-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TripData = {
  ravanaNo: string;
  truckNumber: string;
  buyerName: string;
  materialName: string;
  tripStatus: string;
  driverName: string;
  driverMobileNumber: string;
  createdDate: string;
};

export default function TripsTableComponent() {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [filteredTrips, setFilteredTrips] = useState<TripData[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/trips");
        setTrips(response.data);
        setFilteredTrips(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        setLoading(false);
      } catch (err) {
        const error = err as {
          response?: { status: number; data: string };
          request?: unknown;
        };

        console.error("Error fetching trips data:", error);

        if (error.response) {
          setError(`Error: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
          setError("No response received from the server.");
        } else {
          setError("Error setting up the request.");
        }

        setLoading(false);
      }
    };

    fetchTrips();
  }, [itemsPerPage]);

  const applyFilter = () => {
    const [start, end] = dateRange;
    if (start && end) {
      const adjustedEnd = new Date(end);
      adjustedEnd.setHours(23, 59, 59, 999);

      const filtered = trips.filter((trip) => {
        const tripDate = new Date(trip.createdDate);
        return tripDate >= start && tripDate <= adjustedEnd;
      });
      setFilteredTrips(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setIsFilterOpen(false);
      setCurrentPage(1);
    }
  };

  const resetFilter = () => {
    setDateRange([null, null]);
    setFilteredTrips(trips);
    setTotalPages(Math.ceil(trips.length / itemsPerPage));
    setIsFilterOpen(false);
  };

  const currentTrips = (filteredTrips.length > 0 ? filteredTrips : trips).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredTrips.length / size));
  };

  const renderTableContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={6} className="px-4 py-8 text-center">
            <Loader2 className="text-muted-foreground mx-auto h-6 w-6 animate-spin" />
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={6} className="px-4 py-2 text-center text-red-500">
            {error}
          </td>
        </tr>
      );
    }

    return currentTrips.map((trip, index) => (
      <tr
        key={index}
        className="hover:bg-muted/50 data-[state=selected]:bg-muted relative z-0 border-b transition-colors"
      >
        <td className="p-2 align-middle whitespace-nowrap">{trip.ravanaNo}</td>
        <td className="p-2 align-middle whitespace-nowrap">{trip.truckNumber}</td>
        <td className="p-2 align-middle whitespace-nowrap">{trip.buyerName}</td>
        <td className="p-2 align-middle whitespace-nowrap">
          {trip.materialName.charAt(0).toUpperCase() + trip.materialName.slice(1).toLowerCase()}
        </td>
        <td className="p-2 align-middle whitespace-nowrap">{trip.tripStatus}</td>
        <td className="p-2 align-middle whitespace-nowrap">
          <div className="flex items-start gap-2">
            <CircleUser className="text-muted-foreground mt-1 h-7 w-7" />
            <div className="flex flex-col text-sm leading-tight">
              <span className="font-medium">{trip.driverName}</span>
              <span className="text-muted-foreground text-xs">{trip.driverMobileNumber}</span>
            </div>
          </div>
        </td>
        {/* <td className="p-2 align-middle whitespace-nowrap">
          {new Date(trip.createdDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </td> */}
      </tr>
    ));
  };

  return (
    <div className="flex flex-col gap-2 p-4 md:gap-1">
      <div className="flex items-center justify-between">
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">Trips</CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4" />
          <span className="hidden lg:inline">Add Trip</span>
        </Button>
      </div>

      <p>Documents and attachments that have been uploaded as part of this project.</p>

      <Tabs defaultValue="upcoming" className="mt-[10px] w-full flex-col justify-start gap-5">
        <div className="flex items-center justify-between">
          <Select defaultValue="upcoming">
            <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm">
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="in-progress">In-progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="action-needed">Action needed</SelectItem>
              <SelectItem value="all-trips">All Trips</SelectItem>
            </SelectContent>
          </Select>

          <TabsList className="hidden @4xl/main:flex">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="in-progress">
              In-progress <Badge variant="secondary">3</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed <Badge variant="secondary">2</Badge>
            </TabsTrigger>
            <TabsTrigger value="action-needed">Action needed</TabsTrigger>
            <TabsTrigger value="all-trips">All Trips</TabsTrigger>
          </TabsList>
        </div>

        <div className="relative mt-2 flex items-center justify-between gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for trips"
              className="bg-muted w-[300px] rounded-md border px-4 py-1.5 pl-10 text-sm"
            />
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
          </div>

          <div className="flex items-center gap-2">
            {dateRange[0] && dateRange[1] && (
              <div className="bg-muted text-muted-foreground flex items-center gap-2 rounded-md border px-3 py-1 text-sm">
                <span>
                  📅 {format(dateRange[0], "MMM dd, yyyy")} - {format(dateRange[1], "MMM dd, yyyy")}
                </span>
                <button
                  onClick={resetFilter}
                  className="ml-2 text-xs text-red-500 hover:underline"
                  title="Clear filter"
                >
                  ✕
                </button>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)} className="ml-4">
              <ListFilter className="mr-2 h-4 w-4" />
              <span className="hidden cursor-pointer sm:inline">Filters</span>
            </Button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="relative mt-2">
            <FilterPopup
              dateRange={dateRange}
              setDateRange={setDateRange}
              applyFilter={applyFilter}
              resetFilter={resetFilter}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>
        )}

        <div className="mt-2 overflow-x-auto rounded-md border">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-muted text-left">
                <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  Rawana No
                </th>
                <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  Truck No
                </th>
                <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  Buyer Name
                </th>
                <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  Truck Material
                </th>
                <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  Trip Status
                  <ArrowDown className="ml-2 inline-block h-4 w-4 text-gray-500" />
                </th>
                <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  Driver Info
                </th>
                {/* <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">Created Date</th> */}
              </tr>
            </thead>
            <tbody>{renderTableContent()}</tbody>
          </table>
        </div>

        <TripTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Tabs>
    </div>
  );
}
