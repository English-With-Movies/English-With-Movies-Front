import { Helmet } from "react-helmet"
import AdminLoader from "../../../../components/Loaders/AdminLoader"
import { useState } from "react"
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
// modal
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import moment from "moment"
import { useDeleteSettingMutation, useGetAllSettingsQuery, usePostSettingMutation, useUpdatePostSettingMutation } from "../../../../redux/rtk query/Slices/settingsSlice";
import { CirclePlus } from "lucide-react";

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

let validationSchema = yup.object().shape({
    key: yup.string()
        .required("Admin, please enter setting key!")
        .trim(),
    value: yup.string()
        .required("Admin, please enter setting value!")
        .trim(),
});

export default function SettingsTable() {
    let { data: settingsData, isLoading: settingsIsLoading, refetch } = useGetAllSettingsQuery()
    let [postSetting] = usePostSettingMutation()
    let [updatePostSetting] = useUpdatePostSettingMutation()
    let [deleteSetting] = useDeleteSettingMutation()

    // value modal
    const [value, setValue] = useState({})
    const [openValueModal, setOpenValueModal] = useState(false);
    const handleOpenValueModal = (setting) => {
        setValue(setting)
        setOpenValueModal(true);
    }
    const handleCloseValueModal = () => setOpenValueModal(false);

    // post modal
    const [openPostModal, setOpenPostModal] = React.useState(false);
    const handleOpenPostModal = () => setOpenPostModal(true);
    const handleClosePostModal = () => setOpenPostModal(false);
    // edit modal
    let [selectedSetting, setSelectedSetting] = useState({})
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const handleOpenEditModal = (setting) => {
        setSelectedSetting(setting)
        setOpenEditModal(true);
    }
    const handleCloseEditModal = () => setOpenEditModal(false);

    // delete alert
    const [openAlert, setOpenAlert] = useState(false);
    const handleClickOpen = (setting) => {
        setSelectedSetting(setting)
        setOpenAlert(true);
    };
    const handleClose = () => setOpenAlert(false);

    const handleDeleteSetting = async () => {
        const response = await deleteSetting(selectedSetting.id)
        console.log(response);
        
        if (response.data == null) {
            alert("Setting silindi")
        }
        if (response.error) {
            if (response.error.status == 403) {
                alert("❌ Siz setting silə bilməzsiniz")
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
        settingsIsLoading ? (
            <AdminLoader />
        ) : (
            <>
                <Helmet>
                    <title>Settings Table</title>
                </Helmet>
                <div className="pt-[25px] text-[var(--admin-text-color)] min-h-[85vh]">
                    <div className="relative items-center flex flex-col bg-[var(--admin-bg-color)] rounded-4">
                        <div className="bg-blue-600 font-['Kanit'] text-white py-2 px-3 rounded-4 w-[95%] mx-auto my-0 text-2xl absolute -top-[3%] flex items-center justify-between flex-col sm:flex-row">
                            <span>Settings Table</span>
                            <span onClick={() => handleOpenPostModal()} className="cursor-pointer flex items-center gap-1">Create <CirclePlus /></span>
                        </div>
                        <div className="pt-[80px] sm:pt-[60px] w-full px-4 rounded-4 overflow-x-scroll overflow-y-auto max-h-[85vh]">
                            <table className="w-full">
                                <thead className="border-b-2 border-[#8f8f8f] text-gray-500">
                                    <tr>
                                        {
                                            ['# / ', 'Key / ', 'Value / ', 'Created At / ', 'Edit / ', 'Delete'].map((row) => (
                                                <td className="pb-1 mx-1 whitespace-nowrap">{row}</td>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        settingsData.length ? (
                                            settingsData?.map((setting) => (
                                                <tr key={setting.id} className={`border-b border-[#8f8f8f]`}>
                                                    <td className="p-2">{setting.id}</td>
                                                    <td className="p-2">{setting.key}</td>
                                                    <td className="p-2">
                                                        <button onClick={() => handleOpenValueModal(setting)} className="bg-gradient-to-r from-gray-700 to-gray-400 text-white py-1 px-3 rounded-lg max-w-[300px]">See Value</button>
                                                    </td>
                                                    <td className="p-2">{moment.utc(setting.createdAt).local().format('DD MMM YYYY HH:mm')}</td>
                                                    <td className="p-2">
                                                        <button onClick={() => handleOpenEditModal(setting)} className="bg-gradient-to-r from-blue-800 to-blue-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Edit</button>
                                                    </td>
                                                    <td className="p-2">
                                                        <button onClick={() => handleClickOpen(setting)} className="bg-gradient-to-r from-red-800 to-red-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <h3 className="h-[67vh] py-5">Setting yoxdur!</h3>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div >

                    {/* message modal */}
                    <div>
                        <Modal
                            open={openValueModal}
                            onClose={handleCloseValueModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...style }} className="max-w-2xl mx-auto" >
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <strong>{value?.key} value</strong>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>
                                        {value?.value}
                                    </div>
                                </Typography>
                            </Box>
                        </Modal>
                    </div>

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
                                    <strong>Create Setting</strong>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>
                                        <Formik
                                            initialValues={{ key: '', value: '' }}
                                            validationSchema={validationSchema}
                                            onSubmit={async (values) => {
                                                const postFormData = new FormData()
                                                postFormData.append("Key", values.key)
                                                postFormData.append("Value", values.value)
                                                try {
                                                    const response = await postSetting(postFormData);
                                                    console.log(response);
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
                                            {({ isSubmitting }) => (
                                                <Form className="flex flex-col">
                                                    <label htmlFor="key">Setting Key:</label>
                                                    <Field type="text" name="key" id='key' className='border-2 border-green-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter setting key' />
                                                    <ErrorMessage name="key" component="div" className="text-red-600" />

                                                    <label htmlFor="value" className="mt-2">Setting Value:</label>
                                                    <Field type="text" name="value" id='value' className='border-2 border-green-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter setting value' />
                                                    <ErrorMessage name="value" component="div" className="text-red-600" />

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
                                <Button onClick={() => handleDeleteSetting()} autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>

                    {/* edit modal formik*/}
                    <div>
                        <Modal
                            open={openEditModal}
                            onClose={handleCloseEditModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...style }} className="max-w-2xl mx-auto">
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <strong>Edit Setting</strong>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>
                                        <Formik
                                            initialValues={{ id: selectedSetting.id, key: selectedSetting.key, value: selectedSetting.value }}
                                            validationSchema={validationSchema}
                                            onSubmit={async (values) => {
                                                const editPostFormData = new FormData()
                                                editPostFormData.append("Id", values.id)
                                                editPostFormData.append("Key", values.key)
                                                editPostFormData.append("Value", values.value)
                                                try {
                                                    const response = await updatePostSetting(editPostFormData);
                                                    console.log(response);
                                                    refetch()
                                                    if (response.data) {
                                                        alert('Setting edit olundu');
                                                        setOpenEditModal(false)
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
                                            }}
                                        >
                                            {({ isSubmitting }) => (
                                                <Form className="flex flex-col">
                                                    <label htmlFor="key">Setting Key:</label>
                                                    <Field type="text" name="key" id='key' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter setting key' />
                                                    <ErrorMessage name="key" component="div" className="text-red-600" />

                                                    <label htmlFor="key" className="mt-2">Setting Value:</label>
                                                    <Field type="text" name="value" id='value' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter setting value' />
                                                    <ErrorMessage name="value" component="div" className="text-red-600" />

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