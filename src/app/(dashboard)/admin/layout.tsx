import RoleGuard from '@/components/auth/role-guard'
import DashboardShell from '@/components/dashboard/dashboard-shell'
import React, { ReactNode } from 'react'

const adminLayoutPage = ({children}: {children: ReactNode}) => {
  return (
    <RoleGuard roles={['ADMIN', 'SUPER_ADMIN']}>
      <DashboardShell role="ADMIN">
        {children}
      </DashboardShell>
    </RoleGuard>
  )
}

export default adminLayoutPage