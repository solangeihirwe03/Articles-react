import React, { useEffect, useState } from 'react'
import Container from './styleComponent'
import { IoIosCellular } from "react-icons/io";
import {
    MdOutlineBusinessCenter,
    MdOutlineSportsGymnastics,
    MdOutlineHolidayVillage
} from "react-icons/md";
import { FcBiotech } from "react-icons/fc";
import { PiGraduationCapBold } from "react-icons/pi";
import { IArticle } from '../utils/types/article';
import axiosInstance from '../utils/axios/axiosInstance';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const [articles, setArticles] = useState<IArticle[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axiosInstance.get("/api/article/all-articles");
                console.log(response.data.data.articles)
                setArticles(response.data.data.articles)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        };
        fetchArticles();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Container>
                <div className='flex justify-end'>
                    <Link to={"/create-article"} className='text-right'>
                        + Create Article
                    </Link>
                </div>
                <div className='w-full flex flex-wrap gap-4'>
                    <ul className='bg-white px-8 py-4 w-1/3'>
                        <li className='py-2 flex items-center gap-2'>
                            <IoIosCellular color='#3E27B2' size={25} />
                            Technology
                        </li>
                        <li className='py-2 flex items-center gap-2'>
                            <MdOutlineBusinessCenter color='#3E27B2' size={25} />
                            Business
                        </li>
                        <li className='py-2 flex items-center gap-2'>
                            <FcBiotech color='#3E27B2' size={25} />
                            Life style
                        </li>
                        <li className='py-2 flex items-center gap-2'>
                            <PiGraduationCapBold color='#3E27B2' size={25} />
                            Education
                        </li>
                        <li className='py-2 flex items-center gap-2'>
                            <MdOutlineSportsGymnastics color='#3E27B2' size={25} />
                            Sports
                        </li>
                        <li className='py-2 flex items-center gap-2'>
                            <MdOutlineHolidayVillage color='#3E27B2' size={25} />
                            Travel
                        </li>
                    </ul>
                    {articles.map((article) => (
                        <div key={article.id} className='w-1/3'>
                            <Link to={`/article/${article.id}`}>
                                <h2>{article.title}</h2>
                                <img src={article.imageUrl} alt={article.title} />
                                <p>{article.description}</p>
                            </Link>
                        </div>))}
                </div>
            </Container>
        </div>
    )
}

export default Sidebar
