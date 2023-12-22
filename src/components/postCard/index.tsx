import React from 'react';
import { Link } from 'react-router-dom';

interface Author {
    _id: string;
    email: string;
    createdAt: string;
    __v: number;
}

export interface Article {
    _id: string;
    title: string;
    content: string;
    author: Author;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    const [confirm, setConfirm] = React.useState(false);

    return (
        <div className="max-w-lg mx-auto bg-gray-900 rounded-md shadow-lg overflow-hidden">
            <div className="px-6 py-4">
                <div className="mb-2 text-xl font-semibold text-blue-300">
                    <Link to={`/article/${article._id}`}>{article.title}</Link>
                </div>
                <p className="text-gray-400 text-sm">{article.createdAt.split(":")[0].slice(0, -3)}</p>
                <p className="mt-4 text-gray-300">{article.content.slice(0, 150) + "...."}</p>
                <div className="mt-4 text-gray-400 text-xs">
                    Author: {article.author.email.split("@")[0]}
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
