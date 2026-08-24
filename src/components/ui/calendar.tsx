"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Calendar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-md border bg-background p-3", className)} {...props} />;
}

function CalendarDayButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Calendar, CalendarDayButton };
