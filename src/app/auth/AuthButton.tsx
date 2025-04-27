import { Button } from '@/components/ui/button'
import React from 'react'

const AuthButton = () => {
  return (
    <div className='flex gap-3 flex-1 md:flex-row flex-col relative z-50'>
        <Button className='w-1/2' variant={'outline'}>
            Sign Up
        </Button>
        <Button className='w-1/2'>Login</Button>
    </div>
  )
}

export default AuthButton