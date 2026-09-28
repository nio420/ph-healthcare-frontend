import RoleGuard from '@/components/auth/role-guard'
import DashboardShell from '@/components/dashboard/dashboard-shell'
import React, { ReactNode } from 'react'

const doctorLayoutPage = ({children}: {children: ReactNode}) => {
  return (
    <RoleGuard roles={["DOCTOR"]}>
      <DashboardShell role="DOCTOR">
        {children}
      </DashboardShell>
    </RoleGuard>
  )
}

export default doctorLayoutPage