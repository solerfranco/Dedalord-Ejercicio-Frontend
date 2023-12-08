import React from 'react'
import './IconButton.scss'

type IconButtonProps = {
    type?: "submit" | "reset" | "button" | undefined;
    Icon: React.ElementType;
    onClick?: () => void;
}

export default function IconButton({ type = undefined, Icon, onClick }: IconButtonProps) {
    return (
        <button className='iconButton' type={type} onClick={onClick}><div className='icon'><Icon /></div></button>
    )
}
