"use client";

import React from "react";
import {
  Calendar,
  Clock,
  User,
  FileText,
  PlusCircle,
  ArrowRight,
  Activity,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function PatientPage() {
  // Mock data for initial preview (replace with your React Query / API hooks)
  const patientName = "John Doe";
  const upcomingAppointments = [
    {
      id: "1",
      doctorName: "Dr. Sarah Jenkins",
      specialty: "Cardiologist",
      date: "Today, 3:30 PM",
      type: "In-Person",
      status: "Confirmed",
    },
    {
      id: "2",
      doctorName: "Dr. Alex Rivera",
      specialty: "Dermatologist",
      date: "Oct 12, 10:00 AM",
      type: "Video Call",
      status: "Pending",
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl space-y-8 p-6">
      {/* Hero Welcome Banner */}
      <div className="flex flex-col gap-4 rounded-xl bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {patientName}!
          </h1>
          <p className="text-muted-foreground">
            Manage your appointments, view schedules, and access your health
            records.
          </p>
        </div>
        <Button size="lg" className="gap-2 shrink-0">
          <PlusCircle className="size-4" />
          Book Appointment
        </Button>
      </div>

      {/* Quick Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Appointments
            </CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Next one today at 3:30 PM
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Prescriptions & Reports
            </CardTitle>
            <FileText className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              1 new medical report added
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Account Status
            </CardTitle>
            <Activity className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">Active</div>
            <p className="text-xs text-muted-foreground">
              Profile 100% complete
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content Area: Upcoming Appointments */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Upcoming Schedules
            </h2>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              View all <ArrowRight className="size-3" />
            </Button>
          </div>

          <div className="space-y-3">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appt) => (
                <Card key={appt.id} className="transition-all hover:shadow-sm">
                  <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {appt.doctorName}
                        </h3>
                        <Badge
                          variant={
                            appt.status === "Confirmed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {appt.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {appt.specialty}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3.5" /> {appt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" /> {appt.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center text-muted-foreground">
                No upcoming appointments scheduled.
              </Card>
            )}
          </div>
        </div>

        {/* Sidebar: Navigation Shortcuts & Profile Quick Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Shortcuts to manage your portal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <Link href="/patient/appointments">
                  <Calendar className="size-4" />
                  Manage Appointments
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <Link href="/patient/schedules">
                  <Clock className="size-4" />
                  View Doctor Schedules
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <Link href="/patient/profile">
                  <User className="size-4" />
                  Profile Settings
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Notice Card */}
          <Card className="bg-amber-500/5 border-amber-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-amber-600">
                <AlertCircle className="size-4" /> Pending Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p>You have an unpaid appointment with Dr. Alex Rivera.</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Pay Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
