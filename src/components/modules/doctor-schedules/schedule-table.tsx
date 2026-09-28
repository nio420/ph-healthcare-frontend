"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseMySchedules } from "@/hooks/schedule.hook";
import type { ScheduleParams } from "@/types";
import ScheduleActions from "./schedule-actions"; // 1. IMPORT SCHEDULE ACTIONS

interface Props extends ScheduleParams {}

// 2. SAFE DATE FORMATTING
function formatDateTime(value?: string) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function ScheduleTable(params: Props) {
  const { data } = useSuspenseMySchedules(params);
  const schedules = data?.data || [];

  if (schedules.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
        No schedules found. Create your first schedule to start accepting
        appointments.
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Slots</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell>
                <div className="font-medium">
                  {formatDateTime(schedule.startDateTime)}
                </div>
                {schedule.endDateTime &&
                  formatDateTime(schedule.endDateTime) !== "N/A" && (
                    <div className="text-xs text-muted-foreground">
                      to {formatDateTime(schedule.endDateTime)}
                    </div>
                  )}
              </TableCell>
              <TableCell>
                {(schedule.totalSlots ?? 0) - (schedule.availableSlots ?? 0)}/
                {schedule.totalSlots ?? 0} booked
              </TableCell>
              <TableCell>
                <span
                  className={
                    schedule.status?.toUpperCase() === "PUBLISHED"
                      ? "text-green-600"
                      : "text-amber-600"
                  }
                >
                  {schedule.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {/* 3. REPLACED DUMMY BUTTON WITH SCHEDULE ACTIONS */}
                <ScheduleActions schedule={schedule} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
