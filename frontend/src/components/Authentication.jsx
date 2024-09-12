import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from '@nextui-org/react';
import axios from 'axios'; // Make sure you import axios
import swal from 'sweetalert'; // Make sure you import swal
import '../styles/auth.css';

export default function Authentication() {
  const [form, setForm] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleForm = (e) => {
    if (e.target.id === 'login') return setForm(true);
    if (e.target.id === 'register') return setForm(false);
  };

  const handleLogin = async (data) => {
    try {
      if (!data.email || !data.password) {
        return swal('Details Required', 'All Details Required', 'error');
      }
      const response = await axios.post('http://localhost:8080/user/login', {
        email: data.email,
        password: data.password,
      });
      if(response.status === 201){
        
        swal('Login Successful', 'Successfully logged In', 'success')

      }
      else return  swal('Error',  'error');
      
    } catch (error) {
      swal('Error', error.message, 'error');
    }

    reset();
  };

  const handleRegister = async (data) => {
    try {
      if (!data.email || !data.password || !data.confirmPassword) {
        return swal('Details Required', 'All Details Required', 'error');
      }
      if (data.password !== data.confirmPassword) {
        return swal('Error', 'Passwords do not match', 'error');
      }
      const response = await axios.post('http://localhost:8080/user/register', {
        email: data.email,
        password: data.password,
      });
      swal('Registered', 'Successfully registered', 'success');
    } catch (error) {
      swal('Error', error.message, 'error');
    }
    reset();
  };

  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className='flex w-1/4 flex-wrap flex-col md:flex-nowrap gap-4 border-1 p-5 rounded-xl justify-center items-center'>
        <div className='flex w-2/3 flex-wrap flex-row gap-4'>
          <p
            className='test-2xl cursor-pointer font-normal hover:border-b-yellow-50 ease-in duration-40'
            id='login'
            style={form ? { borderBottomColor: 'white', paddingBottom: '5px', fontSize: 'large', fontWeight: '800', color: 'purple' } : { border: 'transparent' }}
            onClick={handleForm}
          >
            Login
          </p>
          <p
            className='test-sm cursor-pointer font-normal hover:border-b-yellow-50 ease-in duration-40'
            id='register'
            style={form ? { border: 'transparent' } : { borderBottomColor: 'white', paddingBottom: '5px', fontSize: 'large', fontWeight: '800', color: 'purple' }}
            onClick={handleForm}
          >
            Register
          </p>
        </div>
        {form ? (
          <form
            className='flex w-4/5 flex-wrap flex-col md:flex-nowrap gap-4'
            onSubmit={handleSubmit(handleLogin)}
          >
            <Input
              type='email'
              label='Email'
              {...register('email', { required: 'Email is required' })}
              status={errors.email ? 'error' : ''}
              helperText={errors.email ? errors.email.message : ''}
            />
            <Input
              type='password'
              label='Password'
              {...register('password', { required: 'Password is required' })}
              status={errors.password ? 'error' : ''}
              helperText={errors.password ? errors.password.message : ''}
            />
            <Button type='submit' color='primary'>
              Login
            </Button>
          </form>
        ) : (
          <form
            className='flex w-4/5 flex-wrap flex-col md:flex-nowrap gap-4'
            onSubmit={handleSubmit(handleRegister)}
          >
            <Input
              type='email'
              label='Email'
              {...register('email', { required: 'Email is required' })}
              status={errors.email ? 'error' : ''}
              helperText={errors.email ? errors.email.message : ''}
            />
            <Input
              type='password'
              label='Password'
              {...register('password', { required: 'Password is required' })}
              status={errors.password ? 'error' : ''}
              helperText={errors.password ? errors.password.message : ''}
            />
            <Input
              type='password'
              label='Confirm Password'
              {...register('confirmPassword', { required: 'Please confirm your password' })}
              status={errors.confirmPassword ? 'error' : ''}
              helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
            />
            <Button type='submit' color='primary'>
              Register
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
