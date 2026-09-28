"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Schedule } from "@/types";

interface Props {
  schedule?: Schedule;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString(undefined, { dateStyle: "full" });
}

function formatTime(dateStr?: string) {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "N/A" : d.toLocaleTimeString(undefined, { timeStyle: "short" });
}

export default function ScheduleDetailSheet({
  schedule,
  open,
  onOpenChange,
}: Props) {
  if (!schedule) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Schedule details</SheetTitle>
          <SheetDescription>{formatDate(schedule.startDateTime)}</SheetDescription>
        </SheetHeader>
        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Start</dt>
            <dd>{formatTime(schedule.startDateTime)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">End</dt>
            <dd>{formatTime(schedule.endDateTime)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Status</dt>
            <dd className="capitalize">{schedule.status?.toLowerCase() || "N/A"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Slots</dt>
            <dd>
              {(schedule.totalSlots ?? 0) - (schedule.availableSlots ?? 0)}/
              {schedule.totalSlots ?? 0} booked
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Meeting link</dt>
            <dd className="truncate">
              {schedule.meetingLink ? (
                <a
                  href={schedule.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Join
                </a>
              ) : (
                "N/A"
              )}
            </dd>
          </div>
        </dl>
      </SheetContent>
    </Sheet>
  );
}