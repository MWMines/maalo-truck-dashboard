import { TrendingUp, TrendingDown, IndianRupee, Truck, Route } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="flex flex-col gap-2 p-0 md:p-0">
      <div className="flex items-center justify-between">
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">Owner Dashboard</CardTitle>
      </div>

      <p className="text-muted-foreground">Track revenue, analyze performance, and optimize fleet profitability.</p>

      <Card className="@container/card mt-4 gap-2 p-1">
        <CardHeader className="m-1.5 p-1">
          <CardTitle className="text-xl font-semibold">Fleet Utilisation</CardTitle>
          <CardDescription>Overview of your truck fleet status and availability</CardDescription>
        </CardHeader>

        <CardTitle className="ml-2 text-xl font-semibold">Total Truck 18</CardTitle>

        <div className="grid grid-cols-1 gap-2 rounded-md p-2 sm:grid-cols-2 lg:grid-cols-5">
          <Card className="bg-muted rounded-md p-3 shadow-xs">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">In-Tenure</p>
              <p className="text-lg font-semibold">12</p>
            </div>
          </Card>

          <Card className="bg-muted rounded-md p-3 shadow-xs">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">In-Transit</p>
              <p className="text-lg font-semibold">6</p>
            </div>
          </Card>

          <Card className="bg-muted rounded-md p-3 shadow-xs">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">Idle</p>
              <p className="text-lg font-semibold">3</p>
            </div>
          </Card>

          <Card className="bg-muted rounded-md p-3 shadow-xs">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">RC Verified</p>
              <p className="text-lg font-semibold">2</p>
            </div>
          </Card>

          {/* Add the truck image here
          <div className="flex justify-center mt-4">
            <img src="/truck-img.jpg" alt="Truck" className="w-20 h-20" />
          </div> */}
          {/* <Card className="bg-muted rounded-md p-3 shadow-xs">
            <div className="flex items-center justify-between">

            </div>
          </Card> */}
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        {/* First Card (with 3 small cards) */}
        <Card className="@container/card w-full gap-2 p-1">
          <CardHeader className="m-1.5 p-1">
            <CardTitle className="text-xl font-semibold">Fleet operations & Financial summary</CardTitle>
            <CardDescription>key performance metrics for this month</CardDescription>
          </CardHeader>

          <div className="grid grid-cols-1 gap-2 rounded-md p-4 sm:grid-cols-3">
            <Card className="rounded-md bg-violet-100 p-2.5 shadow-xs">
              <div className="mb-2 flex items-center gap-2">
                <IndianRupee className="h-7 w-7 rounded-md bg-violet-700 p-1 text-white" />
                <p className="text-muted-foreground text-sm font-medium">Total Revenue</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-2xl font-semibold">₹ 3,10,700</p>
                <Badge variant="secondary" className="flex items-center gap-1 bg-white text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>44%</span>
                </Badge>
              </div>
            </Card>

            <Card className="rounded-md bg-amber-100 p-2.5 shadow-xs">
              <div className="mb-2 flex items-center gap-2">
                <Truck className="h-7 w-7 rounded-md bg-amber-600 p-1 text-white" />
                <p className="text-muted-foreground text-sm font-medium">Trip in-Transit</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-2xl font-semibold">58</p>
                <Badge variant="secondary" className="flex items-center gap-1 bg-white text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>44%</span>
                </Badge>
              </div>
            </Card>

            <Card className="rounded-md bg-green-100 p-2.5 shadow-xs">
              <div className="mb-2 flex items-center gap-2">
                <Route className="h-7 w-7 rounded-md bg-green-600 p-1 text-white" />
                <p className="text-muted-foreground text-sm font-medium">Trip Completed</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-2xl font-semibold">58</p>
                <Badge variant="secondary" className="flex items-center gap-1 bg-white text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>44%</span>
                </Badge>
              </div>
            </Card>
          </div>
        </Card>

        {/* Second Card */}
        <Card className="@container/card w-full gap-2 justify-self-end p-3">
          <div className="mb-2 flex items-center gap-3">
            <TrendingUp className="bg-muted h-7 w-7 rounded-md border-1 p-1" />
            <p className="text-muted-foreground text-sm font-medium">Net Profit</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-foreground text-2xl font-semibold">₹ 3,10,700</p>
            <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>44%</span>
              <p className="text-black">margin</p>
            </Badge>
          </div>

          <div className="h-[-2px]"></div>

          {/* ---- Line Graph ---- */}
          <div className="h-20 w-full">
            <svg viewBox="0 0 100 40" className="h-full w-full" preserveAspectRatio="none">
              {/* Smooth Line */}
              <path
                d="M0 30 L15 28 L30 22 L45 18 L60 15 L75 10 L90 8 L100 5"
                stroke="#4ade80"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />

              {/* Gradient Under Fill (optional) */}
              <linearGradient id="graphFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade8033" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              <path d="M0 30 L15 28 L30 22 L45 18 L60 15 L75 10 L90 8 L100 5 L100 40 L0 40 Z" fill="url(#graphFill)" />
            </svg>
          </div>
          {/* ---- Gap before button ---- */}
          <div className="mt-[-2px]"></div>

          {/* ---- View Breakdown Button ---- */}
          <button className="border-muted-foreground/30 text-muted-foreground hover:bg-muted/20 w-full cursor-pointer rounded-md border py-1.5 transition">
            View Breakdown
          </button>
        </Card>
      </div>
      {/* 🔹 Fleet Utilisation Section */}
      <Card className="@container/card mt-4 gap-2 p-1">
        <CardHeader className="m-1.5 flex items-center justify-between p-1">
          <CardTitle className="text-xl font-semibold">Truck earnings distribution</CardTitle>
          <a href="" className="text-blue-600 underline">
            View all trips
          </a>
        </CardHeader>
        {/* Inner 4 Small Cards */}
        <div className="bg-muted grid grid-cols-1 gap-2 rounded-md p-2 sm:grid-cols-3 lg:grid-cols-3">
          {/* Small Card 1 */}
          <Card className="rounded-md p-3 shadow-xs">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">MH12AB1234</p>
              <p className="text-lg font-semibold text-green-600">₹ 45,570</p>
            </div>

            <div className="mt-[-20px] flex items-center justify-between">
              <Badge
                variant="secondary"
                className="text-muted-foreground border-muted border border-solid bg-green-100 text-sm"
              >
                <span className="text-green-700">Active (in-tenure)</span>
              </Badge>

              <p className="text-muted-foreground text-sm">12 trips</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Efficiency</p>
              <p className="text-sm">90%</p>
            </div>
            <div className="mt-[-20px]">
              <input
                type="range"
                min="0"
                max="100"
                value="90"
                className="h-2 w-full appearance-none rounded-lg bg-[linear-gradient(to_right,#16a34a_90%,#e5e7eb_90%)]"
                disabled
              />
            </div>
          </Card>

          {/* Small Card 2 */}
          <Card className="rounded-md p-3 shadow-xs">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">RJ12AB6754</p>
              <p className="text-lg font-semibold text-green-600">₹ 45,570</p>
            </div>

            <div className="mt-[-20px] flex items-center justify-between">
              <Badge
                variant="secondary"
                className="text-muted-foreground bg-lightsucess border-muted border border-solid bg-green-100 text-sm"
              >
                <span className="text-green-700">Active (in-tenure)</span>
              </Badge>

              <p className="text-muted-foreground text-sm">12 trips</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Efficiency</p>
              <p className="text-sm">70%</p>
            </div>
            <div className="mt-[-20px]">
              <input type="range" min="0" max="100" value="70" className="h-2 w-full rounded-lg bg-gray-200" disabled />
            </div>
          </Card>

          {/* Small Card 3 */}
          <Card className="rounded-md p-3 shadow-xs">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">NL12AB2345</p>
              <p className="text-lg font-semibold text-green-600">₹ 45,570</p>
            </div>

            <div className="mt-[-20px] flex items-center justify-between">
              <Badge variant="secondary" className="text-muted-foreground border-muted border border-solid text-sm">
                <span>Active (in-tenure)</span>
              </Badge>

              <p className="text-muted-foreground text-sm">9 trips</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Efficiency</p>
              <p className="text-sm">20%</p>
            </div>
            <div className="mt-[-20px]">
              <input type="range" min="0" max="100" value="20" className="h-2 w-full rounded-lg bg-gray-200" disabled />
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}
