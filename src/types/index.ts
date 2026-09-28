export type UserRole = "SUPER_ADMIN" | "ADMIN" | "PATIENT" | "DOCTOR";
export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";
export type DoctorVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type LoginPayload = {
  email: string;
  password: string;
};

export type verifyAccountPayload = {
  email: string;
  otp: string;
};

export type GoogleLoginPayload = {
  idToken: string;
};

export type RegistrationPayload = {
  name: string;
  email: string;
  password: string;
  patient: {
    contactNumber?: string;
  };
};

export interface DoctorApplicationData {
  user: {
    name: string;
    email: string;
  };
  doctor: {
    name: string;
    email: string;
    specializations: string;
    licenseNumber: string;
    qualification: string;
    experience: number;
    contactNumber: string;
    address: string;
    consultationFee: number;
    bio: string;
  };
  resume: File | null;
  additionalFiles?: File[];
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  address?: string | null;
  specializations: string;
  licenseNumber: string;
  qualification: string;
  experience: number;
  bio?: string | null;
  consultationFee?: number | string | null;
  contactNumber?: string | null;
  verificationStatus: DoctorVerificationStatus;
  rejectionReason?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  resume?: string | null;
  additionalFiles?: { url: string; publicId: string }[] | null;
  isDeleted: boolean;
  deletedAt?: null | string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
}

export interface DoctorParams {
  verificationStatus?: DoctorVerificationStatus;
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "desc" | "asc";
}

export interface DoctorApplicationPayload {
  resume: File;
  additionalFiles: File[];
  data: DoctorApplicationData;
}

export interface ApproveDoctorPayload {
  doctorId: string;
  verificationStatus: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}

export interface PublicDoctorProfile {
  id: string;
  name: string;
  specializations: string;
  licenseNumber: string;
  qualifications: string;
  experienceYears: number;
  bio?: string | null;
  consultationFee?: number | string | null;
  createdAt: string;
}

export interface PublicDoctorParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  specialization?: string;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}

export interface SidebarItem {
  title: string;
  url: string;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export type SidebarItems = SidebarGroup[];

export interface User {
  id: string;
  name: string;
  email: string;
  googleId: null | string;
  authProvider: string;
  emailVerified: boolean;
  role: UserRole;
  status: UserStatus;
  needPasswordChange: boolean;
  imageUrl: null | string;
  imagePublicId: null | string;
  isDeleted: boolean;
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta: Meta;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Doctor Schedules

export type ScheduleStatus = "DRAFT" | "PUBLISHED";

export interface Schedule {
  id: string;
  startDateTime: string;
  endDateTime: string;
  totalSlots: number;
  availableSlots: number;
  meetingLink: string;
  status: ScheduleStatus;
  doctorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSchedulePayload {
  startDateTime: string;
  endDateTime: string;
  meetingLink: string;
}

export interface ScheduleParams {
  status?: ScheduleStatus;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}

// Appointment
export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "ONGOING"
  | "COMPLETED";

export type PaymentStatus =
  | "UNPAID"
  | "PAID"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export interface Payment {
  id: string;
  status: PaymentStatus;
  amount: number | string;
  currency: string;
  bkashPaymentId?: string | null;
  bkashTrxId?: string | null;
  payerReference?: string | null;
  paidAt?: string | null;
  refundTrxId?: string | null;
  refundAmount?: number | string | null;
  refundReason?: string | null;
  refundedAt?: string | null;
  appointmentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentDoctor {
  id: string;
  name: string;
  specialization: string;
  email?: string;
  userId?: string;
}

export interface AppointmentPatient {
  id: string;
  name: string;
  email: string;
  contactNumber?: string | null;
  userId?: string;
}

export interface Appointment {
  id: string;
  status: AppointmentStatus;
  joiningTime?: string | null;
  serialNumber?: number | null;
  recordUrl?: string | null;
  prescriptionUrl?: string | null;
  patientId: string;
  doctorId: string;
  scheduleId: string;
  createdAt: string;
  updatedAt: string;
  patient?: AppointmentPatient;
  doctor?: AppointmentDoctor;
  schedule?: Schedule;
  payment?: Payment | null;
}

export interface AppointmentParams {
  status?: AppointmentStatus;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}

export interface BookAppointmentPayload {
  scheduleId: string;
}

export interface PayAppointmentPayload {
  appointmentId: string;
}

export interface CancelAppointmentPayload {
  appointmentId: string;
}

export interface BookAppointmentResponse {
  paymentUrl: string;
}