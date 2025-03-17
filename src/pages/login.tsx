import React from 'react'
import Container from '../components/styleComponent'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axiosInstance from '../utils/axios/axiosInstance'
import localStorageUtil from '../utils/localStorage'
import { useAuth } from '../utils/context/authContext'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Login:React.FC= () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {login} = useAuth();
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
                navigate(from, {replace: true})
            } catch (error: any) {
                setStatus({ success: false, error: error.message });
            } finally {
                setSubmitting(false);
            }
        }
    })
    return (
        <Container>
            <div className='w-full rounded-xl bg-white h-[60vh] flex gap-12'>
                <div className='bg-[#111C3B] h-[60vh] rounded-l-xl w-1/3'>
                    Login in
                </div>
                <form className=' py-12' onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email">Your email</label>
                        <input
                            type="email"
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='border-[#1E3A8A] border-[1.5px] px-2 py-2'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password">Your password</label>
                        <input
                            type="password"
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='border-[#1E3A8A] border-[1.5px] px-2 py-2'
                        />
                    </div>
                    <button className='cursor-pointer bg-[#1E3A8A] p-2' type='submit' disabled={formik.isSubmitting}>Login</button>
                    <div>
                        <p>don't have account</p>
                        <Link to="/signup">Sign up</Link>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Login
