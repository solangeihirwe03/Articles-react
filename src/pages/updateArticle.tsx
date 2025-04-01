import React, { useState, useEffect } from 'react'
import Container from '../components/styleComponent'
import { useParams, useNavigate } from 'react-router-dom'
import { IArticle } from '../utils/types/article'
import axiosInstance from '../utils/axios/axiosInstance'
import { FormValues } from './createArticle'

const UpdateArticle = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<FormValues | null>({
        title: "",
        description: "",
        image: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<IArticle | null>(null);
    const [newImage, setNewImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axiosInstance.get(`/api/article/user-get-article/${articleId}`)
                setArticle(response.data.data.article)
                setInitialData(response.data.data.article);
                if (response.data.data.article.imageUrl) {
                    setImagePreview(response.data.data.article.imageUrl);
                }
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchArticle();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setArticle((prev) => ({
            ...prev!,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isUpdated =
            article?.title !== initialData?.title ||
            article?.description !== initialData?.description ||
            newImage !== null;

        if (!isUpdated) {
            alert('You must update at least one field (title, description, or image).');
            return;
        }

        const submissionData = new FormData();
        submissionData.append('title', article?.title!);
        submissionData.append('description', article?.description!);

        if (newImage) {
            submissionData.append('imageUrl', newImage);
        }

        try {
            const response = await axiosInstance.put(`/api/article/update-article/${articleId}`, submissionData);
            console.log(response.data.data.updateArticle)
            setArticle(response.data.data.updateArticle)
            setImagePreview(response.data.data.updateArticle.imageUrl || imagePreview);
            alert('Article updated successfully!');
            navigate(`/article/${articleId}`);
        } catch (error) {
            alert('Error updating article');
        }
    };

    return (
        <Container>
            <form
                className=''
                onSubmit={handleUpdate}
            >
                <h1 className="text-2xl font-semibold text-[#1E3A8A] mb-6 text-center">Update Article</h1>
                <div className='bg-white max-w-[70%] mx-auto p-6  rounded-lg shadow-md text-gray-800'>
                    <div className='space-y-6 flex gap-8 items-end justify-center'>
                        <div className='space-y-4 flex flex-col gap-3'>
                            <input
                                type="text"
                                name='title'
                                value={article?.title}
                                onChange={handleChange}
                                placeholder='Title...'
                                className='border-[1.5px] border-[#1E3A8A] w-[20vw] outline-none px-4 h-16 rounded-md'
                            />
                            <textarea
                                name="description"
                                value={article?.description}
                                onChange={handleChange}
                                placeholder="Description..."
                                rows={4}
                                className='border-[1.5px] border-[#1E3A8A] w-[20vw] outline-none h-32 rounded-md focus:outline-none resize-none [&::-webkit-scrollbar]:hidden px-4 py-2'
                            />
                        </div>
                        <div>
                            <div className="relative border-[1.5px] border-[#1E3A8A] border-dashed rounded-lg p-3">
                                {imagePreview ? (
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={imagePreview}
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
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-40 cursor-pointer">
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
                            Update Article
                        </button>
                    </div>
                </div>
            </form>
        </Container>
    )
}

export default UpdateArticle
