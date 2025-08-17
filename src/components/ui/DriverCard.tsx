import { Star, UserRound } from "lucide-react";
import Link from "next/link";

export const DriverCard = ({ driver, openModal }: any) => {
  console.log("DriverCard", driver.driverInfo);
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-2" >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
          <UserRound className="w-4 h-4" />
          <Link href={driver.driverInfo} className="underline">
            {driver.driverInfo.name}
          </Link>
        </div>
        <div className="flex items-center gap-1 text-green-600 text-sm">
          <Star className="w-4 h-4 fill-green-500 stroke-green-600" />
          {driver.driverInfo.rating}
        </div>
      </div>

      {/* Efficiency */}
      <div className="text-sm text-gray-700">Predicted Efficiency</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${driver.driverInfo.efficiency}%` }}
          />
        </div>
        <span className="text-sm font-medium">{driver.driverInfo.efficiency}%</span>
      </div>

      {/* Info Row */}
      <div className="flex justify-between text-sm text-gray-600">
        <div>
          <div className="font-medium text-gray-900">Contact No</div>
          {driver.driverInfo.contactNo}
        </div>
        <div>
          <div className="font-medium text-gray-900">Total Trips</div>
          {driver.driverInfo.totalTrips}
        </div>
        <div>
          <div className="font-medium text-gray-900">Total Earnings</div>
          {driver.driverInfo.totalEarnings}
        </div>
      </div>

      {/* Link */}
      <button onClick={() => openModal('view', driver)} className="text-blue-600 text-sm underline font-medium">
        View full details
      </button>
    </div>
  );
};
