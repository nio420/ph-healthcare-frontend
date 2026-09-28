"use client";

import { PublicDoctorParams } from "@/types";
import { Suspense, useState } from "react";
import PublicDoctorListLoading from "./public-doctor-list-loading";
import PublicDoctorGrid from "./public-doctor-grid";

export default function PublicDoctorList() {
  const [page, setPage] = useState(1);

  const queryParams: PublicDoctorParams = {
    page,
    limit: 100,
  };

  return (
    <div>
      <Suspense fallback={<PublicDoctorListLoading />}>
        <PublicDoctorGrid {...queryParams} onPageChange={setPage} />
      </Suspense>
    </div>
  );
}
