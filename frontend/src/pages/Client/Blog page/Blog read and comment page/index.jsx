import { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, useParams } from "react-router";
import { useDeleteBlogMutation, useGetByIdBlogQuery, useUpdateBlogMutation } from "../../../../redux/rtk query/Slices/blogSlice";
import LoaderIcon from "../../../../components/Loaders/Loader";
import { useAddToFavoriteBlogUserMutation, useDeleteFromFavoriteBlogUserMutation, useGetAllUserQuery, useGetByIdUserQuery, useGetFavoriteBlogsUserQuery } from "../../../../redux/rtk query/Slices/userSlice";
import moment from 'moment';
import { useGetAllAvatarQuery, useGetByIdAvatarQuery } from "../../../../redux/rtk query/Slices/avatarSlice";
import { useGetAllFrameQuery } from "../../../../redux/rtk query/Slices/frameSlice";
import { userInfoContext } from "../../../../context/UserInfo";
import { FaArrowUp } from "react-icons/fa";
// formik and yup
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDeleteCommentMutation, usePostCommentMutation, useUpdateCommentMutation } from "../../../../redux/rtk query/Slices/commentSlice";
// tiny mce editor
import { Editor } from "@tinymce/tinymce-react";
import { HiDotsVertical } from "react-icons/hi";
// material ui
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaRegHeart } from "react-icons/fa6";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

let validationSchema = yup.object().shape({
    comment: yup.string()
        .required("Enter your comment.")
        .trim('The contact name cannot include leading and trailing spaces')
});

let validationSchemaEdit = yup.object().shape({
    title: yup.string()
        .required("Enter blog title.")
        .trim('The contact name cannot include leading and trailing spaces'),
    content: yup.string()
        .required("Enter blog content.")
        .trim('The contact name cannot include leading and trailing spaces'),

});

