import React, { useState } from 'react'
import Container from '../components/styleComponent'
import axiosInstance from '../utils/axios/axiosInstance';
import image from "/default.jpg"

export interface FormValues {
    title: string;
    description: string;
    image: File | null;
    imagePreview?: string;
}

const CreateArticle = () => {
    const [data, setData] = useState<FormValues>({
        title: "",
        description: "",
        image: null,
        imagePreview: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setData((prev) => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const urlToFile = async (url: string, filename: string, mimeType: string) => {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        return new File([buffer], filename, { type: mimeType });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!data.title || !data.description || !data.image) {
            alert('All fields are required!');
            return;
        }
        const submissionData = new FormData();
        submissionData.append("title", data.title);
        submissionData.append("description", data.description);
        let imageToSend = data.image;

        // If no image selected, use default image
        if (!imageToSend) {
            // Convert the imported default image to a File object
            imageToSend = await urlToFile(
                image,
                'default-article-image.png',
                'image/png'
            );
            // Set preview for visual feedback
            setData(prev => ({
                ...prev,
                imagePreview: image
            }));
        }


        try {
            await axiosInstance.post(
                "/api/article/create-article",
                submissionData
            );
            alert("Article created successfully!");
        } catch (error: any) {
            alert("Error creating article");
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <h1 className='text-2xl font-semibold text-[#1E3A8A] mb-6 text-center'>Create article</h1>
                <div className='bg-white max-w-[70%] mx-auto p-6  rounded-lg shadow-md text-gray-900'>
                    <div className='space-y-6 flex gap-8 items-end justify-center'>
                        <div className='space-y-4 flex flex-col gap-3'>
                            <input
                                type="text"
                                name='title'
                                value={data.title}
                                onChange={handleChange}
                                placeholder='Title...'
                                className='border-[1.5px] border-[#1E3A8A] w-[20vw] outline-none px-4 h-16 rounded-md'
                            />
                            <textarea
                                name="description"
                                value={data.description}
                                onChange={handleChange}
                                placeholder="Description..."
                                rows={4}
                                className='border-[1.5px] border-[#1E3A8A] w-[20vw] outline-none h-32 rounded-md focus:outline-none resize-none [&::-webkit-scrollbar]:hidden px-4 py-2'
                            />
                        </div>
                        <div>
                            <div className="relative border-2 border-gray-300 border-dashed rounded-lg p-4">
                                {data.imagePreview ? (
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={data.imagePreview}
                                            alt="Article preview"
                                            className="h-40 object-contain rounded-md mb-2"
                                        />
                                        <label className="cursor-pointer text-blue-600 hover:text-blue-800">
                                            Change Image
                                            <input
                                                type="file"
                                                name="imageUrl"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                accept="image/*"
                                                required
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-32 cursor-pointer">
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input
                                            type="file"
                                            name="imageUrl"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept="image/*"
                                            required
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#1E3A8A] text-white font-medium rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 my-3"
                        >
                            Create Article
                        </button>
                    </div>
                </div>
            </form>
        </Container>
    )
}

export default CreateArticle
