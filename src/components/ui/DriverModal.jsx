'use client';
import { useRef } from 'react';
import { X } from 'lucide-react';
import DriverDetailView from './DriverDetailView';
import DriverForm from './DriverForm';

export default function DriverModal({ isOpen, onClose, mode = 'view', data = {}, onSubmit }) {
    console.log("====DATA==DATA==", data);
    
    const modalRef = useRef();

    if (!isOpen) return null;

    // Close if clicked outside modal content
    const handleOverlayClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            onClick={handleOverlayClick}
        >
            <div
                ref={modalRef}
                className="relative w-full max-w-5xl h-[80vh] bg-white rounded-md shadow-2xl overflow-hidden border border-gray-300"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-full transition"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="px-6 py-3 border-b border-gray-200 bg-[#f5f6fa] sticky top-0 z-10">
                    <h2 className="text-base font-semibold text-gray-800">Driver Information</h2>
                </div>
                <div className="px-6 py-4 overflow-y-auto h-full bg-white">
                    {mode === 'view' ? (
                        <DriverDetailView data={data} />
                    ) : (
                        <DriverForm data={data} onSubmit={onSubmit} onCancel={onClose} />
                    )}
                </div>
            </div>
        </div>
    );
}
