import { useDateRange } from "@/app/(main)/context/date-range-context";
import { X, CalendarDays, Star } from "lucide-react";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const TruckDetailsModal = ({ isOpen, onClose, truck }: any) => {
    const { globalDateRange } = useDateRange();
    const [localRange, setLocalRange] = useState<{ startDate: Date | null; endDate: Date | null } | null>(null);

    const activeRange = localRange ?? globalDateRange;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-4 overflow-auto max-h-[90vh]">
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-sm font-medium text-blue-600">{truck.title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X size={18} />
                    </button>
                </div>

                <div className="flex justify-between mb-3">
                    <h2 className="text-sm font-medium ">Truck Statistics Overview</h2>
                    <div className="flex items-center gap-2 text-xs text-gray-700 border rounded px-2 py-1">
                        <CalendarDays size={14} />
                        <DatePicker
                            selected={activeRange.startDate}
                            onChange={(date) => setLocalRange({ ...activeRange, startDate: date })}
                            selectsStart
                            startDate={activeRange.startDate}
                            endDate={activeRange.endDate}
                            placeholderText="Start date"
                            dateFormat="dd MMM yyyy"
                            className="bg-transparent focus:outline-none w-[90px]"
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
                            className="bg-transparent focus:outline-none w-[90px]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3 text-xs">
                    <div className="rounded h-[45px] border flex justify-between p-3 text-center">
                        <p className="text-gray-500">Total Trips</p>
                        <p className="text-base font-medium">{truck.totalTrips}</p>
                    </div>
                    <div className="rounded h-[45px] border flex justify-between border p-3 text-center">
                        <p className="text-gray-500">Completed Trips</p>
                        <p className="text-base font-medium">{truck.completedTrips}</p>
                    </div>
                    <div className="rounded h-[45px] border flex justify-between border p-3 text-center">
                        <p className="text-gray-500">Ongoing Trips</p>
                        <p className="text-base font-medium">{truck.ongoingTrips}</p>
                    </div>
                </div>
                <div className="flex w-full mb-3 ">
                    <div className="w-[30%] rounded border  p-3 mb-3 text-xs">
                        <p className="text-gray-500 text-xs font-semibold">Truck Earnings</p>
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-base font-semibold text-green-700">{truck.earnings}</p>
                            <p className="text-green-500 text-[10px] mt-1">↑ {truck.earningsGrowth}</p>
                        </div>
                    </div>
                    <div className="w-[70%] ml-3 rounded border  p-3 mb-3 text-xs">
                        <div className="flex justify-between mb-1 text-gray-600">
                            <span>IT Strength</span>
                            <span>{truck.itStrength.value}%</span>
                        </div>
                        <p className="mt-1">{truck.itStrength.label}</p>
                        <div className="w-full bg-gray-200 h-2 rounded">
                            <div
                                className="bg-green-600 h-2 rounded"
                                style={{ width: `${truck.itStrength.value}%` }}
                            />
                        </div>
                    </div>
                </div>

                <h3 className="text-xs font-medium mb-2">Assigned Drivers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-xs">
                    {truck.drivers.map((driver: any, index: number) => (
                        <div key={index} className="rounded border p-3">
                            <div className="flex items-center justify-between mb-1">
                                <div className="text-gray-700 font-medium">{driver.name}</div>
                                <div className="flex items-center gap-1 text-green-600 text-xs">
                                    <Star size={12} fill="currentColor" />
                                    {driver.rating}
                                </div>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>{driver.trips} Trips</span>
                                <span>{driver.earnings}</span>
                            </div>

                            <div className="flex justify-between text-gray-600 mt-2">
                                <span>Efficiency</span>
                                <span>{driver.efficiency}%</span>
                            </div>
                            <div className="mt-1 h-2 w-full bg-gray-200 rounded">
                                <div
                                    className="h-2 bg-green-600 rounded"
                                    style={{ width: `${driver.efficiency}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="text-xs font-medium mb-2">Recent Trips</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs">
                    {truck.recentTrips.map((trip: any, index: number) => (
                        <div key={index} className="space-y-2 rounded-lg border bg-blue-100 p-4">
                            <div className="font-medium text-gray-700">{trip.route}</div>
                            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                                <div className="font-semibold text-green-600">{trip.value}</div>
                                <div className="inline-block rounded-full rounded-lg border bg-blue-100 bg-white px-2 py-0.5 text-xs text-blue-700">
                                    {trip.trips}
                                </div>
                            </div>
                        </div>

                    ))}
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        className="px-3 py-1 rounded border text-xs text-gray-700 hover:bg-gray-100"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button className="px-3 py-1 rounded bg-gray-800 text-white text-xs hover:bg-gray-700">
                        View full details
                    </button>
                </div>
            </div>
        </div>
    );
};
