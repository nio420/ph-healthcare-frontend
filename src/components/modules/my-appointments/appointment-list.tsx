"use client";
import { Button } from "@/components/ui/button";
import { useGetMyAppointments } from "@/hooks";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// 1. Define the TypeScript interfaces
interface Doctor {
  name: string;
}

interface Appointment {
  id: string | number;
  doctor: Doctor;
  status: string;
}

export default function AppointmentList() {
  const params = useSearchParams();
  const status = params.get("status");
  const { data } = useGetMyAppointments({ page: 1, limit: 100 });

  const appointments: Appointment[] = data?.data || [];

  if (status === "failure") {
    return (
      <div>
        <div>
          <h1>Payment Failed</h1>
          <p>Please check your vendor</p>
          <Link href="/patient/my-appointments">Go back to appointments</Link>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div>
        <div>
          <h1>Payment Successful</h1>
          <p>Please be prepared to join the video call</p>
          <Link href="/patient/my-appointments">Go back to appointments</Link>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return <p>There is not appointment</p>;
  }

  return (
    <div>
      {/* 2. Annotate the destructured object with the Appointment type */}
      {appointments.map(({ doctor, status, id }: Appointment) => (
        <div key={id} className="border rounded-md p-3">
          <div className="w-full flex gap-3">
            <span>Doctor: {doctor.name}</span>
            <span>Status: {status}</span>
            <div className="ml-auto">
              <Button>Join</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
