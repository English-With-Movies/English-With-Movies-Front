import { Helmet } from "react-helmet"
import AdminLoader from "../../../../components/Loaders/AdminLoader"
import { useEffect, useState } from "react"
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
import { useDeleteFeedbackMutation, useGetAllFeedbacksQuery, useUpdateReadFeedbackMutation } from "../../../../redux/rtk query/Slices/feedbackSlice"
import { useGetAllUserQuery } from "../../../../redux/rtk query/Slices/userSlice"
import moment from "moment"

// style
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

export default function FeedbackTable() {
    let { data: feedbackData, isLoading: feedbackIsLoading, refetch } = useGetAllFeedbacksQuery()
    let { data: userData } = useGetAllUserQuery()
    let [updateReadFeedback] = useUpdateReadFeedbackMutation()
    let [deleteFeedback] = useDeleteFeedbackMutation()
    let [sortedFeedbacks, setSortedFeedbacks] = useState([])
    useEffect(() => {
        if (!feedbackIsLoading && feedbackData) {
            let sortedFB = feedbackData.toSorted((a, b) => a.isRead - b.isRead)
            setSortedFeedbacks(sortedFB)
        }
    }, [feedbackData, feedbackIsLoading])
    // message modal
    const [message, setMessage] = useState({})
    const [openMessageModal, setOpenMessageModal] = useState(false);
    const handleOpenMessageModal = (feedback) => {
        setMessage(feedback)
        setOpenMessageModal(true);
    }
    const handleCloseMessageModal = () => setOpenMessageModal(false);

    const handleReadFeedback = async (feedback) => {
        const response = await updateReadFeedback(feedback.id)
        if (response.error) {
            alert('❌ ', response.error.data.Message)
        }
        refetch()
    }
    // delete alert
    const [openAlert, setOpenAlert] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState({})
    const handleClickOpen = (feedback) => {
        setSelectedFeedback(feedback)
        setOpenAlert(true);
    };
    const handleClose = () => setOpenAlert(false);
    
    const handleDeleteFeedback = async () => {
        const response = await deleteFeedback(selectedFeedback.id)
        if (response.data == null) {
            alert("Feedback silindi")
        }
        if (response.error) {
            if (response.error.status == 403) {
                alert("❌ Siz feedback silə bilməzsiniz")
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

    return (
        feedbackIsLoading ? (
            <AdminLoader />
        ) : (
            <>
                <Helmet>
                    <title>Feedback Table</title>
                </Helmet>
                <div className="pt-[25px] text-[var(--admin-text-color)] min-h-[85vh]">
                    <div className="relative items-center flex flex-col bg-[var(--admin-bg-color)] rounded-4">
                        <div className="bg-blue-600 font-['Kanit'] text-white py-2 px-3 rounded-4 w-[95%] mx-auto my-0 text-2xl absolute -top-[3%] flex items-center justify-between flex-col sm:flex-row">
                            <span>Feedback Table</span>
                        </div>
                        <div className="pt-[80px] sm:pt-[60px] w-full px-4 rounded-4 max-[900px]:overflow-x-scroll overflow-y-auto max-h-[85vh]">
                            <table className="w-full">
                                <thead className="border-b-2 border-[#8f8f8f] text-gray-500">
                                    <tr>
                                        {
                                            ['# / ', 'Username / ', 'Category / ', 'Message / ', 'Created At / ', 'Is Read / ', 'Read / ', 'Delete'].map((row) => (
                                                <td className="pb-1 mx-1 whitespace-nowrap">{row}</td>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        feedbackData.length ? (
                                            sortedFeedbacks?.map((feedback) => {
                                                let author = userData?.find((user) => user.id === feedback.userId)
                                                return <tr key={feedback.id} className={`border-b border-[#8f8f8f] ${feedback.isRead ? 'line-through opacity-70' : ''}`}>
                                                    <td className="p-2">{feedback.id}</td>
                                                    <td className="p-2">{author?.userName}</td>
                                                    <td className="p-2">{feedback.category}</td>
                                                    <td className="p-2">
                                                        {
                                                            feedback.message.length > 20 ? (
                                                                <div>{feedback.message.slice(0, 20)}<span onClick={() => handleOpenMessageModal(feedback)} className="cursor-pointer">...</span></div>
                                                            ) : (feedback.message)
                                                        }
                                                    </td>
                                                    <td className="p-2">{moment.utc(feedback.createdAt).local().format('DD MMM YYYY HH:mm')}</td>
                                                    <td className="p-2">{feedback.isRead ? 'Read' : 'Not Read'}</td>
                                                    <td className="p-2">
                                                        {
                                                            feedback.isRead ? (
                                                                <button className="bg-gradient-to-r from-orange-800 to-orange-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Has been read</button>
                                                            ) : (
                                                                <button onClick={() => handleReadFeedback(feedback)} className="bg-gradient-to-r from-orange-800 to-orange-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Mark as read</button>
                                                            )
                                                        }

                                                    </td>
                                                    <td className="p-2">
                                                        <button onClick={() => handleClickOpen(feedback)} className="bg-gradient-to-r from-red-800 to-red-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Delete</button>
                                                    </td>
                                                </tr>
                                            })
                                        ) : (
                                            <h3 className="h-[67vh] py-5">Feedback yoxdur!</h3>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div >

                    {/* message modal */}
                    <div>
                        <Modal
                            open={openMessageModal}
                            onClose={handleCloseMessageModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...style }} className="max-w-2xl mx-auto" >
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <strong>{message?.category} message</strong>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>
                                        {message?.message}
                                    </div>
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
                                <Button onClick={() => handleDeleteFeedback()} autoFocus>
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