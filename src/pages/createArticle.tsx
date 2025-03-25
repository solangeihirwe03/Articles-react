import React, { useState } from 'react'
import Container from '../components/styleComponent'
import axiosInstance from '../utils/axios/axiosInstance';

export interface FormValues {
    title: string;
    description: string;
    image: File | null;
}

const CreateArticle = () => {
    const [data, setData] = useState<FormValues>({
        title: "",
        description: "",
        image: null
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
            setData((prev) => ({
                ...prev,
                image: e.target.files![0], // Store file in state
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        console.log('Submitting form...', data);

        if (!data.title || !data.description || !data.image) {
            alert('All fields are required!');
            return;
        }
        const submissionData = new FormData();
        submissionData.append("title", data.title);
        submissionData.append("description", data.description);
        if (data.image) {
            submissionData.append("imageUrl", data.image);
        }else {
            const defaultImage = '/default.png'; 
            submissionData.append('imageUrl', defaultImage);  
        }
        for (let pair of submissionData.entries()) {
            console.log(pair[0], pair[1]); 
        }

        try {
            const response =  await axiosInstance.post(
                "/api/article/create-article",
                submissionData
            );
            console.log("Response:", response.data);
            alert("Article created successfully!");
        } catch (error: any) {
            console.error("Error creating article:", error.message);
            alert("Error creating article");
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input
                            type="text"
                            name='title'
                            value={data.title}
                            onChange={handleChange}
                            placeholder='Title...'
                        />
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            placeholder="Description..."
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            name="imageUrl"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <button type="submit">Create Article</button>
            </form>
        </Container>
    )
}

export default CreateArticle
