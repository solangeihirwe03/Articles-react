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
            <div className="flex justify-center items-center w-full md:px-8 mt-16 md:mt-8">
                <div className='w-full xl:w-[70%] rounded-xl bg-white md:h-[60vh] flex gap:4 lg:gap-12 items-center flex-col md:flex-row'>
                    <div className='bg-[#111C3B] h-[40vh] md:h-[60vh] rounded-t-xl md:rounded-l-xl md:rounded-tr-none w-full md:w-1/2 text-white flex items-center justify-center text-5xl font-semibold'>
                        Login in
                    </div>
                    <form className=' w-full md:w-1/2 md:py-12 mt-2 md:px-5' onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col gap-1 mb-4 md:pb-2 px-2'>
                            <label htmlFor="email" className='lg:text-lg'>Your email</label>
                            <input
                                type="email"
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='border-[#1E3A8A] border-[1.5px] px-2 py-2 rounded-lg xl:w-[20vw] outline-none '
                            />
                        </div>
                        <div className='flex flex-col gap-1 pb-4 md:pb-2 px-2'>
                            <label htmlFor="password" className='lg:text-lg'>Your password</label>
                            <input
                                type="password"
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='border-[#1E3A8A] border-[1.5px] px-2 py-2 rounded-lg xl:w-[20vw]'
                            />
                        </div>
                        <button className='cursor-pointer bg-[#1E3A8A] p-2 w-[90vw] md:w-[35vw] xl:w-[20vw] mt-2 rounded-lg text-white text-md mx-2 lg:text-xl lg:w-[37vw]' type='submit' disabled={formik.isSubmitting}>Login</button>
                        <div className='flex gap-2 pl-3 my-3 md:mt-6  lg:text-lg'>
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
