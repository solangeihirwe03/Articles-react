import React, { useEffect, useState } from 'react'
import Container from '../components/styleComponent'
import { useParams } from 'react-router-dom'
import { IArticle } from '../utils/types/article';
import axiosInstance from '../utils/axios/axiosInstance';
import { Link } from 'react-router-dom';
import edit from "/edit.svg"

const ArticleDetail = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState<IArticle | null>(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <Container>            
            <div className=''>
                <h1>{article?.title}</h1>
                <Link to={`/update-article/${article?.id}`}>
                <img src={edit} alt="update" />
                </Link>
                <img src={article?.imageUrl} alt={article?.title} />
                <p>{article?.description}</p>
            </div>
        </Container>
    )
}

export default ArticleDetail
