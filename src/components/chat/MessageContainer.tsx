import React, { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import MessageBody from './MessageBody'
import ChatBottomInput from './ChatBottomInput'
import { useSelectedUsers } from '@/store/useSelectedUsers'

const MessageContainer = () => {
  const {setSelectedUser} = useSelectedUsers()

  useEffect(() => {
    const escapeKeyHandle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedUser(null)
      }
    }
    document.addEventListener("keydown", escapeKeyHandle)
    return () => {
      document.removeEventListener("keydown", escapeKeyHandle)
    }
  },[setSelectedUser])
  return (
    <div className='flex flex-col justify-between h-full w-full'>
        <ChatHeader/>
        <div className='flex flex-col overflow-y-auto overflow-x-hidden h-full w-full'>
            <MessageBody/>
            <ChatBottomInput/>
        </div>
    </div>
  )
}

export default MessageContainer