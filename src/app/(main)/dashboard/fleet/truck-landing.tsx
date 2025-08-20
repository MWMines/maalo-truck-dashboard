import Link from "next/link";

import TruckDashboardHeader from "@/app/(main)/dashboard/fleet/_components/truck-dashboard-header";
import TruckInfoCard from "@/app/(main)/dashboard/fleet/_components/truck-info-card";
import { DriverSection } from "@/components/ui/DriverSection";

const driverList = [
  {
    driverId: 104398,
    name: "BAPAN",
    dob: null,
    contactNo: "8101310717",
    fatherName: null,
    homeCity: null,
    preferredLanguages: null,
    martialStatus: null,
    spouseName: null,
    marriageAnniversary: null,
    kids: null,
    favouriteSinger: null,
    favouriteFood: null,
    interestedNews: null,
    address: null,
    landmark: null,
    locality: null,
    tehsil: null,
    district: null,
    state: null,
    pincode: null,
    assignedLevel: "Truck Level",
  },
  {
    driverId: 104397,
    name: "BAPAN",
    dob: null,
    contactNo: "8101310717",
    fatherName: null,
    homeCity: null,
    preferredLanguages: null,
    martialStatus: null,
    spouseName: null,
    marriageAnniversary: null,
    kids: null,
    favouriteSinger: null,
    favouriteFood: null,
    interestedNews: null,
    address: null,
    landmark: null,
    locality: null,
    tehsil: null,
    district: null,
    state: null,
    pincode: null,
    assignedLevel: "Truck Level",
  },
  {
    driverId: 104396,
    name: "BAPAN",
    dob: null,
    contactNo: "8101310717",
    fatherName: null,
    homeCity: null,
    preferredLanguages: null,
    martialStatus: null,
    spouseName: null,
    marriageAnniversary: null,
    kids: null,
    favouriteSinger: null,
    favouriteFood: null,
    interestedNews: null,
    address: null,
    landmark: null,
    locality: null,
    tehsil: null,
    district: null,
    state: null,
    pincode: null,
    assignedLevel: "Truck Level",
  },
  {
    driverId: 104399,
    name: "BAPAN",
    dob: null,
    contactNo: "8101310717",
    fatherName: null,
    homeCity: null,
    preferredLanguages: null,
    martialStatus: null,
    spouseName: null,
    marriageAnniversary: null,
    kids: null,
    favouriteSinger: null,
    favouriteFood: null,
    interestedNews: null,
    address: null,
    landmark: null,
    locality: null,
    tehsil: null,
    district: null,
    state: null,
    pincode: null,
    assignedLevel: "Truck Level",
  },
];

export default function TruckMoreInformation({ truckInfo }: any) {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <main className="flex-1 space-y-6 p-6">
        <TruckDashboardHeader breadcum={`Fleet / ${truckInfo?.truckNumber}`} />
        <div className="grid grid-cols-6 gap-4">
          {[
            { label: "Total Trips", value: "127" },
            { label: "Completed Trips", value: "118" },
            { label: "Ongoing Trips", value: "118" },
            { label: "Avg Fuel Efficiency", value: "6.2 km/l" },
            { label: "Truck Earnings", value: "₹45,670" },
            {
              label: "IT Strength",
              value: (
                <div className="w-full">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-green-600">Strong</span>
                    <span>70%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 w-[70%] rounded-full bg-green-500" />
                  </div>
                </div>
              ),
            },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg bg-white p-4 shadow-sm">
              <div className="text-sm text-gray-500">{label}</div>
              <div className="text-lg font-semibold">{value}</div>
            </div>
          ))}
        </div>

        <TruckInfoCard truckInfo={truckInfo} />
        <DriverSection driverInfo={driverList} truckId={truckInfo.truckNumber} />
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium">Recent Trips</h2>
            <Link href="/dashboard/trips" className="text-sm text-blue-500">
              View all trips
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                route: "Mumbai → Delhi",
                amount: "₹5,000",
                trips: "8 Trips",
              },
              {
                route: "Chennai → Bangalore",
                amount: "₹89,500",
                trips: "12 Trips",
              },
              {
                route: "Pune → Hyderabad",
                amount: "₹1,85,000",
                trips: "12 Trips",
              },
            ].map((trip, idx) => (
              <div key={idx} className="space-y-2 rounded-lg border bg-blue-100 p-4">
                <div className="font-medium text-gray-700">{trip.route}</div>
                <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                  <div className="font-semibold text-green-600">{trip.amount}</div>
                  <div className="inline-block rounded-full rounded-lg border bg-blue-100 bg-white px-2 py-0.5 text-xs text-blue-700">
                    {trip.trips}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
