import React, { useState } from 'react'
import Container from '../components/styleComponent'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axiosInstance from '../utils/axios/axiosInstance'
import { IUser } from '../utils/types/user'

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
    const formik = useFormik<IUser>({
        initialValues: {
            email: "",
            password: ""
        }, validationSchema: Yup.object({
            email: Yup.string().email("invalid email address").required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                await axiosInstance.post("/api/user/register", values);
                setStatus({ success: true });
            } catch (err: any) {
                setStatus({ success: false, err: err.message });
            } finally {
                setSubmitting(false)
                navigate("/login")
            }
        }
    });

    return (
        <Container>
            <div className="flex justify-center items-center w-full mt-16">
                <div className='w-[70%] rounded-xl h-[60vh] flex gap-12 bg-white items-center'>
                    <div className='bg-[#111C3B] h-[60vh] rounded-l-xl w-1/2 text-white flex items-center justify-center text-5xl font-semibold'>
                        Sign up
                    </div>
                    <form className=' py-12 w-1/2' onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col gap-1 pb-2 '>
                            <label htmlFor="email">Your email</label>
                            <input
                                type="email"
                                name='email'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className='border-[#1E3A8A] border-[1.5px] px-2 py-2 outline-none rounded-lg w-[20vw]'
                            />
                            {touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className='flex flex-col gap-1 pb-2'>
                            <label htmlFor="password">Your password</label>
                            <input
                                type="password"
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='border-[#1E3A8A] border-[1.5px] px-2 py-2 outline-none rounded-lg w-[20vw]'
                            />
                            {touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <button
                            type='submit'
                            className='cursor-pointer bg-[#1E3A8A] p-2 w-[20vw] rounded-lg text-white text-md mt-2'
                        >
                            Sign up
                        </button>
                        {formik.status && formik.status.error && (
                            <div className="error">{formik.status.error}</div>
                        )}
                        <div className='flex gap-1 mt-3 pl-3'>
                            <p>already have account</p>
                            <Link to="/login" className='hover:underline hover:text-blue-600'>Sign in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default Signup
