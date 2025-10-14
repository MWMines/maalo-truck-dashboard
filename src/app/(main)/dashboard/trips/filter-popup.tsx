"use client";

import { forwardRef } from "react";

import { format } from "date-fns";
import { X, Calendar as CalendarIcon } from "lucide-react";
import DatePicker from "react-datepicker";

import { Button } from "@/components/ui/button";
import "react-datepicker/dist/react-datepicker.css";

interface FilterPopupProps {
  dateRange: [Date | null, Date | null];
  setDateRange: React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>;
  applyFilter: () => void;
  resetFilter: () => void;
  onClose: () => void;
}

const CustomDateInput = forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => (
  <div
    className="bg-muted flex w-full cursor-pointer items-center rounded-md border px-3 py-2"
    onClick={onClick}
    ref={ref}
  >
    <CalendarIcon className="text-muted-foreground mr-2 h-4 w-4" />
    <input
      type="text"
      value={value}
      readOnly
      className="text-muted-foreground w-full bg-transparent text-sm focus:outline-none"
      placeholder="Select date range"
    />
  </div>
));
CustomDateInput.displayName = "CustomDateInput";

export default function FilterPopup({ dateRange, setDateRange, applyFilter, resetFilter, onClose }: FilterPopupProps) {
  const formattedDateRange =
    dateRange[0] && dateRange[1]
      ? `${format(dateRange[0], "MMM dd, yyyy")} - ${format(dateRange[1], "MMM dd, yyyy")}`
      : "Select date range";

  return (
    <div className="bg-muted absolute top-full right-0 z-50 mt-2 w-80 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <p className="mt-4 font-semibold">Date Range</p>

      <div className="mb-4 w-full">
        <p className="text-muted-foreground mb-2 text-sm">{formattedDateRange}</p>

        <DatePicker
          selected={dateRange[0]}
          onChange={(dates: [Date | null, Date | null]) => {
            setDateRange(dates);
          }}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          selectsRange
          isClearable
          dateFormat="MMM dd, yyyy"
          customInput={<CustomDateInput />}
          wrapperClassName="w-full"
        />
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <Button variant="outline" size="sm" onClick={resetFilter}>
          Reset
        </Button>
        <Button size="sm" onClick={applyFilter}>
          Apply
        </Button>
      </div>
    </div>
  );
}
