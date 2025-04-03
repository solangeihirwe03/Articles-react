import React from 'react'
import { useLocation} from 'react-router-dom'
import Container from '../components/styleComponent';
import { IArticle } from '../utils/types/article';

interface SearchLocationState {
    allArticles: IArticle[];
    searchTerm: string;
  }

const Search = () => {
    const location = useLocation();
    const { allArticles = [], searchTerm = "" } = location.state as SearchLocationState || {}
    const results = React.useMemo(() => {

        if (!searchTerm.trim()) return [];
        const term = searchTerm.toLowerCase();
        return allArticles.filter(article => 
          article.title.toLowerCase().includes(term) || 
          article.description.toLowerCase().includes(term)
        );
      }, [allArticles, searchTerm]);

  return (
    <Container>
        <h1 className="text-2xl font-bold my-4">
        Search Results for: "{searchTerm}"
      </h1>
      {results.length > 0 ? (
        <div className="w-full flex flex-wrap gap-4 items-center justify-center">
          {results.map((article: any) => (
            <div key={article.id} className="w-[30%] p-4 border rounded-lg shadow-md h-[55vh] bg-white flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold font-inknut pb-4">{article.title}</h2>
              <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover rounded mb-2" />
              <p className="line-clamp-3 overflow-hidden text-ellipsis mb-2'">
                {article.description.substring(0, 150)}...
              </p>
              <a 
                href={`/article/${article.id}`} 
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Read more
              </a>
            </div>
          ))}
          </div>
      ) : (
        <p>No articles found matching your search.</p>
      )}
    </Container>
  )
}

export default Search
