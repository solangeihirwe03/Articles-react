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
                const response = await axiosInstance.post("/api/user/register", values);
                console.log("register successfully: ", response.data)
                setStatus({ success: true });
            } catch (err: any) {
                setStatus({ success: false, err: err.message });
            } finally {
                setSubmitting(false)
                navigate("/login")
            }
        }
    });

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     formik.setFieldError(name, value)
    // }

    // const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    //     const { name } = e.target
    //     setTouched({ ...touched, [name]: true })
    //     formik.setFieldTouched(name, true)
    // }
    return (
        <Container>
            <div className='w-full rounded-xl bg-white h-[60vh] flex gap-12'>
                <div className='bg-[#111C3B] h-[60vh] rounded-l-xl w-1/3 text-white'>
                    Sign up
                </div>
                <form className=' py-12' onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email">Your email</label>
                        <input
                            type="email"
                            name='email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className='border-[#1E3A8A] border-[1.5px] px-2 py-2 outline-none'
                        />
                        {touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password">Your password</label>
                        <input
                            type="password"
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='border-[#1E3A8A] border-[1.5px] px-2 py-2 outline-none'
                        />
                        {touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <button
                        type='submit'
                        className='cursor-pointer bg-[#1E3A8A] p-2'
                    >
                        Sign up
                    </button>
                    {formik.status && formik.status.error && (
                        <div className="error">{formik.status.error}</div>
                    )}
                    <div className='flex gap-1 '>
                        <p>already have account</p>
                        <Link to="/login">Sign in</Link>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Signup
