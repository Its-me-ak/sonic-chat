import React from 'react'
import ChatHeader from './ChatHeader'
import MessageBody from './MessageBody'
import ChatBottomInput from './ChatBottomInput'

const MessageContainer = () => {
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