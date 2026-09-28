"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  useBookAppointment,
  useGetMe,
  useGetTodayScheduleByDoctor,
} from "@/hooks";
import { Schedule } from "@/types";
import { format, isValid } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookingConfirmation {
  schedule: Schedule;
  paymentUrl: string;
}

// Your helper function remains exactly here
const safeFormat = (
  dateValue: string | Date | undefined,
  formatStr: string,
) => {
  if (!dateValue) return "-";
  const date = new Date(dateValue);
  return isValid(date) ? format(date, formatStr) : "-";
};

export default function DoctorBooking({ doctorId }: { doctorId: string }) {
  const router = useRouter();

  const { data: me, isPending: mePending } = useGetMe();
  const { data, isPending, error } = useGetTodayScheduleByDoctor({ doctorId });
  const { mutate: book, isPending: bookingPending } = useBookAppointment();
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null,
  );

  const schedules: Schedule[] = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
      ? (data as unknown as Schedule[])
      : [];

  const handleBooking = (schedule: Schedule) => {
    if (!mePending && !me?.data) {
      router.push("/login");
      return;
    }

    book(
      { scheduleId: schedule.id },
      {
        onSuccess: (res) => {
          console.log(res);
          setConfirmation({ paymentUrl: res.data.paymentUrl, schedule });
        },
      },
    );
  };

  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Spinner />
          <span className="text-sm text-muted-foreground">
            Loading today&apos;s slots…
          </span>
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        Could not load slots. Please try again.
      </p>
    );
  }

  if (schedules.length === 0) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        No bookable slots today for this doctor. Try another day or doctor.
      </p>
    );
  }

  return (
    <>
      <div>
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="border rounded-md p-3 flex gap-5 items-center"
          >
            {/* FIX 1: Use safeFormat instead of format */}
            <span>{safeFormat(schedule.startDateTime, "eeee")}</span>
            <span>{safeFormat(schedule.startDateTime, "PP")}</span>
            <span className="text-sm text-muted-foreground">
              Starts at {safeFormat(schedule.startDateTime, "p")}
            </span>
            <span className="text-sm text-muted-foreground">
              Ends at {safeFormat(schedule.endDateTime, "p")}
            </span>
            <Button className="ml-auto" onClick={() => handleBooking(schedule)}>
              {bookingPending ? "Booking..." : "Book Now"}
            </Button>
          </div>
        ))}
      </div>
      <Dialog
        open={!!confirmation}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmation(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Successful</DialogTitle>
            <DialogDescription>
              Please pay within 10 minutes to keep your booking
            </DialogDescription>
            <span>
              Date and Time:{" "}
              {/* FIX 2: Safeguard dialog formatting against null confirmations */}
              {confirmation?.schedule?.startDateTime
                ? safeFormat(confirmation.schedule.startDateTime, "PPP")
                : "-"}
            </span>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmation(null)}>
              Pay Later
            </Button>
            <Button
              onClick={() => {
                if (confirmation) {
                  window.location.href = confirmation.paymentUrl;
                }
              }}
            >
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
