import RoleGuard from '@/components/auth/role-guard'
import DashboardShell from '@/components/dashboard/dashboard-shell'
import React, { ReactNode } from 'react'

const patientLayoutPage = ({children}: {children: ReactNode}) => {
  return (
    <RoleGuard roles={["PATIENT"]}>
      <DashboardShell role="PATIENT">
        {children}
      </DashboardShell>
    </RoleGuard>
  )
}

export default patientLayoutPage