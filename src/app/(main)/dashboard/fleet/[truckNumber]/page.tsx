"use client";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import axios from "axios";

import { useAuth } from "@/lib/use-auth"; // <-- Import the hook
import { Truck } from "@/types/truck";

import TruckMoreInformation from "../truck-landing";

// Truck DTO

export default function TruckDetailsPage() {
  const isAuthenticated = useAuth();
  const { truckNumber } = useParams();
  const [truck, setTruck] = useState<Truck | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!truckNumber) return;
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/trucks/truck/${truckNumber}`)
      .then((res) => setTruck(res.data))
      .catch(() => setTruck(null))
      .finally(() => setLoading(false));
  }, [truckNumber]);

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  if (!truck) {
    return <div className="p-6 text-center text-red-500">Truck not found.</div>;
  }

  return <TruckMoreInformation truckInfo={truck} />;
}
