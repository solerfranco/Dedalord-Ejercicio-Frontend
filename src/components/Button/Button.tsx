import React from 'react'
import './Button.scss'

type ButtonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ type = undefined, children, onClick }: ButtonProps) {
  return (
    <button className='button' type={type} onClick={onClick}>{children}</button>
  )
}
