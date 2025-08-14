'use client'
import { useState } from "react";
import { DriverCard } from "./DriverCard";
import DriverModal from "./DriverModal";

const drivers = [
    {
        name: "Rajesh Kumar",
        rating: 4.8,
        efficiency: 90,
        contact: "9988776655",
        totalTrips: 13,
        totalEarnings: "₹45,670",
        link: "#",
    },
    {
        name: "Sunit Verma",
        rating: 4.8,
        efficiency: 90,
        contact: "9988776655",
        totalTrips: 13,
        totalEarnings: "₹45,670",
        link: "#",
    },
];

export const DriverSection = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('view');
    const [driverData, setDriverData] = useState({});

    const openModal = (modeType: string, data = {}) => {
        setMode(modeType);
        setDriverData(data);
        setModalOpen(true);
    };

    return (
        <div className="bg-white rounded-xl border p-4">
            <div className="mb-4 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">Driver Information</span>
                </h3>
                <button className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-100" onClick={() => openModal('add')}>
                    + Add Driver
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {drivers.map((driver, idx) => (
                    <DriverCard key={idx} driver={driver} openModal={openModal} />
                ))}
            </div>
            <DriverModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                mode={mode}
                data={driverData}
                onSubmit={(formData: any) => {
                    console.log('Form Submitted:', formData);
                    setModalOpen(false);
                }}
            />
        </div>
    );
};
