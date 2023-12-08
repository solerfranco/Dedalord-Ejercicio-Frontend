import React from 'react'
import Textarea from '../../Textarea/Textarea'
import IconButton from '../../IconButton/IconButton'
import SendIcon from '../../Icons/SendIcon'
import './MessageBox.scss'

interface MessageBoxProps {
    value: string;
    onChange: (arg0: string) => void;
    onSubmit: () => void;
}

export const MessageBox: React.FC<MessageBoxProps> = ({ value, onChange, onSubmit }) => {
    return (
        <div className='message-box-container'>
            <Textarea placeholder='Write a message' onChange={onChange} inputField={value} onSubmit={onSubmit} />
            <IconButton onClick={onSubmit} Icon={SendIcon} />
        </div>
    )
}
