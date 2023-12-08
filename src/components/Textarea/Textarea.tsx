import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './Textarea.scss'

interface TextareaProps {
  placeholder: string;
  inputField?: string;
  onChange: (arg0: string) => void;
  onSubmit?: () => void;
}

const Textarea: React.FC<TextareaProps> = ({ placeholder, inputField, onChange, onSubmit }) => {
  const [value, setValue] = useState<string>('');
  const [rows, setRows] = useState<number>(1);

  useEffect(() => {
    // Calculate the number of lines based on the content
    const lines = value.split('\n').length;

    // Set the rows state based on the number of lines
    setRows(lines);
  }, [value]);

  useEffect(() => {
    setValue(inputField || '');
  }, [inputField]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
    setValue(event.target.value);
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const textAreaReference = textAreaRef.current;
    const submitOnEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        if (!event.repeat) {
          onSubmit?.();
        }
        setValue('');
        onChange('');

        event.preventDefault(); // Prevents the addition of a new line in the text field
      }
    }

    textAreaReference?.addEventListener('keydown', submitOnEnter);
    return () => {
      textAreaReference?.removeEventListener('keydown', submitOnEnter);
    };
  }, [textAreaRef, onSubmit, onChange]);

  return (
    <textarea ref={textAreaRef} value={value} rows={rows} placeholder={placeholder} onChange={handleChange} onSubmit={onSubmit} aria-label={placeholder} />
  )
}

export default Textarea;