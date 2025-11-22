'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {TruckEarningDistributionCard} from './TruckEarningDistributionCard';

const TruckEarningsSection = ({ truckEarningDistributionCardSchema }:any) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(truckEarningDistributionCardSchema.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const visibleItems = truckEarningDistributionCardSchema.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <section>
      <Card>
        <CardHeader className="flex justify-between items-center px-4 pt-4">
          <CardTitle className="text-xl font-semibold">Truck Earnings Distribution</CardTitle>
          <a href="/dashboard/fleet" className="text-sm font-medium text-blue-600 hover:underline">
            View all trucks
          </a>
        </CardHeader>

        <div className="flex items-center justify-between px-4 pb-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="disabled:opacity-30"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow px-4">
            {visibleItems.map((item:any, idx:number) => (
              <TruckEarningDistributionCard key={idx} {...item} />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="disabled:opacity-30"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </Card>
    </section>
  );
};

export default TruckEarningsSection;
