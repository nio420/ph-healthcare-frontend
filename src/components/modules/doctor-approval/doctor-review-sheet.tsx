import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/toast";
import { useApproveDoctor, useGetAllDoctors } from "@/hooks/doctor.hook";
import { DoctorParams } from "@/types";
import { useState } from "react";

interface IProps extends DoctorParams {
  selectedId: string;
  onClose: () => void;
}

const DoctorReviewSheet = ({ selectedId, onClose, ...params }: IProps) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [confirmRejection, setConfirmRejection] = useState(false);
  const { data } = useGetAllDoctors(params);
  const selectedDoctor = data?.data?.find((doctor) => doctor.id === selectedId);

  const { mutate: verify, isPending } = useApproveDoctor(params);

  const handleClose = () => {
    setConfirmRejection(false);
    setRejectionReason("");
    onClose();
  };

  const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    const reviewData = {
      doctorId: selectedId,
      verificationStatus: status,
      rejectionReason: rejectionReason,
    };
    verify(reviewData, {
      onSuccess: () => {
        toast.add({
          title: "Review Successful",
          description: "You are now logged out",
          type: "success",
        });
        handleClose();
      },
      onError: (err) => {
        console.error("Review error:", err);
        toast.add({
          title: "Review Failed",
          description: "Please try again",
          type: "error",
        });
      },
    });
    handleClose();
  };

  return (
    <div>
      <Sheet open={!!selectedId} onOpenChange={handleClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Preview and Take Action</SheetTitle>
            <SheetDescription>This action cannot be undone.</SheetDescription>
          </SheetHeader>
          Doctor Name : {selectedDoctor?.name}
          Doctor Email : {selectedDoctor?.email}
          Doctor Specializations : {selectedDoctor?.specializations}
          Doctor License Number : {selectedDoctor?.licenseNumber}
          Doctor Qualification : {selectedDoctor?.qualification}
          Doctor Experience : {selectedDoctor?.experience}
          Doctor Contact Number : {selectedDoctor?.contactNumber}
          <SheetFooter>
            {confirmRejection ? (
              <div>
                <textarea
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
                <Button onClick={handleClose} variant="outline">
                  Cancel
                </Button>
                <Button
                  disabled={!rejectionReason}
                  onClick={() => handleReviewAction("REJECTED")}
                  variant="destructive"
                >
                  Confirm Rejection
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={() => setConfirmRejection(true)}
                  variant="destructive"
                  className="flex-1"
                >
                  Reject
                </Button>
                <Button
                  onClick={() => handleReviewAction("APPROVED")}
                  variant="default"
                  className="flex-1"
                >
                  Approve
                </Button>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DoctorReviewSheet;
