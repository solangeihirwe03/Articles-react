import Container from '../components/styleComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { IArticle} from '../utils/types/article';
import axiosInstance from '../utils/axios/axiosInstance';
import { Link } from 'react-router-dom';
import edit from "/edit.svg";
import remove from "/Remove.svg"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchArticleById = async(articleId: string): Promise<IArticle>=>{
    const response = await axiosInstance.get(`/api/article/user-get-article/${articleId}`)
    return response.data.data.article
}

const deleteArticleById = async(articleId: string)=>{
    await axiosInstance.delete(`/api/article/delete-article/${articleId}`)
}

const ArticleDetail = () => {
    const { articleId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data: article,
        isLoading,
        isError,
        error
    } = useQuery<IArticle>({
        queryKey: ['article', articleId],
        queryFn: () => fetchArticleById(articleId!),
        enabled: !!articleId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10
    })
    const deleteMutation = useMutation({
        mutationFn: ()=> deleteArticleById(articleId!),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["article"]});
            navigate('/');
        }
    })

    const handleDelete = async () => {
        deleteMutation.mutate();
    };
    

    if (isLoading) return <p className='pl-32'>Loading...</p>;
    if (error) return <p>Error: {isError}</p>;
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
                {(article?.comments?.length?? 0) ? (
                    article?.comments?.map((comment) => (
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
