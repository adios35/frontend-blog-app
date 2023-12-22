import { BiEdit, TiDelete } from 'react-icons/all'
import { Article } from '../../postCard'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Modal from '../modal';
import credAxios from '../../../api/axios';
import { useAuth } from '../../../hooks/wrQuery';
import { useMutation, useQueryClient } from 'react-query';

export default function UserPost(post: Article) {
    const client = useQueryClient()
    const { accessToken } = useAuth()
    const [showModal, setShowModal] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const { mutate, isLoading } = useMutation({
        mutationFn: () => credAxios.delete(`/v1/post/delete/${post._id}`,
            { headers: { "Authorization": `Bearer ${accessToken}` } }),
        mutationKey: "post",
        onSuccess: () => {
            alert("post deleted")
            client.invalidateQueries("post")
        },
        onError: (err) => console.log(err),
    })

    return (
        <>
            <div className='bg-gray-700 p-2 text-gray-500 relative   rounded-md items-center justify-between gap-3'>
                {showModal && <Modal queryClient={client} {...post} setShowModal={setShowModal} />}
                <div className="card-content flex justify-between">
                    <span className="inline-block text-gray-300 cursor-pointer"><Link to={`/article/${post._id}`}>{post.title}</Link></span>
                    <div className="ctas flex  gap-2 items-center  cursor-pointer text-gray-300">
                        <button onClick={() => setConfirm(pre => !pre)} >
                            <TiDelete size={25} className="hover:text-gray-400 " />
                        </button>
                        <button onClick={() => setShowModal(true)}>
                            <BiEdit size={25} className="hover:text-gray-400 " />
                        </button>
                    </div>
                </div>
                <div className={`confirm flex items-center ${confirm ? "visible" : "hidden"} justify-between  mt-2  first-letter:first-line: bg-gray-700`}>
                    <span className="block">are you sure?</span>

                    <button disabled={isLoading} onClick={() => mutate()} className="bg-red-400  rounded-md text-sm p-[2px] text-gray-200  ">confirm</button>
                </div>
            </div>
        </>
    )
}
