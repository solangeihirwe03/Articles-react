import Container from "../components/styleComponent"
import { ImLocation2 } from "react-icons/im";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup"
import axiosInstance from "../utils/axios/axiosInstance";
import Popup from "../components/popUp";
import { useState } from "react";

export interface MessageValues {
    username: string;
    email: string;
    message: string;
}

const ContactUs = () => {
    const [popup, setPopup] = useState<{
        show: boolean;
        type: 'success' | 'error';
        message: string;
    } | null>(null);
    const formik = useFormik<MessageValues>({
        initialValues: {
            username: "",
            email: "",
            message: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required("Required")
                .min(3, "Minimum 3 characters"),
            email: Yup.string()
                .email("Invalid email")
                .required("Required"),
            message: Yup.string()
                .required("Required")
                .min(10, "Minimum 4 characters")
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await axiosInstance.post('/api/messages/send-message', values);
                setPopup({
                    show: true,
                    type: 'success',
                    message: 'Message sent successfully!'
                });
                resetForm();
            } catch (error) {
                setPopup({
                    show: true,
                    type: 'error',
                    message: 'Failed to send message'
                });
            }
        }
    });
    const email = 'solangeihirwe@gmail.com';
    const subject = `Contact Request from ${formik.values.username || 'User'}`;
    const defaultBody = 'I would like to inquire about...'
    return (
        <Container>
            {popup && (
                <Popup
                    type={popup.type}
                    message={popup.message}
                    onClose={() => setPopup(null)}
                />
            )}
            <div className="flex justify-between md:w-[67vw] md:mx-28 gap-3 lg:mx-40 px-16 mt-20 md:mt-9 bg-gray-300 py-8 rounded-full font-inknut ">
                <div className="flex items-center flex-col">
                    <div className="p-4 md:p-7 rounded-full bg-[#1E3A8A]">
                        <ImLocation2 color="white" className="text-xl"/>
                    </div>
                    <h2 className="block font-semibold text-sm">KN 72 rd</h2>
                </div>
                <a 
                href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(defaultBody)}`}
                className="flex items-center flex-col"
                >
                    <div className="p-4 md:p-7 rounded-full bg-[#1E3A8A]">
                        <MdMarkEmailUnread color="white" className="text-xl"/>
                    </div>
                    <h2 className="hidden md:block">{email}</h2>
                </a>
                <div className="flex items-center flex-col">
                    <div className="p-4 md:p-7 rounded-full bg-[#1E3A8A]">
                        <FaPhoneAlt color="white" className="text-xl"/>
                    </div>
                    <h2 className="block font-semibold text-sm">+250787113254</h2>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit} className="w-full flex mt-10 items-center justify-center ">
                <div className="bg-white flex flex-col items-center justify-center shadow-lg p-10 rounded-2xl lg:w-[75%]">
                    <h1 className="text-3xl font-semibold pb-2">Contact Us</h1>
                    <p className="text-lg pb-2">Any questions or remarks? Just write us message!</p>
                    <div className="flex md:gap-10 mb-3 flex-col lg:flex-row">
                        <div className="">
                            <label
                                htmlFor="email"
                                className="block mb-1 ml-1 font-semibold"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className="border-none outline-none lg:w-[15vw] py-1.5 px-4 rounded-3xl bg-gray-200"
                                placeholder="enter valid email..."
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-1 ml-1 font-semibold"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                className="border-none outline-none lg:w-[15vw] py-1.5 px-4 rounded-3xl bg-gray-200"
                                placeholder="enter username..."
                            />
                            {formik.touched.username && formik.errors.username && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
                            )}
                        </div>
                    </div>
                    <div >
                        <label
                            htmlFor="message"
                            className="block mb-2 ml-1 font-semibold"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.message}
                            placeholder="send message"
                            rows={4}
                            className="border-none outline-none w-[78vw] md:w-[34vw] py-1.5 px-4 rounded-3xl bg-gray-200 [&::-webkit-scrollbar]:hidden"
                        />
                        {formik.touched.message && formik.errors.message && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full md:w-[34vw] py-1.5 px-4 bg-[#1E3A8A] text-white text-lg rounded-2xl my-3"
                    >
                        {formik.isSubmitting ? "Sending..." : "Submit"}
                    </button>
                </div>
            </form>
        </Container>
    )
}

export default ContactUs
