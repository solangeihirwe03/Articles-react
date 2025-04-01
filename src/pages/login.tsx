import React from 'react'
import Container from '../components/styleComponent'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axiosInstance from '../utils/axios/axiosInstance'
import { useAuth } from '../utils/context/authContext'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (value, { setSubmitting, setStatus }) => {
            try {
                const response = await axiosInstance.post("/api/user/login", value);
                const token = response.data.data.token;
                login(token);

                const from = location.state?.from?.pathname
                navigate(from, { replace: true })
            } catch (error: any) {
                setStatus({ success: false, error: error.message });
            } finally {
                setSubmitting(false);
            }
        }
    })
    return (
        <Container>
            <div className="flex justify-center items-center w-full mt-16">
                <div className='w-[70%] rounded-xl bg-white h-[60vh] flex gap-12 items-center'>
                    <div className='bg-[#111C3B] h-[60vh] rounded-l-xl w-1/2 text-white flex items-center justify-center text-5xl font-semibold'>
                        Login in
                    </div>
                    <form className='w-1/2 py-12' onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col gap-1 pb-2'>
                            <label htmlFor="email">Your email</label>
                            <input
                                type="email"
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='border-[#1E3A8A] border-[1.5px] px-2 py-2 rounded-lg w-[20vw] outline-none'
                            />
                        </div>
                        <div className='flex flex-col gap-1 pb-2'>
                            <label htmlFor="password">Your password</label>
                            <input
                                type="password"
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='border-[#1E3A8A] border-[1.5px] px-2 py-2 rounded-lg w-[20vw]'
                            />
                        </div>
                        <button className='cursor-pointer bg-[#1E3A8A] p-2 w-[20vw] mt-2 rounded-lg text-white text-md' type='submit' disabled={formik.isSubmitting}>Login</button>
                        <div className='flex gap-2 pl-3 mt-3'>
                            <p>don't have account?</p>
                            <Link to="/signup" className='hover:underline hover:text-blue-600'>Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default Login
