import { IArticle } from "./types/article";

export const searchArticles = (articles:IArticle[], searchTerm: string): IArticle[]=>{
    if(!searchTerm.trim()) return articles;

    const term = searchTerm.toLowerCase();

    return articles.filter(article=>
        article.title.toLowerCase().includes(term) ||
        article.description.toLowerCase().includes(term)
    );
}