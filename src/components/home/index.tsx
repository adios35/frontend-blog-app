import React, { useState } from 'react';
import './style.css';
import ArticleCard, { Article } from '../postCard';
import credAxios from '../../api/axios';
import UseAxiosPrivate from '../../hooks/UseAxiosPrivate';

const HomePage: React.FC = () => {
    const [articleData, setarticleData] = React.useState<Article[] | null>(null);
    const hello = UseAxiosPrivate()
    React.useEffect(() => {
        credAxios.get("/v1/post")
            .then((data) => setarticleData(data.data.posts))
            .catch(err => console.log("err ", err))
    }, []);

    return (
        <div className="bg-gray-900 md:max-h-[calc(100vh-40px)] min-h-[27rem] md:overflow-y-hidden py-8 px-4 sm:px-8 lg:px-16">
            <div className="flex flex-col sm:flex-row justify-center items-start sm:items-stretch gap-4">
                {/* Bagian kiri untuk daftar artikel */}
                <div className="post-wrapper w-full max-h-[calc(100vh-50px)] pb-16  overflow-y-scroll relative items-start sm:w-3/4">
                    <h2 className="text-2xl font-semibold text-blue-300 md:fixed mb-4">Artikel</h2>
                    {articleData && (articleData.length <0) && <h1>belum ada artikel</h1>}
                    {articleData ? articleData?.map((article: Article) => (
                        <ArticleCard key={article._id} article={article} />
                    )) : <div className="w-full pt-14 text-white"><h1>loading...</h1></div>}

                </div>
                {/* Bagian kanan untuk iklan */}
                <div className="w-full sm:w-1/4 ">
                    <div className="bg-gray-800 rounded-md shadow-md p-4">
                        <h2 className="text-lg font-semibold text-blue-300 mb-4">Iklan</h2>
                        {/* Tampilkan data iklan */}
                        <div className="border border-gray-700 rounded-md p-2">
                            {/* Tampilkan konten iklan */}
                            <p className="text-gray-300">advertisment</p>
                            <img src="https://media.istockphoto.com/id/528045706/id/foto/menganalisis-data-keuangan.jpg?s=1024x1024&w=is&k=20&c=35I5FcfBWtVnx-HhB7Z3bmF2LAwZ-lPE6QtqIBducYs=" alt="" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
