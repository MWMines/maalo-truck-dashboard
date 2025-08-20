'use client'
import { useState } from "react";
import { DriverCard } from "./DriverCard";
import DriverModal from "./DriverModal";
import { useRouter } from 'next/navigation';

export const DriverSection = ({ driverInfo, truckId }: any) => {
    console.log("DriverSection", driverInfo);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('view');
    const [driverData, setDriverData] = useState({});
    const router = useRouter();

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
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))]">
                {driverInfo?.map((val: any) => <DriverCard key={val.driverId} driver={val} openModal={openModal} />)}
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
