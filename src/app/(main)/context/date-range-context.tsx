"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

type DateRangeContextType = {
  globalDateRange: DateRange;
  setGlobalDateRange: (range: DateRange) => void;
};

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const [globalDateRange, setGlobalDateRange] = useState<DateRange>({
    startDate: oneMonthAgo,
    endDate: today,
  });

  const value = useMemo(() => ({ globalDateRange, setGlobalDateRange }), [globalDateRange]);

  return <DateRangeContext.Provider value={value}>{children}</DateRangeContext.Provider>;
};

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
};
