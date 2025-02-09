import { useGetAllAvatarQuery, useGetByIdAvatarQuery, usePostAvatarMutation } from "../../../redux/rtk query/Slices/avatarSlice"

export default function QuizPage() {

    // let result = useGetAllAvatarQuery()
    // console.log(result);
    // let {data, isError, isLoading, error } = useGetAllAvatarQuery()

    // if (isError) {
    //     console.log(error.status);
    // }
    // // console.log(data);
    // let {data} = useGetByIdAvatarQuery(7)
    // console.log(data);

    // let [deleteAvatar] = useDeleteAvatarMutation()
    // let [postAvatar] = usePostAvatarMutation()
    // let [updateAvatar] = useUpdateAvatarMutation()
    // let [up]
    // const handleDelete = () => {
    //     // let newData = {
    //     //     description: "lorem ipsum dolor sit.",
    //     //     name: "lorem"
    //     // }
    //     // postAvatar(newData)
    //     // console.log("post olundu")


    // }

    // const [updatePost, { isLoading, isError }] = useUpdatePostMutation();

    // const handleUpdatePost = async () => {
    //     try {
    //         const updatedPost = await updatePost(
    //             {
    //                 id: 3,
    //                 name: 'Updated name id=3'
    //             }
    //         ).unwrap();
    //         console.log('Post yeniləndi:', updatedPost);
    //     } catch (error) {
    //         console.error('Yeniləmə zamanı xəta:', error);
    //     }
    // };

    let result = useGetByIdAvatarQuery(2)
    console.log(result);
    
    let [postAvatar] = usePostAvatarMutation()
    const handleUpdatePost = () => {
        let newData = {
            name: "hvhjg",
            image: "85951e72-bb1c-44d3-a3f8-90da6cf0a388enshot 2024-07-05 142239.png"
        }
        postAvatar(newData)
        console.log("post olundu")
    }


    return (
        <>

            <button onClick={() => handleUpdatePost()}
                className="p-1 bg-red-500 text-white rounded-4">Delete</button>

        </>
    )
}