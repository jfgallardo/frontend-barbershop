"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerComponent(
  props: any & { onSelect: (value: string | null) => void }
) {
  const [date, setDate] = React.useState<Date>();

  function selectedValue(params: Date) {
    setDate(params);
    props.onSelect(params);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            `${date.toISOString().split("T")[0]}`
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const currentDate = new Date(date);
            currentDate.setHours(0, 0, 0, 0);
            return currentDate < today || currentDate.getDay() === 0;
          }}
          selected={date}
          onSelect={(value) => selectedValue(value as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
