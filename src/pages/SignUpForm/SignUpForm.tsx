import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import './SignUpForm.scss'
import { Link, useNavigate } from 'react-router-dom'

interface FormData {
  username: string;
  password: string;
  rememberUser: boolean;
}

const SignUpForm: React.FC = () => {
  const [realtimeValidation, setRealtimeValidation] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    rememberUser: false,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRealtimeValidation(true);

    if (!validateForm()) return;

    addUser(formData);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (realtimeValidation) validateForm();

    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const addUser = (formData: FormData) => {
    const { username, password } = formData;
    const newUser = {
      username: username,
      password: password,
    };

    fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then((data) => {
        localStorage.setItem("auth-token", data.token);
        navigate('/');
      });
  };

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Username validation
    const usernamePattern = /^[a-zA-Z0-9]+$/;

    if (!usernamePattern.test(formData.username)) {
      newErrors.username = 'Username must contain only letters and numbers';
      isValid = false;
    } else {
      newErrors.username = '';
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='sign-up-form'>
        <h1>Sign Up</h1>
        <div className='input-container'>
          <div>
            <Input name='username' placeholder='Username' type='text' onChange={handleInputChange} />
            <span className='error'>{errors.username}</span>
          </div>
          <div>
            <Input name='password' placeholder='Password' type='password' onChange={handleInputChange} />
            <span className='error'>{errors.password}</span>
          </div>
        </div>
        <Button type='submit'>Sign Up</Button>
        <span>Already have an account? <Link to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default SignUpForm;
