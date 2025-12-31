"use client";
import * as React from "react";

import { useRouter } from "next/navigation";

import { ChartPie, Grid2X2, Search, Command } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const searchItems = [
  { group: "Dashboards", icon: ChartPie, label: "Default", route: "/dashboard/default" },
  { group: "Dashboards", icon: Grid2X2, label: "Fleet", route: "/dashboard/fleet" },
  { group: "Dashboards", icon: Grid2X2, label: "Trips", route: "/dashboard/trips" },
];

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div
        className="text-muted-foreground flex cursor-pointer items-center gap-4 text-sm"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4.5" />

        <kbd className="bg-muted inline-flex h-7 w-8 items-center gap-1 rounded border px-1.5 text-[10px] font-medium select-none">
          <span className="text-xs">
            <Command className="size-4.5" />
          </span>
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search dashboards, users, and more…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {[...new Set(searchItems.map((item) => item.group))].map((group, i) => (
            <React.Fragment key={group}>
              {i !== 0 && <CommandSeparator />}
              <CommandGroup heading={group} key={group}>
                {searchItems
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <CommandItem
                      className="!py-1.5"
                      key={item.label}
                      onSelect={() => {
                        setOpen(false);
                        if (item.route) {
                          router.push(item.route);
                        }
                      }}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
