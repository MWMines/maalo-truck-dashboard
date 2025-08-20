import { Star, UserRound } from "lucide-react";
import Link from "next/link";

export const DriverCard = ({ driver, openModal }: any) => {
    console.log("DriverCard", driver);
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-2" >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                    <UserRound className="w-4 h-4" />
                    <Link href={driver} className="underline">
                        {driver?.name}
                    </Link>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                    <Star className="w-4 h-4 fill-green-500 stroke-green-600" />
                    {driver?.rating}
                </div>
            </div>

            <div className="text-sm text-gray-700">Predicted Efficiency</div>
            <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${driver?.efficiency}%` }}
                    />
                </div>
                <span className="text-sm font-medium">{driver?.efficiency}%</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
                <div>
                    <div className="font-medium text-gray-900">Contact No</div>
                    {driver?.contactNo}
                </div>
                <div>
                    <div className="font-medium text-gray-900">Total Trips</div>
                    {driver.totalTrips || 0}
                </div>
                <div>
                    <div className="font-medium text-gray-900">Total Earnings</div>
                    {driver?.totalEarnings || "₹0"}
                </div>
            </div>

            <button onClick={() => openModal('view', driver?.driverInfo)} className="text-blue-600 text-sm underline font-medium cursor-pointer hover:text-blue-800">
                View full details
            </button>
        </div>
    );
};
