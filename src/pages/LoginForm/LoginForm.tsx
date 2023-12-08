import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Checkbox from '../../components/Checkbox/Checkbox'
import './LoginForm.scss'
import { Link, useNavigate } from 'react-router-dom'
import isAuthenticated from '../../apis/authentications'

interface FormData {
  username: string;
  password: string;
  rememberUser: boolean;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [realtimeValidation, setRealtimeValidation] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    rememberUser: false,
  });

  useEffect(() => {
    isAuthenticated().then((auth) => {
      if (auth) {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRealtimeValidation(true);

    if (!validateForm()) return;

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then((data) => {
        localStorage.setItem("auth-token", data.token);
        navigate('/');
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (realtimeValidation) validateForm();

    const { name, value, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked || value,
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
      <form noValidate onSubmit={handleSubmit} className='login-form'>
        <h1>Login</h1>
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
        <Button type='submit'>Login</Button>
        <span>Don't have an account? <Link to='/sign-up'>Sign up</Link></span>
      </form>
    </div>
  )
}

export default LoginForm;
