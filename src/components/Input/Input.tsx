import React, { ChangeEvent } from 'react'
import './Input.scss'

interface InputProps {
  name?: string;
  type: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minlenght?: number;
  pattern?: string;
  onSubmit?: () => void;
  value?: string;
}

const Input: React.FC<InputProps> = ({ name = undefined, type, placeholder, required, minlenght = undefined, pattern = undefined, onChange, onSubmit, value }) => {

  const handleEnterPress = (key: string) => {
    if (key === "Enter") {
      onSubmit?.();
    }
  };

  return (
    <input value={value} required={required} onKeyDown={(e) => handleEnterPress(e.key)} minLength={minlenght} pattern={pattern} name={name} type={type} placeholder={placeholder} onChange={onChange} />
  )
}

export default Input;