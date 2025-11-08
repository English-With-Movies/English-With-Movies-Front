import { Helmet } from "react-helmet"
import AdminLoader from "../../../../components/Loaders/AdminLoader"
import { useApproveBlogMutation, useDeleteBlogMutation, useGetAllBlogsQuery, useUnApproveBlogMutation } from "../../../../redux/rtk query/Slices/blogSlice"
import { CirclePlus } from "lucide-react"
import moment from "moment"
import { useGetAllUserQuery } from "../../../../redux/rtk query/Slices/userSlice"
import { useNavigate } from "react-router"
// delete alert
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// modal
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react"

// modal style
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

export default function BlogTable() {
    const navigate = useNavigate()
    let { data: blogData, isLoading: blogIsLoading, refetch } = useGetAllBlogsQuery()
    let { data: userData } = useGetAllUserQuery()
    let [deleteBlog] = useDeleteBlogMutation()
    let [approveBlog] = useApproveBlogMutation()
    let [unApproveBlog] = useUnApproveBlogMutation()
    // content modal
    let [contentModal, setContentModal] = useState(null)
    let [openContentModal, setOpenContentModal] = useState(false)
    const handleCloseContentModal = () => setOpenContentModal(false)
    const handleOpenContentModal = () => setOpenContentModal(true)
    // delete alert
    const [openAlert, setOpenAlert] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState({})
    const handleClickOpen = (blog) => {
        setSelectedBlog(blog)
        setOpenAlert(true);
    };
    const handleClose = () => setOpenAlert(false);
    const handleDeleteBlog = async () => {
        const response = await deleteBlog(selectedBlog.id)
        console.log(response);
        if (response.data == null) {
            alert("Blog silindi")
        }
        if (response.error) {
            if (response.error.status == 403) {
                alert("❌ Siz blog silə bilməzsiniz")
                return
            }
            if (response.error.status == 404) {
                alert("❌ ", response.error.data.Message)
                return
            }
            alert("❌ Xəta baş verdi")
        }
        setOpenAlert(false);
        refetch()
    }

    const handleApproveBlog = async (blog) => {
        const response = await approveBlog(blog.id)
        console.log(response);
        if (response.error) {
            if (response.error.status == 403) {
                alert('❌ Siz bu funksiyanı edə bilməzsiniz')
                return;
            }
            if (response.error.status == 400) {
                alert(response.error.data.Message)
                return;
            }
            alert('❌ Xəta baş verdi')
        }
        refetch()
    }
    const handleUnApproveBlog = async (blog) => {
        const response = await unApproveBlog(blog.id)
        console.log(response);
        if (response.error) {
            if (response.error.status == 403) {
                alert('❌ Siz bu funksiyanı edə bilməzsiniz')
                return;
            }
            if (response.error.status == 400) {
                alert(response.error.data.Message)
                return;
            }
            alert('❌ Xəta baş verdi')
        }
        refetch()
    }

    return (
        blogIsLoading ? (
            <AdminLoader />
        ) : (
            <>
                <Helmet>
                    <title>Blog Table</title>
                </Helmet>
                <div className="pt-[20px] text-[var(--admin-text-color)] min-h-[85vh]">
                    <div className="relative items-center flex flex-col bg-[var(--admin-bg-color)] rounded-4">
                        <div className="bg-blue-600 font-['Kanit'] text-white py-2 px-3 rounded-4 w-[95%] mx-auto my-0 text-2xl absolute -top-[5%] flex items-center justify-between flex-col sm:flex-row">
                            <span>Blog Table</span>
                            <span onClick={() => navigate('/blog/create')} className="cursor-pointer flex items-center gap-1">Create <CirclePlus /></span>
                        </div>
                        <div className="pt-[50px] w-full px-4 rounded-4 overflow-x-scroll">
                            <table className="w-full">
                                <thead className="border-b-2 text-gray-500">
                                    <tr>
                                        {
                                            ['# / ', 'Author / ', 'Title / ', 'Content / ', 'Created At / ', 'isApproved / ', 'Approve/UnApprove / ', 'Delete'].map((row) => (
                                                <td key={row} className="pb-1 mx-1 whitespace-nowrap">{row}</td>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        blogData.length ? (
                                            blogData.map((blog) => {
                                                let author = userData?.find((user) => user.id === blog.authorId)
                                                return <tr key={blog.id} className="border-b">
                                                    <td className="p-1">{blog.id}</td>
                                                    <td className="p-1">{author?.userName}</td>
                                                    <td className="p-1">{blog.title}</td>
                                                    <td className="p-1">
                                                        <button onClick={() => { setContentModal(blog), handleOpenContentModal() }} className="bg-gradient-to-r from-blue-800 to-blue-400 text-white py-1 px-2 rounded-lg max-w-[300px]">See content</button>
                                                    </td>
                                                    <td className="p-1">{moment.utc(blog.createdAt).local().format('DD MMM YYYY HH:mm')}</td>
                                                    <td className="p-1">{blog.isApproved ? 'Approved' : 'Not Approved'}</td>
                                                    <td className="p-1">
                                                        {
                                                            blog.isApproved ? (
                                                                <button onClick={() => handleUnApproveBlog(blog)} className="bg-gradient-to-r from-orange-800 to-orange-400 text-white py-1 px-3 rounded-lg max-w-[300px]">UnApprove</button>
                                                            ) : (
                                                                <button onClick={() => handleApproveBlog(blog)} className="bg-gradient-to-r from-orange-800 to-orange-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Approve</button>
                                                            )
                                                        }

                                                    </td>
                                                    <td className="p-1">
                                                        <button onClick={() => handleClickOpen(blog)} className="bg-gradient-to-r from-red-800 to-red-300 text-white py-1 px-3 rounded-lg max-w-[300px]">Delete</button>
                                                    </td>
                                                </tr>
                                            })
                                        ) : (
                                            <h3 className="h-[67vh] py-5">Blog yoxdur!</h3>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div >

                    {/* content modal */}
                    <div className="overflow-y-scroll">
                        <Modal
                            open={openContentModal}
                            onClose={handleCloseContentModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                ...style,
                                maxWidth: "1320px",
                                maxHeight: "80vh",
                                overflowY: "auto"
                            }} className="mx-auto" >
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <strong>{contentModal?.title}</strong>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className="break-all" dangerouslySetInnerHTML={{ __html: contentModal?.content }} />
                                </Typography>
                            </Box>
                        </Modal>
                    </div>

                    {/* delete alert */}
                    <React.Fragment>
                        <Dialog
                            open={openAlert}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title" className="bg-[var(--admin-page-bg-color)] text-[var(--admin-text-color)]">
                                {"Are you sure you want to delete this?"}
                            </DialogTitle>
                            <DialogContent className="bg-[var(--admin-page-bg-color)]">
                                <DialogContentText id="alert-dialog-description">
                                    <span className="text-[var(--admin-text-color)]">This action cannot be undone. Are you sure you want to proceed?</span>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions className="bg-[var(--admin-page-bg-color)]">
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={() => handleDeleteBlog()} autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>

                </div >
            </>
        )
    )
}