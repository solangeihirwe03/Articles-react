import { useEffect, useState } from 'react'
import Container from '../components/styleComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { IArticle, IComment } from '../utils/types/article';
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

    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axiosInstance.get(`/api/article/user-get-article/${articleId}`)
                setArticle(response.data.data.article)
                setComments(response.data.data.article.comments || []);
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
            <div className='flex justify-center flex-col items-center mt-20 md:mt-5'>
                <h1 className='font-inknut text-lg font-semibold'>{article?.title}</h1>
                <div className='flex justify-end w-full mb-6'>
                    <Link to={`/update-article/${article?.id}`}>
                        <img src={edit} alt="update" className='w-10' />
                    </Link>
                    <button onClick={handleDelete}>
                        <img src={remove} alt="delete" className='w-10' />
                    </button>
                </div>

                <div className='flex gap-5 md:gap-10 items-center justify-center flex-col md:flex-row mb-3'>
                    <img src={article?.imageUrl} alt={article?.title} className='md:w-[40%] h-[45vh] md:h-[30vh] lg:h-[40vh] xl:h-[65vh]' />
                    <p className='lg:w-[40%]'>{article?.description}</p>
                </div>
            </div>
            <div className="flex justify-center flex-col lg:pl-16 xl:pl-24">
                <h2 className="text-lg font-semibold">Comments</h2>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="border-b py-2">
                            <p>{comment.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </Container>
    )
}

export default ArticleDetail
