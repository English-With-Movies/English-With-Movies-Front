import { Helmet } from "react-helmet"
import AdminLoader from "../../../../components/Loaders/AdminLoader"
import { useState } from "react"
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
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
import { useDeleteReportMutation, useGetAllReportQuery, useUpdateReadReportMutation } from "../../../../redux/rtk query/Slices/userReportSlice"
import { useEffect } from "react"
import { useGetAllUserQuery, useLockOutUserMutation, useUnLockUserMutation } from "../../../../redux/rtk query/Slices/userSlice"
import moment from "moment"
import DateTimeField from "../../../../components/Admin/DateTime Field"

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


export default function UserReportTable() {
    let { data: reportData, isLoading: reportIsLoading, refetch } = useGetAllReportQuery()
    let [updateReadReport] = useUpdateReadReportMutation()
    let [deleteReport] = useDeleteReportMutation()
    let [lockOutUser] = useLockOutUserMutation()
    let [unLockUser] = useUnLockUserMutation()
    let { data: userData } = useGetAllUserQuery()
    const userMap = React.useMemo(() => {
        return userData?.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
        }, {});
    }, [userData]);
    let [sortedReports, setSortedReports] = useState([])
    useEffect(() => {
        if (!reportIsLoading && reportData) {
            let sorted = reportData.toSorted((a, b) => a.isRead - b.isRead)
            setSortedReports(sorted)
        }
    }, [reportData, reportIsLoading])
    // description modal
    const [description, setDescription] = useState({})
    const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
    const handleOpenDescModal = (report) => {
        setDescription(report)
        setOpenDescriptionModal(true);
    }
    const handleCloseDescModal = () => setOpenDescriptionModal(false);

    const handleReadReport = async (report) => {
        const response = await updateReadReport(report.id)
        if (response.error) {
            alert('❌ ', response.error.data.Message)
        }
        refetch()
    }
    const [selectedReport, setSelectedReport] = useState({})
    // delete alert
    const [openAlert, setOpenAlert] = React.useState(false);
    const handleClickOpen = (report) => {
        setSelectedReport(report)
        setOpenAlert(true);
    };
    const handleClose = () => setOpenAlert(false);

    const handleDeleteReport = async () => {
        const response = await deleteReport(selectedReport.id)
        console.log(response);

        if (response.data == null) {
            alert("Report silindi")
        }
        if (response.error) {
            if (response.error.status == 403) {
                alert("❌ Siz report silə bilməzsiniz")
                return
            }
            alert("❌ Xəta baş verdi")
        }

        setOpenAlert(false);
        refetch()
    }

    // lock out reported user
    const [lockOutData, setLockOutData] = useState({})
    const [openLockOutModal, setOpenLockOutModal] = useState(false);
    const handleOpenLockOut = (reportedUser) => {
        setLockOutData(reportedUser)
        setOpenLockOutModal(true);
    }
    const handleCloseLockOut = () => setOpenLockOutModal(false);

    // unlock function
    const handleUnLockUser = async (reportedUser) => {
        console.log(reportedUser);
        const response = await unLockUser(reportedUser.id)
        console.log(response);
        if (response.data == null) {
            alert('Bu istifadəçi artıq bloklanmış deyil')
        } else if (response.error) { 
            alert('Xəta baş verdi')
        }
        refetch()
    }

    return (
        reportIsLoading ? (
            <AdminLoader />
        ) : (
            <>
                <Helmet>
                    <title>User Report Table</title>
                </Helmet>
                <div className="pt-[25px] text-[var(--admin-text-color)] min-h-[85vh]">
                    <div className="relative items-center flex flex-col bg-[var(--admin-bg-color)] rounded-4">
                        <div className="bg-blue-600 font-['Kanit'] text-white py-3 px-5 rounded-4 w-[95%] mx-auto my-0 text-2xl absolute -top-[3%] flex items-center justify-between flex-col sm:flex-row">
                            <span>User Report Table</span>
                        </div>
                        <div className="pt-[50px] w-full px-4 rounded-4 overflow-x-scroll">
                            <table className="w-full">
                                <thead className="border-b-2 text-gray-500">
                                    <tr>
                                        {
                                            ['# / ', 'Reporter user / ', 'Reported user / ', 'Reason / ', 'Description / ', 'Created at / ', 'is Read / ', 'Read / ', 'Delete / ', 'Lock Out / ', 'UnLock'].map((row) => (
                                                <td className="pb-1 mx-1 whitespace-nowrap">{row}</td>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reportData.length ? (
                                            sortedReports?.map((report) => {
                                                let reporterUser = userMap?.[report.reporterUserId];
                                                let reportedUser = userMap?.[report.reportedUserId];
                                                return <tr key={report.id} className={`border-b border-[#8f8f8f] ${report.isRead ? 'line-through opacity-70' : ''}`}>
                                                    <td className="p-1 whitespace-nowrap">{report.id}</td>
                                                    <td className="p-1 whitespace-nowrap">{reporterUser?.userName || "Unknown"}</td>
                                                    <td className="p-1 whitespace-nowrap">{reportedUser?.userName || "Unknown"}</td>
                                                    <td className="p-1 whitespace-nowrap">{report.reason}</td>
                                                    <td className="p-1 whitespace-nowrap">
                                                        {
                                                            report?.description?.length > 20 ? (
                                                                <div>{report.description.slice(0, 20)}<span onClick={() => handleOpenDescModal(report)} className="cursor-pointer">...</span></div>
                                                            ) : (report.description)
                                                        }
                                                    </td>
                                                    <td className="p-1 whitespace-nowrap">{moment.utc(report.createdAt).local().format('DD MMM YYYY HH:mm')}</td>
                                                    <td className="p-1 whitespace-nowrap">{report.isRead ? 'Read' : 'Not Read'}</td>
                                                    <td className="p-1 whitespace-nowrap">
                                                        {
                                                            report.isRead ? (
                                                                <button className="bg-gradient-to-r from-blue-800 to-blue-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Has been read</button>
                                                            ) : (
                                                                <button onClick={() => handleReadReport(report)} className="bg-gradient-to-r from-blue-800 to-blue-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Mark as read</button>
                                                            )
                                                        }
                                                    </td>
                                                    <td className="p-1 whitespace-nowrap">
                                                        <button onClick={() => handleClickOpen(report)} className="bg-gradient-to-r from-red-800 to-red-300 text-white py-1 px-3 rounded-lg max-w-[300px]">Delete</button>
                                                    </td>
                                                    <td className="p-1 whitespace-nowrap">
                                                        <button onClick={() => handleOpenLockOut(reportedUser)} className="bg-gradient-to-r from-orange-800 to-orange-300 text-white py-1 px-3 rounded-lg max-w-[300px]">Lock Out</button>
                                                    </td>
                                                    <td className="p-1 whitespace-nowrap">
                                                        <button onClick={() => handleUnLockUser(reportedUser)} className="bg-gradient-to-r from-orange-800 to-orange-300 text-white py-1 px-3 rounded-lg max-w-[300px]">UnLock</button>
                                                    </td>
                                                </tr>
                                            })
                                        ) : (
                                            <h3 className="h-[67vh] py-5">Reported User yoxdur!</h3>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div >

                    {/* description modal */}
                    <div>
                        <Modal
                            open={openDescriptionModal}
                            onClose={handleCloseDescModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...style }} className="max-w-2xl mx-auto text-lg" >
                                <Typography id="modal-modal-description">
                                    <div>
                                        {description?.description}
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
                                <Button onClick={() => handleDeleteReport()} autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>

                    {/* lock out modal */}
                    <div>
                        <Modal
                            open={openLockOutModal}
                            onClose={handleCloseLockOut}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...style }} className="max-w-2xl mx-auto text-lg rounded" >
                                <Typography id="modal-modal-description">
                                    <div>
                                        <Formik
                                            initialValues={{ duration: '' }}
                                            onSubmit={async (values) => {
                                                console.log(values);
                                                try {
                                                    const response = await lockOutUser({ userId: lockOutData?.id, durationInMinutes: values.duration });
                                                    console.log(response);
                                                    refetch()
                                                    if (response.data) {
                                                        alert('İstifadəçi banlandı');
                                                        setOpenLockOutModal(false)
                                                    }
                                                    if (response.error) {
                                                        if (response.error.status == 400) {
                                                            if (response.error?.data?.Message) {
                                                                alert(response.error?.data?.Message)
                                                            } if (response.error?.data?.errors?.durationInMinutes) {
                                                                alert(response.error?.data?.errors?.durationInMinutes)
                                                            }
                                                            return;
                                                        }
                                                        if (response.error.status == 403) {
                                                            alert("❌ Siz istifadəçi banlaya bilməzsiniz")
                                                            return;
                                                        }
                                                        alert("❌ Xəta baş verdi")
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
                                            }}
                                        >
                                            {({ isSubmitting }) => (
                                                <Form className="flex flex-col">
                                                    <label htmlFor="duration" className="font-semibold">Duration:</label>
                                                    <DateTimeField name={'duration'} />
                                                    <ErrorMessage name="duration" component="div" />

                                                    <button type="submit" disabled={isSubmitting} className="mt-3 text-white rounded max-w-[150px] bg-gradient-to-r from-blue-800 to-blue-300 mx-auto px-3 py-1">
                                                        Submit
                                                    </button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                </div >
            </>
        )
    )
}