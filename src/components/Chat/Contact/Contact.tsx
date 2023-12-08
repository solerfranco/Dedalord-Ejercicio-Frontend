import React from 'react'
import './Contact.scss'
import ProfileIcon from '../../Icons/ProfileIcon'

interface ContactProps {
    id: string;
    selected: boolean;
    contactName: string;
    lastMessage: string;
    contactId: string;
    onClick: () => void;
}

export const Contact: React.FC<ContactProps> = ({ id, selected, contactName, lastMessage, contactId, onClick }) => {
    return (
        <li className={selected ? 'selected' : ''} key={id} onClick={onClick}>
            <ProfileIcon fill="dimgray" width="64px" height="64px" />
            <div className='details'>
                <span className='username'>{contactName}</span>
                <span className='message'>{lastMessage}</span>
            </div>
        </li>
    )
}
