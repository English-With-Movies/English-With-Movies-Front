import AdminLoader from "../../../../components/Loaders/AdminLoader"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
// delete alert
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CirclePlus } from "lucide-react";
// post and edit modal
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Helmet } from "react-helmet";
import { useDeleteFrameMutation, useGetAllFrameQuery, usePostFrameMutation, useUpdatePostFrameMutation } from "../../../../redux/rtk query/Slices/frameSlice";

// post and edit modal style
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

// add frame form yup
let validationSchema = yup.object().shape({
    name: yup.string()
        .required("Admin, please enter frame name!")
        .trim()
        .max(20, "Maximum 20 characters").min(3, "Minimum 3 characters"),
    pointsRequired: yup.number()
        .required("Admin, please enter point!"),
});

export default function FrameTable() {
    let { data: frameData, refetch, isLoading: frameIsLoading } = useGetAllFrameQuery()
    let [deleteFrame] = useDeleteFrameMutation()
    let [postFrame] = usePostFrameMutation()
    let [updatePostFrame] = useUpdatePostFrameMutation()
    // post modal
    const [openPostModal, setOpenPostModal] = React.useState(false);
    const handleOpenPostModal = () => setOpenPostModal(true);
    const handleClosePostModal = () => setOpenPostModal(false);
    // edit modal
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const handleOpenEditModal = (frame) => {
        setSelectedFrame(frame)
        setOpenEditModal(true);
    }
    const handleCloseEditModal = () => setOpenEditModal(false);

    // delete
    const [openAlert, setOpenAlert] = React.useState(false);
    const [selectedFrame, setSelectedFrame] = React.useState({})

    const handleClickOpen = (frame) => {
        setSelectedFrame(frame)
        setOpenAlert(true);
    };
    const handleClose = () => setOpenAlert(false);

    const handleDeleteFrame = async () => {
        const response = await deleteFrame(selectedFrame.id)
        if (response.data == null) {
            alert('Frame silindi')
        } else if (response.error) {
            alert('Xəta baş verdi')
        }  
        setOpenAlert(false);
        refetch()
    }

    return (
        frameIsLoading ? (
            <AdminLoader />
        ) : (
            <>
                <Helmet>
                    <title>Frame Table</title>
                </Helmet>
                <div className="pt-[50px] text-[var(--admin-text-color)] min-h-[85vh]">
                    <div className="relative items-center flex flex-col bg-[var(--admin-bg-color)] rounded-4">
                        <div className="bg-blue-600 font-['Kanit'] text-white py-3 px-5 rounded-4 w-[95%] mx-auto my-0 text-2xl absolute -top-[3%] flex items-center justify-between flex-col sm:flex-row">
                            <span>Frame Table</span>
                            <span onClick={() => handleOpenPostModal()} className="cursor-pointer flex items-center gap-1">Create <CirclePlus /></span>
                        </div>
                        <div className="pt-[50px] w-full px-4 rounded-4 max-[900px]:overflow-x-scroll">
                            <table className="w-full">
                                <thead className="border-b-2 border-[#8f8f8f] text-gray-500">
                                    <tr>
                                        {
                                            ['# / ', 'Image / ', 'Name / ', 'Points Required / ', 'IsPremium / ', 'Edit / ', 'Delete'].map((row) => (
                                                <td className="pb-1 mx-1 whitespace-nowrap">{row}</td>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        frameData.length ? (
                                            frameData.map((frame) => (
                                                <tr key={frame.id} className="border-b border-[#8f8f8f]">
                                                    <td className="p-1">{frame.id}</td>
                                                    <td className="p-1">
                                                        <img src={`https://englishwithmovies.blob.core.windows.net/frame/${frame.imgName}`} alt="frame" width={'80px'} height={'80px'} />
                                                    </td>
                                                    <td className="p-1">{frame.name}</td>
                                                    <td className="p-1">{frame.pointsRequired}</td>
                                                    <td className="p-1">{frame.isPremium ? 'Premium' : 'Not Premium'}</td>
                                                    <td className="p-1">
                                                        <button onClick={() => handleOpenEditModal(frame)} className="bg-gradient-to-r from-blue-800 to-blue-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Edit</button>
                                                    </td>
                                                    <td className="p-1">
                                                        <button onClick={() => handleClickOpen(frame)} className="bg-gradient-to-r from-red-800 to-red-300 text-white py-1 px-3 rounded-lg max-w-[300px]">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <h3 className="h-[67vh] py-5">Frame yoxdur!</h3>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div >

                    {/* delete alert */}
                    <React.Fragment>
                        <Dialog
                            open={openAlert}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title" className="bg-[var(--admin-page-bg-color)]">
                                {"Are you sure you want to delete this?"}
                            </DialogTitle>
                            <DialogContent className="bg-[var(--admin-page-bg-color)]">
                                <DialogContentText id="alert-dialog-description">
                                    This action cannot be undone. Are you sure you want to proceed?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions className="bg-[var(--admin-page-bg-color)]">
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={() => handleDeleteFrame()} autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment> 

                    {/* post modal formik */}
                    <div>
                        <Modal
                            open={openPostModal}
                            onClose={handleClosePostModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...style }} className="max-w-2xl mx-auto" >
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <strong>Create Frame</strong>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>
                                        <Formik
                                            initialValues={{ name: '', imgName: null, pointsRequired: null, isPremium: false }}
                                            validationSchema={validationSchema}
                                            onSubmit={async (values) => {
                                                const postFormData = new FormData()
                                                postFormData.append("Name", values.name)
                                                postFormData.append("Image", values.imgName)
                                                postFormData.append("IsPremium", values.isPremium)
                                                if (values.isPremium) {
                                                    postFormData.append("PointsRequired", 0)
                                                } else {
                                                    postFormData.append("PointsRequired", values.pointsRequired)
                                                }
                                                try {
                                                    const response = await postFrame(postFormData);
                                                    refetch()
                                                    if (response.data) {
                                                        alert("Successfully")
                                                    }
                                                    if (response.error) {
                                                        if (response.error.status == 403) {
                                                            alert("❌ Siz bu funksiyanı edə bilməzsiniz")
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
                                                setOpenPostModal(false)
                                            }}
                                        >
                                            {({ isSubmitting, setFieldValue }) => (
                                                <Form className="flex flex-col">
                                                    <label htmlFor="name">Frame Name:</label>
                                                    <Field type="text" name="name" id='name' className='border-2 border-green-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter frame name' />
                                                    <ErrorMessage name="name" component="div" className="text-red-600" />

                                                    <label htmlFor="imgName" className="mt-2">Frame Image:</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        name="imgName"
                                                        onChange={(event) => {
                                                            setFieldValue("imgName", event.currentTarget.files[0]);
                                                        }}
                                                        className="border-2 border-green-400 rounded py-1 px-2 focus:outline-none"
                                                        required
                                                    />
                                                    <ErrorMessage name="imgName" component="div" />

                                                    <label htmlFor="pointsRequired" className="mt-2">Frame Points Required:</label>
                                                    <Field type="number" name="pointsRequired" id='pointsRequired' className='border-2 border-green-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter frame points required' />
                                                    <ErrorMessage name="pointsRequired" component="div" className="text-red-600" />

                                                    <div className='flex items-center checkbox-wrapper-19 mt-2'>
                                                        <Field type="checkbox" name="isPremium" id='cbtest-2'
                                                            className="p-2 border-2 border-[#06b6d4] rounded cursor-pointer" />
                                                        <label htmlFor="cbtest-2" className='check-box border-black'></label>
                                                        <label htmlFor="cbtest-2" className='cursor-pointer ml-2'> Is Premium? </label>
                                                    </div>

                                                    <button type="submit" disabled={isSubmitting} className="mt-3 text-white rounded max-w-[150px] bg-gradient-to-r from-green-800 to-green-300 mx-auto px-3 py-1">
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

                    {/* edit modal formik */}
                    <div>
                        <Modal
                            open={openEditModal}
                            onClose={handleCloseEditModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...style }} className="max-w-2xl mx-auto">
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <strong>Edit Frame</strong>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>
                                        <Formik
                                            initialValues={{ id: selectedFrame.id, name: selectedFrame.name, imgName: null, pointsRequired: selectedFrame.pointsRequired, isPremium: selectedFrame.isPremium }}
                                            validationSchema={validationSchema}
                                            onSubmit={async (values) => {
                                                const editPostFormData = new FormData()
                                                editPostFormData.append("Id", values.id)
                                                editPostFormData.append("Name", values.name)
                                                if (values.imgName != null) {
                                                    editPostFormData.append("Image", values.imgName)
                                                }
                                                editPostFormData.append("IsPremium", values.isPremium)
                                                if (values.isPremium) {
                                                    editPostFormData.append("PointsRequired", 0)
                                                } else {
                                                    editPostFormData.append("PointsRequired", values.pointsRequired)
                                                }
                                                try {
                                                    const response = await updatePostFrame(editPostFormData);
                                                    console.log(response);
                                                    
                                                    refetch()
                                                    if (response.data) {
                                                        alert('Frame edit olundu');
                                                        setOpenEditModal(false)
                                                    }
                                                    if (response.error) {
                                                        if (response.error.status == 403) {
                                                            alert("❌ Siz bu funksiyanı edə bilməzsiniz")
                                                            return;
                                                        }
                                                        if (response.error.status == 400) {
                                                            alert(response.error?.data?.Message)
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
                                            {({ isSubmitting, setFieldValue }) => (
                                                <Form className="flex flex-col">
                                                    <label htmlFor="name">Frame Name:</label>
                                                    <Field type="text" name="name" id='name' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter frame name' />
                                                    <ErrorMessage name="name" component="div" className="text-600-red" />

                                                    <label htmlFor="imgName" className="mt-2">Frame Image:</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        name="imgName"
                                                        onChange={(event) => {
                                                            setFieldValue("imgName", event.currentTarget.files[0]);
                                                        }}
                                                        className="border-2 border-blue-400 rounded py-1 px-2 focus:outline-none"
                                                    />
                                                    <ErrorMessage name="imgName" component="div" />
                                                    <img src={`https://englishwithmovies.blob.core.windows.net/frame/${selectedFrame.imgName}`} width={'80px'} height={'80px'} className="mt-1" alt="editPhoto" />

                                                    <label htmlFor="pointsRequired" className="mt-2">Frame Points Required:</label>
                                                    <Field type="number" name="pointsRequired" id='pointsRequired' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter frame points required' />
                                                    <ErrorMessage name="pointsRequired" component="div" className="text-red-600" />

                                                    <div className='flex items-center checkbox-wrapper-19 mt-2'>
                                                        <Field type="checkbox" name="isPremium" id='cbtest-2'
                                                            className="p-2 border-2 border-[#06b6d4] rounded cursor-pointer" />
                                                        <label htmlFor="cbtest-2" className='check-box border-black'></label>
                                                        <label htmlFor="cbtest-2" className='cursor-pointer ml-2'> Is Premium? </label>
                                                    </div>

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