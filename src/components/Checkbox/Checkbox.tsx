import React, { ChangeEvent, useState } from 'react';
import './Checkbox.scss';

interface CheckboxProps {
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, onChange, label, id }) => {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    setChecked(!isChecked);
  }

  return (
    <div className='checkbox'>
      <input name={name} type="checkbox" id={id} checked={isChecked} onChange={handleCheckboxChangeEvent} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
