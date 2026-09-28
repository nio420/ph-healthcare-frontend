import { Loader2Icon } from 'lucide-react'
import React from 'react'

const AuthLoading = ({label= "Verifying your account"}: {label?: string}) => {
  return (
    <div className='w-full h-screen gap-2 flex items-center justify-center'>
        <Loader2Icon className='size-6, animate-spin' />
        {label}
    </div>
  )
}

export default AuthLoading