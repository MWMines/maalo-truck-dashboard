import React from 'react';

type SectionCardProps = {
    title: string;
    children: React.ReactNode;
};

export default function SectionCard({ title, children }: SectionCardProps) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">{title}</span>
            </h3>
            {children}
        </div>
    );
}