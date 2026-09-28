import AuthGuard from '@/components/auth/auth-guard'
import React from 'react'

const layoutDashbordPage = ({children}: {children: React.ReactNode}) => {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  )
}

export default layoutDashbordPage