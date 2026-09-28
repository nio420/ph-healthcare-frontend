"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import { useSuspenseGetAllDoctors } from "@/hooks/doctor.hook";
import { DoctorParams } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface IProps extends DoctorParams {
  handleReview: (id: string) => void;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

const DoctorApprovalTable = ({ handleReview, handlePageChange , ...params }: IProps) => {
  const { data } = useSuspenseGetAllDoctors(params);
  const doctors = data?.data || [];

  return (
    <>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>License Number</TableHead>
              <TableHead>Specializations</TableHead>
              <TableHead>Qualification</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {doctors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No doctors found for approval.
                </TableCell>
              </TableRow>
            ) : (
              doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.licenseNumber}</TableCell>
                  <TableCell>{doctor.specializations}</TableCell>
                  <TableCell>{doctor.qualification}</TableCell>
                  <TableCell>{doctor.experience} yrs</TableCell>
                  <TableCell>{doctor.contactNumber || "-"}</TableCell>
                  <TableCell className="text-right">
                    {doctor.user?.emailVerified ? (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={doctor.verificationStatus !== "PENDING"}
                        onClick={() => handleReview(doctor.id)}
                      >
                        Review
                      </Button>
                    ) : (
                      <Button disabled variant="outline" size="sm">
                        Not Verified
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center">
        <TablePagination
         totalPages={data?.meta?.totalPages ?? 1}
          
          handlePageChange={handlePageChange}
         page={params.page ?? 1}
          
         />
      </div>
    </>
  );
};

export default DoctorApprovalTable;

