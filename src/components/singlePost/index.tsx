import { UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import credAxios from "../../api/axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

type Author = {
    email: string;
    _id: string;
};

type Comment = {
    author: string;
    _id: string;
    text: string;
    createdAt: String;
};
type Post = {
    content: string;
    createdAt: string;
    title: string;
    updatedAt: string;
    _id: string;
    author: Author;
    comment?: Comment[]; // An array of comments
};

type ApiResponse = {
    data: Post;
};

const fetchPost = async (id: any): Promise<ApiResponse> => {
    const response = await credAxios.get(`/v1/post/${id}`);
    return response.data;
};



export default function SinglePost() {
    const client = useQueryClient()
    const { id } = useParams();
    const [comment, setComment] = useState("");


    const { data }: UseQueryResult<Post, unknown> = useQuery({
        queryFn: () => fetchPost(id),
        queryKey: "post",
        onSuccess: (data) => data
    })

    const { mutate, isLoading } = useMutation({
        mutationFn: () => credAxios.post(`/v1/post/comment/${id}`, { text: comment }),
        onSuccess: () => {
            client.invalidateQueries("post")
            setComment("")
        }, onError: (err) => {
            console.log(err);
            alert("something went wrong")
        }
    })

    return (
        <div className="text-gray-400 bg-gray-900 pt-8 min-h-screen min-w-full">
            <div className="container mx-auto p-4 max-w-3xl">
                <Link className="hover:underline hover:text-blue-500" to={"/"} >  &lt;-- Home</Link>
                <h2 className="text-3xl font-bold mb-4">{data?.title}</h2>
                <p className="text-lg mb-4">{data?.content}</p>
                <small className="text-sm">Author : {data?.author?.email.split("@")[0]}</small>
                {/* Comment Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Comments</h3>
                    {data?.comment?.length === 0 ? (
                        <p className="text-gray-500">No comments yet.</p>
                    ) : (
                        <ul className="divide-y divide-gray-800">
                            {data?.comment?.map((comment) => (
                                <li key={comment._id} className="py-4">
                                    <p className="text-gray-500 text-sm">
                                        By: {comment.author}, {comment.createdAt.split("T")[0]}
                                    </p>
                                    <p className="text-gray-300">{comment.text}</p>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Input for adding comments */}
                    <div className="my-8">
                        <h4 className="text-lg font-semibold mb-2">Add Comment</h4>
                        <input
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            type="text"
                            placeholder="Write your comment here..."
                            className="w-full px-4 py-2 rounded bg-gray-800 text-gray-300 focus:outline-none focus:bg-gray-700"
                        />
                        {/* You might want to add a button to submit the comment */}
                        <button disabled={isLoading} className="p-2 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-md bg-gray-800 mt-2" onClick={() => mutate()}>submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
