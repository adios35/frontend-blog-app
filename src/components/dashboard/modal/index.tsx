import React, { ChangeEvent } from 'react'
import { Article } from '../../postCard';
import { QueryClient, useMutation } from 'react-query';
import credAxios from '../../../api/axios';
import { useAuth } from '../../../hooks/wrQuery';
// import { TiThLarge } from 'react-icons/ti';
interface props extends Article {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    queryClient: QueryClient
}
export default function Modal({ setShowModal, queryClient, ...rest }: props) {
    const { accessToken } = useAuth()
    const [input, setInput] = React.useState<Article>({ ...rest });

    function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setInput({
            ...input,
            [name]: value
        })
    }
    const { mutate, isLoading } = useMutation({
        mutationFn: () => credAxios.patch(`/v1/post/update/${rest._id}`,
            { title: input.title, content: input.content },
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }),
        onSuccess: () => {
            alert("update successfully")
            queryClient.invalidateQueries("post")
            setShowModal(false)
        },
        onError: (err) => {
            console.log(err)
        }

    })
    return (
        <div onClick={() => setShowModal(false)} className='fixed mx-auto min-h-screen min-w-screen inset-0 bg-gray-800/70 z-10'>s
            {/* <div className="container  bg-gray-700 min-h-[80%] inset-0 mx-auto  rounded-md w-[80%]">sd</div> */}
            <form
                onClick={(e) => {
                    e.stopPropagation()
                }}
                // onSubmit={handleSubmit(submit)}
                className="bg-gray-800 p-4 md:p-8 w-[70%] mx-auto mt-16 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-500 font-semibold mb-2">Update-Title</label>
                    <input
                        onChange={handleInput}
                        // {...register("title")}
                        value={input?.title}
                        name="title"
                        type="text"
                        placeholder="Enter Title"
                        className="w-full px-4 text-gray-200 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700"
                    />
                    {/* {<p className="text-red-400">{errors.title?.message}</p>} */}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-500 font-semibold mb-2">Update-Content</label>
                    <textarea
                        value={input?.content}
                        onChange={handleInput}

                        name="content"

                        // {...register("content")}
                        placeholder="Enter Content"
                        className="w-full px-4 py-2 border  text-gray-200 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700"
                        rows={4}
                    />
                    {/* {<p className="text-red-400">{errors.content?.message}</p>} */}
                </div>
                {/* {<p className="text-red-400">{errors.apiError?.message}</p>} */}

                <button
                    disabled={isLoading}
                    onClick={() => mutate()}
                    type="submit"
                    className="w-full disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none"
                >
                    Update Article
                </button>
            </form>

        </div>
    )
}
