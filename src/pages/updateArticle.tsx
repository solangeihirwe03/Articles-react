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
        } else {
            submissionData.append('imageUrl', article?.image!);
        }

        try {
            const response = await axiosInstance.put(`/api/article/update-article/${articleId}`, submissionData);
            setArticle(response.data.data.updateArticle)
            setImagePreview(response.data.data.updateArticle.imageUrl)
            console.log('Article updated:', response.data);
            alert('Article updated successfully!');
            navigate(`/article/${articleId}`);
        } catch (error) {
            console.error('Error updating article:', error);
            alert('Error updating article');
        }
    };

    return (
        <Container>
            <form onSubmit={handleUpdate}>
                <div>
                    <div>
                        <input
                            type="text"
                            name='title'
                            value={article?.title}
                            onChange={handleChange}
                            placeholder='Title...'
                        />
                        <textarea
                            name="description"
                            value={article?.description}
                            onChange={handleChange}
                            placeholder="Description..."
                        />
                    </div>
                    <div>
                    {imagePreview&& (
                            <div>
                                <img src={imagePreview} alt="Current Article Image" width={100} />
                                <p>Current image</p>
                            </div>
                        )}
                        <input
                            type="file"
                            name="imageUrl"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <button type="submit">Update Article</button>
            </form>
        </Container>
    )
}

export default UpdateArticle
