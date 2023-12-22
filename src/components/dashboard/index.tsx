import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdHome, MdDashboard } from "react-icons/md"; // Importing icons from react-icons
import { useMutation, useQuery, useQueryClient } from "react-query";
import credAxios from "../../api/axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/wrQuery";
import Modal from "./modal";
import UserPost from "./postCard";
import { Article } from "../postCard";



const schemaForm = z.object({
    title: z.string().min(6),
    content: z.string().min(10),
    apiError: z.string().optional()
})
type form = z.infer<typeof schemaForm>

const Dashboard = () => {
    const navigate = useNavigate()
    const { accessToken } = useAuth()
    const { data, isLoading: postPending } = useQuery({
        queryFn: () => credAxios.get("/v1/post/posts", { headers: { "Authorization": `Bearer ${accessToken}` } }),
        queryKey: "post",

        onSuccess: () => {
            console.log("Data fetched");
        }, onError: (err) => {
            console.log(err)
        }
    })
    const { register, formState: { errors }, setError, handleSubmit, reset } = useForm<form>({
        resolver: zodResolver(schemaForm)
    })
    const { mutate, isLoading } = useMutation({
        mutationFn: (data: form) => credAxios.post("/v1/post/create", data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }),
        onSuccess: (data) => {
            reset()
            navigate("/")
            alert("post success")
        },
        onError: err => {
            setError("apiError", {
                type: "validate",
                //@ts-ignore
                message: err?.response.data?.message || err?.message
            })
        }
    })
    function submit(form: form) {
        mutate(form)
    }

    return (
        <div className="flex min-h-screen md:pt-5 pt-20">
            {/* <Modal /> */}
            {/* Left Sidebar */}
            <nav className="bg-gray-800 text-white w-16 hidden md:block">
                {/* Navigation Items */}
                <ul className="py-4 flex flex-col items-center">
                    <li className="mb-4">
                        <Link to="/" className="block p-2 text-center hover:bg-gray-700">
                            <MdHome size={24} /> {/* Home icon */}
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/dashboard" className="block p-2 text-center hover:bg-gray-700">
                            <MdDashboard size={24} /> {/* Dashboard icon */}
                        </Link>
                    </li>
                    {/* Add more navigation items here */}
                </ul>
            </nav>
            {/* Content Area */}
            <div className="flex-1 bg-gray-900 p-8">
                {/* Main Content */}
                <h1 className="text-3xl text-white mb-4">Dashboard</h1>
                {/* Form */}
                <div className="row flex md:flex-row flex-col gap-10">
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="bg-gray-800 flex-1 p-4 w-full rounded-lg shadow-md self-start">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Title</label>
                            <input
                                {...register("title")}
                                type="text"
                                placeholder="Enter Title"
                                className="w-full px-4 text-gray-200 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700"
                            />
                            {<p className="text-red-400">{errors.title?.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Content</label>
                            <textarea
                                {...register("content")}
                                placeholder="Enter Content"
                                className="w-full px-4 py-2 border  text-gray-200 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700"
                                rows={4}
                            />
                            {<p className="text-red-400">{errors.content?.message}</p>}
                        </div>
                        {<p className="text-red-400">{errors.apiError?.message}</p>}

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none"
                        >
                            {isLoading ? "Posting article" : "Create Article"}
                        </button>

                    </form>
                    <div className="flex-1 post-list h-[430px] overflow-y-scroll">
                        <ul className="space-y-3 ">
                            {postPending && <h1>Loading...</h1>}
                            {
                                data?.data?.post.map((post: Article) => (
                                    <li>
                                        <UserPost {...post} key={post._id} />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="bg-gray-800 text-white w-full fixed top-16 left-0 md:hidden">
                {/* Navigation Items */}
                <ul className="flex justify-between py-2 px-4">
                    <li>
                        <Link to="/" className="block p-2 text-center hover:bg-gray-700">
                            <MdHome size={24} /> {/* Home icon */}
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="block p-2 text-center hover:bg-gray-700">
                            <MdDashboard size={24} /> {/* Dashboard icon */}
                        </Link>
                    </li>
                    {/* Add more navigation items here */}
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;