export default function BlogReadAndComment() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    let navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let [editComment, setEditComment] = useState()
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

    let { userInfo } = useContext(userInfoContext)
    let { id } = useParams()
    let { data: user } = useGetByIdUserQuery(userInfo?.userId)
    let { data: userAvatar } = useGetByIdAvatarQuery(user?.avatarId)
    let [postComment] = usePostCommentMutation()
    let [deleteComment] = useDeleteCommentMutation()
    let [updateComment] = useUpdateCommentMutation()
    let [deleteBlog] = useDeleteBlogMutation()
    let [updateBlog] = useUpdateBlogMutation()
    let [addToFavoriteBlogUser] = useAddToFavoriteBlogUserMutation()
    let [deleteFromFavoriteBlogUser] = useDeleteFromFavoriteBlogUserMutation()
    let [commentMessage, setCommentMessage] = useState()
    let { data, isLoading, refetch, error } = useGetByIdBlogQuery(id)
    if (error) {
        navigate('/*')
    }

    let { data: userFavoritesArray, refetch: userFavRefech } = useGetFavoriteBlogsUserQuery(userInfo?.userId)
    console.log(userFavoritesArray);

    let { data: blogUser } = useGetByIdUserQuery(data?.authorId)
    let { data: avatar } = useGetByIdAvatarQuery(blogUser?.avatarId)
    // all
    let { data: users } = useGetAllUserQuery()
    let { data: avatars } = useGetAllAvatarQuery()
    let { data: allFrame } = useGetAllFrameQuery();
    let blogUpdateRef = useRef()
    const [openCommentId, setOpenCommentId] = useState(null);
    const [editBlog, setEditBlog] = useState()
    const [content, setContent] = useState(editBlog?.content || "");
    useEffect(() => {
        setContent(editBlog?.content)
    }, [editBlog])

    const toggleMenu = (commentId) => {
        setOpenCommentId((prevId) => (prevId === commentId ? null : commentId));
    };

    let [sliceNumber, setSliceNumber] = useState(5)
    let [comments, setComments] = useState([])
    useEffect(() => {
        if (!isLoading && data) {
            setComments(data.comments)
        }
    }, [data, isLoading])

    const showMoreLess = () => {
        if (comments.length >= sliceNumber + 5) {
            setSliceNumber(sliceNumber + 5)
        } else if (comments.length == sliceNumber) {
            setSliceNumber(5)
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (comments.length < sliceNumber + 5) {
            setSliceNumber(comments.length)
        }
    }

    // add and delete fav list
    const addAndDeleteFavoriteBlog = async (id) => {
        if (userInfo?.userId) {
            const response = await addToFavoriteBlogUser({ userId: userInfo.userId, blogId: id })
            console.log(response);
            if (response.error) {
                const responseDelete = await deleteFromFavoriteBlogUser({ userId: userInfo.userId, blogId: id })
                console.log(responseDelete);
            }
            userFavRefech()
            console.log(userFavoritesArray);
        } else {
            navigate("/login")
        }
    }

    // delete own comment
    const deleteOwnComment = async (id) => {
        const response = await deleteComment(id)
        if (response.data) {
            alert(response.data);
        }
        refetch()
    }

    // delete own blog
    const deleteOwnBlog = async (id) => {
        try {
            const response = await deleteBlog(id)
            if (response.error) {
                alert('Xəta baş verdi')
                return;
            }
            navigate('/blog')
        } catch (error) {
            console.log(error);
            alert("Xəta")
        }
    }

    return (
        <>
            {
                isLoading ? (
                    <LoaderIcon />
                ) : (
                    <div className="bg-[var(--bg-color)] text-[var(--text-color)] py-[130px]">
                        <Container>
                            <div className="p-3 rounded-4 bg-[var(--movies-bg)] transition-all duration-250 ease-in hover:shadow-gray-500 hover:shadow-lg">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-['Kanit'] text-center w-full text-xl md:text-5xl">{data?.title}</h3>
                                    {
                                        data?.authorId == userInfo?.userId ? (
                                            <div className="relative">
                                                <div onClick={() => blogUpdateRef.current.classList.toggle("handleBars")} className="cursor-pointer"><HiDotsVertical /></div>
                                                <div ref={blogUpdateRef} className="text-white bg-[#537296] p-1 rounded absolute top-0 right-4 w-[100px] handleBars">
                                                    <div onClick={() => deleteOwnBlog(data.id)} className="font-['Kanit'] cursor-pointer">Sil</div>
                                                    <div className="w-full h-[1px] bg-gray-400"></div>
                                                    <div onClick={() => { handleOpenEditModal(), setEditBlog(data) }} className="font-['Kanit'] cursor-pointer">Redaktə et</div>
                                                </div>
                                            </div>
                                        ) : (<></>)
                                    }
                                </div>

                                <div className="break-all" dangerouslySetInnerHTML={{ __html: data?.content }} />
                                <div className="flex gap-2 items-center justify-end">
                                    <div onClick={() => addAndDeleteFavoriteBlog(id)} className="cursor-pointer text-2xl">
                                        <FaRegHeart />
                                    </div>
                                    <div className="flex flex-col items-end justify-center">
                                        <span className="font-['PT_Serif'] text-sm md:text-md">{blogUser?.userName}</span>
                                        <span className="font-['PT_Serif'] text-sm md:text-md">{moment(data?.createdAt).fromNow()}</span>
                                    </div>
                                    <div className='relative flex items-center justify-center w-[65px] h-[65px]'>
                                        <img className='w-[75%] h-[75%] rounded-full object-cover z-0 object-center' src={`https://englishwithmovies.blob.core.windows.net/avatar/${avatar?.imgName}`} alt="profile" />
                                        {
                                            blogUser?.userFrames &&
                                            blogUser?.userFrames.map((frame) => {
                                                if (frame.isCurrent) {
                                                    let userFrame = allFrame?.find((value) => value.id == frame.frameId);
                                                    return (
                                                        <div
                                                            key={frame.frameId}
                                                            className="absolute w-full h-full bg-cover bg-center z-10"
                                                            style={{ backgroundImage: `url('https://englishwithmovies.blob.core.windows.net/frame/${userFrame?.imgName}')` }}
                                                        ></div>
                                                    );
                                                }
                                                return null;
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="w-full h-[1px] bg-gray-500 mt-3"></div>
                                <div className="mb-3">
                                    {
                                        comments.length ? (
                                            comments.length > 5 ? (
                                                <>
                                                    {
                                                        comments.slice(0, sliceNumber).map((comment) => {
                                                            let commentUser = users?.find((user) => user.id == comment?.authorId)
                                                            let commentAvatar = avatars?.find((avatar) => avatar.id == commentUser?.avatarId)
                                                            const formattedDate = comment?.createdAt.split('.')[0];
                                                            return <div className="mt-4 flex gap-2">
                                                                <div className='relative flex items-center justify-center w-[45px] h-[45px] flex-shrink-0'>
                                                                    <img className='w-[75%] h-[75%] rounded-full object-cover z-0 object-center' src={`https://englishwithmovies.blob.core.windows.net/avatar/${commentAvatar?.imgName}`} alt="profile" />
                                                                    {
                                                                        commentUser?.userFrames &&
                                                                        commentUser?.userFrames.map((frame) => {
                                                                            if (frame.isCurrent) {
                                                                                let userFrame = allFrame?.find((value) => value.id == frame.frameId);
                                                                                return (
                                                                                    <div
                                                                                        key={frame.frameId}
                                                                                        className="absolute w-full h-full bg-cover bg-center z-10"
                                                                                        style={{ backgroundImage: `url('https://englishwithmovies.blob.core.windows.net/frame/${userFrame?.imgName}')` }}
                                                                                    ></div>
                                                                                );
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                </div>
                                                                <div className="w-full">
                                                                    <div className="flex justify-between items-center">
                                                                        <div className="text-sm opacity-85">{commentUser?.userName} {moment.utc(formattedDate).local().fromNow()}</div>
                                                                        {
                                                                            comment.authorId == userInfo?.userId ? (
                                                                                <div className="relative">
                                                                                    <div onClick={() => toggleMenu(comment.id)} className="cursor-pointer"><HiDotsVertical /></div>
                                                                                    {openCommentId === comment.id && (
                                                                                        <div className="text-white bg-[#537296] p-1 rounded absolute top-0 right-4 w-[100px]">
                                                                                            <div onClick={() => deleteOwnComment(comment.id)} className="font-['Kanit'] cursor-pointer">Sil</div>
                                                                                            <div className="w-full h-[1px] bg-gray-400"></div>
                                                                                            <div onClick={() => { handleOpen(), setEditComment(comment) }} className="font-['Kanit'] cursor-pointer">Redaktə et</div>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            ) : (<></>)
                                                                        }
                                                                    </div>
                                                                    <div className="break-all text-sm sm:text-md">{comment.content}</div>
                                                                </div>
                                                            </div>
                                                        })
                                                    }

                                                    <div className="text-white cursor-pointer flex justify-end">
                                                        <button onClick={() => showMoreLess()} className="my-3 py-1 px-3 bg-[#537296] rounded">
                                                            {comments.length == sliceNumber ? ('Read Less') : ('Read More')}
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                comments.map((comment) => {
                                                    let commentUser = users?.find((user) => user.id == comment?.authorId)
                                                    const formattedDate = comment?.createdAt.split('.')[0];
                                                    let commentAvatar = avatars?.find((avatar) => avatar.id == commentUser?.avatarId)
                                                    return <div className="mt-4 flex gap-2">
                                                        <div className='relative flex items-center justify-center w-[45px] h-[45px] flex-shrink-0'>
                                                            <img className='w-[75%] h-[75%] rounded-full object-cover z-0 object-center' src={`https://englishwithmovies.blob.core.windows.net/avatar/${commentAvatar?.imgName}`} alt="profile" />
                                                            {
                                                                commentUser?.userFrames &&
                                                                commentUser?.userFrames.map((frame) => {
                                                                    if (frame.isCurrent) {
                                                                        let userFrame = allFrame?.find((value) => value.id == frame.frameId);
                                                                        return (
                                                                            <div
                                                                                key={frame.frameId}
                                                                                className="absolute w-full h-full bg-cover bg-center z-10"
                                                                                style={{ backgroundImage: `url('https://englishwithmovies.blob.core.windows.net/frame/${userFrame?.imgName}')` }}
                                                                            ></div>
                                                                        );
                                                                    }
                                                                    return null;
                                                                })
                                                            }
                                                        </div>
                                                        <div className="w-full">
                                                            <div className="flex justify-between items-center">
                                                                <div className="text-sm opacity-85">{commentUser?.userName} {moment.utc(formattedDate).local().fromNow()}</div>
                                                                {
                                                                    comment.authorId == userInfo?.userId ? (
                                                                        <div className="relative">
                                                                            <div onClick={() => toggleMenu(comment.id)} className="cursor-pointer"><HiDotsVertical /></div>
                                                                            {openCommentId === comment.id && (
                                                                                <div className="text-white bg-[#537296] p-1 rounded absolute top-0 right-4 w-[100px]">
                                                                                    <div onClick={() => deleteOwnComment(comment.id)} className="font-['Kanit'] cursor-pointer">Sil</div>
                                                                                    <div className="w-full h-[1px] bg-gray-400"></div>
                                                                                    <div onClick={() => { handleOpen(), setEditComment(comment) }} className="font-['Kanit'] cursor-pointer">Redaktə et</div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ) : (<></>)
                                                                }
                                                            </div>
                                                            <div className="break-all text-sm sm:text-md">{comment.content}</div>
                                                        </div>
                                                    </div>
                                                })
                                            )
                                        ) : (<></>)
                                    }
                                </div>

                                <div className="flex gap-2 justify-center">
                                    <div className='relative flex items-center justify-center w-[45px] h-[45px]'>
                                        <img className='w-[75%] h-[75%] rounded-full object-cover z-0 object-center' src={`https://englishwithmovies.blob.core.windows.net/avatar/${userAvatar?.imgName}`} alt="profile" />
                                        {
                                            user?.userFrames &&
                                            user?.userFrames.map((frame) => {
                                                if (frame.isCurrent) {
                                                    let userFrame = allFrame?.find((value) => value.id == frame.frameId);
                                                    return (
                                                        <div
                                                            key={frame.frameId}
                                                            className="absolute w-full h-full bg-cover bg-center z-10"
                                                            style={{ backgroundImage: `url('https://englishwithmovies.blob.core.windows.net/frame/${userFrame?.imgName}')` }}
                                                        ></div>
                                                    );
                                                }
                                                return null;
                                            })
                                        }
                                    </div>
                                    <Formik
                                        initialValues={{ comment: '' }}
                                        validationSchema={validationSchema}
                                        onSubmit={async (values, { setSubmitting }) => {
                                            const postCommentFormData = new FormData()
                                            postCommentFormData.append('Content', values.comment.trim())
                                            postCommentFormData.append('BlogId', id)
                                            postCommentFormData.append('AuthorId', user?.id)
                                            try {
                                                const response = await postComment(postCommentFormData)
                                                refetch()
                                                if (response.error) {
                                                    setCommentMessage('❌ Xəta baş verdi');
                                                }
                                            } catch (error) {
                                                console.error("Error details:", error);
                                                if (error.response) {
                                                    console.error("Server Response Error:", error.response);
                                                    setCommentMessage('❌ Server Error: ' + error.response.status);
                                                } else if (error.request) {
                                                    console.error("Request Error:", error.request);
                                                    setCommentMessage('❌ Request Error');
                                                } else {
                                                    console.error("General Error:", error.message);
                                                    setCommentMessage('❌ Error: ' + error.message);
                                                }
                                                setCommentMessage('❌ Error!!!')
                                            }
                                            values.comment = ''
                                            setSubmitting(false)
                                        }}
                                    >
                                        {({ isSubmitting }) => (
                                            <Form className="flex items-start w-full">
                                                <div className="w-full">
                                                    <Field type="text" name="comment" placeholder="Your comment" className="placeholder:text-gray placeholder:opacity-70 rounded-full px-2 py-1 focus:outline-none w-full border-[var(--text-color)] border-2 border-solid break-all" />
                                                    <ErrorMessage name="comment" component="div" className="text-red-500" />
                                                </div>
                                                <button className="bg-blue-600 text-white p-2 rounded-full" type="submit" disabled={isSubmitting}><FaArrowUp /></button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                                <div>{commentMessage}</div>
                            </div>
                        </Container >

                        {/* modal */}
                        <div>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={{ ...style }} className="max-w-2xl mx-auto">
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Edit own comment
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <Formik
                                            initialValues={{ comment: editComment?.content }}
                                            validationSchema={validationSchema}
                                            onSubmit={async (values, { setSubmitting }) => {
                                                const editCommentFormData = new FormData()
                                                editCommentFormData.append('Content', values.comment.trim())
                                                editCommentFormData.append('Id', editComment.id)
                                                try {
                                                    const response = await updateComment(editCommentFormData)
                                                    refetch()
                                                    handleClose()
                                                    toggleMenu(editComment.id)
                                                    if (response.error) {
                                                        setCommentMessage('❌ Error: Xəta baş verdi');
                                                    }
                                                } catch (error) {
                                                    console.error("Error details:", error);
                                                    if (error.response) {
                                                        console.error("Server Response Error:", error.response);
                                                        setCommentMessage('❌ Server Error: ' + error.response.status);
                                                    } else if (error.request) {
                                                        console.error("Request Error:", error.request);
                                                        setCommentMessage('❌ Request Error');
                                                    } else {
                                                        console.error("General Error:", error.message);
                                                        setCommentMessage('❌ Error: ' + error.message);
                                                    }
                                                    setCommentMessage('❌ Error!!!')
                                                }
                                                values.comment = ''
                                                setSubmitting(false)
                                            }}
                                        >
                                            {({ isSubmitting }) => (
                                                <Form className="flex items-start w-full">
                                                    <div className="w-full">
                                                        <Field type="text" name="comment" placeholder="Your comment" className="placeholder:text-gray placeholder:opacity-70 rounded-full px-2 py-1 focus:outline-none w-full border-[var(--text-color)] border-2 border-solid break-all" />
                                                        <ErrorMessage name="comment" component="div" className="text-red-500" />
                                                    </div>
                                                    <button className="bg-blue-600 text-white p-2 rounded-full" type="submit" disabled={isSubmitting}><FaArrowUp /></button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </Typography>
                                </Box>
                            </Modal>
                        </div>
                        {/* blog edit modal */}
                        <div>
                            <Modal
                                open={openEditModal}
                                onClose={handleCloseEditModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={{ ...style }} className="max-w-[1300px] mx-auto">
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Edit own blog
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <Formik
                                            enableReinitialize={true}
                                            initialValues={{ title: editBlog?.title, content: editBlog?.content, authorId: editBlog?.authorId, id: editBlog?.id }}
                                            validationSchema={validationSchemaEdit}
                                            onSubmit={async (values) => {
                                                const blogEditFormData = new FormData()
                                                blogEditFormData.append("Title", values.title)
                                                blogEditFormData.append("Content", values.content)
                                                blogEditFormData.append("AuthorId", values.authorId)
                                                blogEditFormData.append("Id", values.id)
                                                try {
                                                    const response = await updateBlog(blogEditFormData);
                                                    console.log(response);
                                                    if (response.data) {
                                                        alert('Successfully');
                                                        handleCloseEditModal()
                                                        refetch()
                                                        blogUpdateRef.current.classList.toggle("handleBars")
                                                    }
                                                    if (response.error) {
                                                        alert("❌ " + response.error.data)
                                                    }
                                                } catch (error) {
                                                    if (error.response) {
                                                        const { status, data, statusText } = error.response;
                                                        console.error("Error Status Code:", status);
                                                        console.error("Error Message:", data);
                                                        console.error("Error Status Text:", statusText);

                                                        if (status === 400) {
                                                            alert("❌ Bad request, check your input.");
                                                        } else if (status === 404) {
                                                            alert("❌ Endpoint not found.");
                                                        } else if (status === 500) {
                                                            alert("❌ Server error, please try again later.");
                                                        }
                                                    } else {
                                                        console.error("Unknown error:", error);
                                                    }
                                                }
                                                setSubmitting(false)
                                            }}
                                        >
                                            {({ isSubmitting, setFieldValue }) => (
                                                <Form>
                                                    <label htmlFor="blog-title" className="text-gray-600 font-bold">BLOG TITLE</label>
                                                    <Field type="text" name="title" className="font-bold text-xl border-2 border-gray-600 w-full rounded mt-1 p-1 text-black" />
                                                    <ErrorMessage name="title" component="div" className="text-red-600" />
                                                    <div className="mt-3">
                                                        <Editor
                                                            apiKey="fjhoir9ox8oyvemgzkz4oc6mel798bl48qh8fysq5fw8nfiu"
                                                            value={content}
                                                            onEditorChange={(newContent) => {
                                                                setContent(newContent);
                                                                setFieldValue("content", newContent);
                                                            }}
                                                            init={{
                                                                height: 400,
                                                                menubar: true,
                                                                plugins: ["lists", "link", "image", "code"],
                                                                toolbar: 'undo redo | formatselect | fontselect fontsizeselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | code | link image',
                                                                color_map: [
                                                                    "FFFFFF", "White",
                                                                    "000000", "Black",
                                                                    "FF0000", "Red",
                                                                    "00FF00", "Green",
                                                                    "0000FF", "Blue"
                                                                ],
                                                                content_style: 'body { background-color:rgba(185, 185, 185, 0.71); color: #333; }',
                                                            }}
                                                        />
                                                    </div>
                                                    <ErrorMessage name="content" component="div" className="text-red-500" />
                                                    <button type="submit" disabled={isSubmitting} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
                                                        Submit
                                                    </button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </Typography>
                                </Box>
                            </Modal>
                        </div>
                    </div >
                )
            }
        </>
    )
}