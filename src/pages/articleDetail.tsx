import React, { useEffect, useState } from 'react'
import Container from '../components/styleComponent'
import { useParams } from 'react-router-dom'
import { IArticle } from '../utils/types/article';
import axiosInstance from '../utils/axios/axiosInstance';

const ArticleDetail = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState<IArticle | null>(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                console.log(articleId)
                const response = await axiosInstance.get(`/api/article/user-get-article/${articleId}`)
                console.log(">>>>>>>>>>>>>>", response.data.data.article)

                setArticle(response.data.data.article)
                console.log(typeof article)
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
                <img src={article?.imageUrl} alt={article?.title} />
                <p>{article?.description}</p>
            </div>
        </Container>
    )
}

export default ArticleDetail
