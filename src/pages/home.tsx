import React, { useEffect, useState } from 'react'
import Container from '../components/styleComponent'
import { IArticle } from '../utils/types/article';
import axiosInstance from '../utils/axios/axiosInstance';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from "react-spinners";
import Popup from '../components/popUp';
import { MdSend, MdClose } from "react-icons/md";

const Home = () => {

    const [articles, setArticles] = useState<IArticle[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    const [popupType, setPopupType] = useState<"success" | "error" | null>(null);

    const [comments, setComments] = useState<{ [key: string]: string }>({});
    const [commentVisible, setCommentVisible] = useState<{ [key: string]: boolean }>({});
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get("/api/article/all-articles");
                setArticles(response.data.data.articles)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        };
        fetchArticles();
    }, []);

    const handleCommentChange = (articleId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setComments({
            ...comments,
            [articleId]: event.target.value,
        });
    };

    const handleCommentSubmit = async (articleId: string) => {
        try {
            await axiosInstance.post(`/api/article/user-comment-article/${articleId}/comments`, {
                comment: comments[articleId],
            });
            setPopupMessage("Comment added successfully!");
            setPopupType("success");
            setCommentVisible({
                ...commentVisible,
                [articleId]: false,
            });
            setComments({
                ...comments,
                [articleId]: "",
            });
        } catch (error) {
            setPopupMessage("Error adding comment. Please try again.");
            setPopupType("error");
        }
    };

    const handleCancelComment = (articleId: string) => {
        setCommentVisible({
            ...commentVisible,
            [articleId]: false,
        });
        setComments({
            ...comments,
            [articleId]: "",
        });
    };

    const toggleCommentVisibility = (articleId: string) => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }
        setCommentVisible({
            ...commentVisible,
            [articleId]: !commentVisible[articleId],
        });
    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <PulseLoader color="#3E27B2" size={15} />
            </div>
        );
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <div className='mt-12'>
            <Container>
                {popupMessage && popupType && <Popup message={popupMessage} type={popupType} onClose={() => setPopupMessage(null)} />}
                <div className='flex justify-end'>
                    <Link to={"/create-article"} className='text-right mb-12 mt-8 md:mt-0 px-6 py-2.5 bg-white text-[#1E3A8A] border-[#1E3A8A] border-[1.5px] rounded-xl'>
                        + Create Article
                    </Link>
                </div>
                <div className="w-full flex flex-wrap gap-4 items-center justify-center">
                    {articles.length === 0 ? (
                        <p>No articles available.</p>
                    ) : (
                        articles.map((article) => (
                            <div key={article.id} className="w-full md:w-[30%] p-4 border rounded-lg shadow-md md:h-[70vh] xxl:h-[55vh] bg-white flex flex-col justify-center items-center">
                                <Link to={`/article/${article.id}`}>
                                    <h2 className="text-xl font-semibold font-inknut pb-4">{article.title}</h2>
                                    <img loading="lazy" src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover rounded mb-2" />
                                    <p className='line-clamp-3 overflow-hidden text-ellipsis mb-2'>{article.description}</p>
                                </Link>

                                {token && (
                                    !commentVisible[article.id] ? (
                                        <button
                                            onClick={() => toggleCommentVisibility(article.id)}
                                            className="mt-2 px-3 py-1.5 bg-[#1E3A8A] text-white rounded hover:bg-blue-900"
                                        >
                                            add a Comment
                                        </button>
                                    ) : (
                                        <div className="m-2 border-gray-500 border-[1.5px] rounded-lg w-full">
                                            <input
                                                type="text"
                                                value={comments[article.id]}
                                                onChange={(e) => handleCommentChange(article.id, e)}
                                                placeholder="Add a comment"
                                                className="w-full p-2 border-none rounded outline-none"
                                            />
                                            <div className="flex justify-end items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => handleCommentSubmit(article.id)}
                                                    className="p-1 rounded"
                                                >
                                                    <MdSend size={20} color='#000'/>
                                                </button>
                                                <button
                                                    onClick={() => handleCancelComment(article.id)}
                                                    className="p-1 rounded"
                                                >
                                                    <MdClose size={20} color='#000'/>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Home
