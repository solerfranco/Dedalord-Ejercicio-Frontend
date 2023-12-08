import React from 'react'
import { formatTime } from '../../../utils/utils'
import './MessageBubble.scss'

interface MessageBubbleProps {
    id: string;
    sender: string;
    message: string;
    timeSent: Date;
    isSameSender: boolean;
    contactName: string;
    contactId: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, message, timeSent, isSameSender, contactId, contactName, id }) => {
    return (
        <div className={sender !== contactId ? 'sent' : 'received'} key={id}>
            {!isSameSender &&
                <div className='info'>
                    {sender !== contactId ? 'You' : contactName}
                    <span>
                        {formatTime(timeSent)}
                    </span>
                </div>
            }
            <div className={`bubble ${isSameSender ? '' : 'tail'}`}>
                {message}
            </div>
        </div>
    )
}
