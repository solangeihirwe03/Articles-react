import React, { useEffect, useState } from 'react'
import Container from '../components/styleComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { IArticle } from '../utils/types/article';
import axiosInstance from '../utils/axios/axiosInstance';
import { Link } from 'react-router-dom';
import edit from "/edit.svg";
import remove from "/Remove.svg"


const ArticleDetail = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState<IArticle | null>(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axiosInstance.get(`/api/article/user-get-article/${articleId}`)
                setArticle(response.data.data.article)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchArticle();
    }, [])
    
    const handleDelete = async () => {
        if (!article) return;

        setArticle(null);

        try {
            await axiosInstance.delete(`/api/article/delete-article/${articleId}`);
            navigate('/');
        } catch (err: any) {
            setArticle(article);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <Container>
            <div className=''>
                <h1>{article?.title}</h1>
                <div>
                    <Link to={`/update-article/${article?.id}`}>
                        <img src={edit} alt="update" />
                    </Link>
                    <button onClick={handleDelete}>
                        <img src={remove} alt="delete" />
                    </button>
                </div>

                <img src={article?.imageUrl} alt={article?.title} />
                <p>{article?.description}</p>
            </div>
        </Container>
    )
}

export default ArticleDetail
