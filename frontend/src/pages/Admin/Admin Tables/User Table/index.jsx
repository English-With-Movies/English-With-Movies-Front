import AdminLoader from "../../../../components/Loaders/AdminLoader"
import { useGetAllAvatarQuery } from "../../../../redux/rtk query/Slices/avatarSlice"
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
import { useNavigate } from "react-router";
import { useAddPointToUserMutation, useChangeUserRoleMutation, useDeleteUserMutation, useGetAllUserQuery, useGetByNameUserQuery, useLockOutUserMutation, useUnLockUserMutation } from "../../../../redux/rtk query/Slices/userSlice";
import { useGetAllSubscriptionQuery } from "../../../../redux/rtk query/Slices/subscription";
import { useState } from "react";
import DateTimeField from "../../../../components/Admin/DateTime Field";

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

// add avatar form yup
let validationSchema = yup.object().shape({
    amount: yup.number()
        .required("Admin, please enter point!")
});

export default function UserTable() {
    let navigate = useNavigate()
    let { data: usersData, refetch, isLoading: usersIsLoading, isError, error } = useGetAllUserQuery()
    let { data: avatarData } = useGetAllAvatarQuery()
    let { data: subscriptionData } = useGetAllSubscriptionQuery()
    let [deleteUser] = useDeleteUserMutation()
    let [addPointToUser] = useAddPointToUserMutation()
    let [changeUserRole] = useChangeUserRoleMutation()
    let [lockOutUser] = useLockOutUserMutation()
    let [unLockUser] = useUnLockUserMutation()
    const [openAddPoint, setOpenAddPoint] = React.useState(false);
    const handleOpenAddPoint = (user) => {
        setOpenAddPoint(true)
        setSelectedUser(user)
    }
    const handleCloseAddPoint = () => setOpenAddPoint(false);

    // change role
    const [selectedUser, setSelectedUser] = React.useState(null);
    const { data: userData, isLoading, refetch: userDataRefetch } = useGetByNameUserQuery(selectedUser?.userName, {
        skip: !selectedUser,
    });
    const [openChangeRole, setOpenChangeRole] = React.useState(false);
    const handleOpenChangeRole = (user) => {
        setSelectedUser(user);
        setOpenChangeRole(true);
    }
    const handleCloseChangeRole = () => setOpenChangeRole(false);

    // delete
    const [openAlert, setOpenAlert] = React.useState(false);
    const handleClickOpen = (user) => {
        setSelectedUser(user)
        setOpenAlert(true);
    };

    const handleClose = () => setOpenAlert(false);

    const handleDeleteUser = async () => {
        try {
            const response = await deleteUser(selectedUser.id)
            if (response.error) {
                alert("❌ Xəta baş verdi")
            }
            setOpenAlert(false);
        } catch (error) {
            console.log(error);
        }
        refetch()
    }

    // lock out user
    const [lockOutData, setLockOutData] = useState({})
    const [openLockOutModal, setOpenLockOutModal] = useState(false);
    const handleOpenLockOut = (lockoutUser) => {
        setLockOutData(lockoutUser)
        setOpenLockOutModal(true);
    }
    const handleCloseLockOut = () => setOpenLockOutModal(false);

    // unlock function
    const handleUnLockUser = async (lockoutUser) => {
        console.log(lockoutUser);
        const response = await unLockUser(lockoutUser.id)
        console.log(response);
        if (response.data == null) {
            alert('Bu istifadəçi artıq bloklanmış deyil')
        } else if (response.error) {
            alert('Xəta baş verdi')
        }
        refetch()
    }

    return (

        usersIsLoading ? (
            <AdminLoader />
        ) : (
            <div className="pt-[50px] text-[var(--admin-text-color)] min-h-[85vh]">
                <div className="relative items-center flex flex-col bg-[var(--admin-bg-color)] rounded-4">
                    <div className="bg-blue-600 font-['Kanit'] text-white py-2 sm:px-5 rounded-4 w-[95%] mx-auto my-0 text-2xl absolute -top-[3%] flex items-center justify-between flex-row">
                        <span>User Table</span>
                        <span onClick={() => navigate('/register')} className="cursor-pointer flex items-center gap-1">Create <CirclePlus /></span>
                    </div>
                    <div className="pt-[50px] w-full px-4 rounded-4 max-[1200px]:overflow-x-scroll">
                        <table className="w-full">
                            <thead className="border-b-2 text-gray-500">
                                <tr>
                                    {
                                        ['# / ', 'Image / ', 'Username / ', 'First name / ', 'Last name / ', 'Email / ', 'Subscription / ', 'Point / ', 'Add point / ', 'Change role / ', 'Delete / ', 'Lock Out / ', 'UnLock'].map((row) => (
                                            <td className="pb-1 mx-1 whitespace-nowrap">{row}</td>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usersData.length ? (
                                        usersData.map((user, index) => {
                                            let userAvatar = avatarData?.find((avatar) => avatar.id == user.avatarId)
                                            let userSubscription = subscriptionData?.find((subc) => subc.id == user.subscriptionId)
                                            return <tr key={user.id} className="border-b">
                                                <td className="p-1">{index + 1}</td>
                                                <td className="p-1">
                                                    <img src={`https://englishwithmovies.blob.core.windows.net/avatar/${userAvatar?.imgName}`} alt="avatar" width={'80px'} height={'80px'} />
                                                </td>
                                                <td className="p-1"><span onClick={() => navigate(`/user/${user.userName}`)} className="cursor-pointer">{user.userName}</span></td>
                                                <td className="p-1">{user.firstName}</td>
                                                <td className="p-1">{user.lastName}</td>
                                                <td className="p-1">{user.email}</td>
                                                <td className="p-1">{userSubscription?.name}</td>
                                                <td className="p-1">{user.point}</td>
                                                <td className="p-1">
                                                    <button onClick={() => handleOpenAddPoint(user)} className="bg-gradient-to-r from-lime-700 to-lime-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Add Point</button>
                                                </td>
                                                <td className="p-1">
                                                    <button onClick={() => handleOpenChangeRole(user)} className="bg-gradient-to-r from-blue-800 to-blue-300 text-white py-1 px-3 rounded-lg max-w-[300px]">Change</button>
                                                </td>
                                                <td className="p-1">
                                                    <button onClick={() => handleClickOpen(user)} className="bg-gradient-to-r from-red-800 to-red-300 text-white py-1 px-3 rounded-lg max-w-[300px]">Delete</button>
                                                </td>
                                                <td className="p-1 whitespace-nowrap">
                                                    <button onClick={() => handleOpenLockOut(user)} className="bg-gradient-to-r from-orange-800 to-orange-300 text-white py-1 px-3 rounded-lg max-w-[300px]">Lock Out</button>
                                                </td>
                                                <td className="p-1 whitespace-nowrap">
                                                    <button onClick={() => handleUnLockUser(user)} className="bg-gradient-to-r from-orange-800 to-orange-300 text-white py-1 px-3 rounded-lg max-w-[300px]">UnLock</button>
                                                </td>
                                            </tr>
                                        })
                                    ) : (
                                        <h3 className="h-[67vh] py-5">User yoxdur!</h3>
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
                                Bunun geridönüşü yoxdur. İstifadəçiyi silmək istədiyinizə əminsiniz?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions className="bg-[var(--admin-page-bg-color)]">
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={() => handleDeleteUser()} autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>

                {/* add point formik */}
                <div>
                    <Modal
                        open={openAddPoint}
                        onClose={handleCloseAddPoint}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{ ...style }} className="max-w-2xl mx-auto" >
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <strong>Add point</strong>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div>
                                    <Formik
                                        initialValues={{ amount: null }}
                                        validationSchema={validationSchema}
                                        onSubmit={async (values) => {
                                            try {
                                                const response = await addPointToUser({ userId: selectedUser?.id, amount: values.amount });
                                                console.log(response);
                                                if (response?.data) {
                                                    alert(response.data.message)
                                                    refetch()
                                                    userDataRefetch()
                                                }
                                                if (response.error) {
                                                    alert("❌ " + response.error.data)
                                                }
                                                refetch()
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
                                            setOpenAddPoint(false)
                                        }}
                                    >
                                        {({ isSubmitting, setFieldValue }) => (
                                            <Form className="flex flex-col">
                                                <label htmlFor="name">Point:</label>
                                                <Field type="number" name="amount" id='amount' className='border-2 border-green-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter point' />
                                                <ErrorMessage name="amount" component="div" />
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

                {/* change role formik */}
                <div>
                    <Modal
                        open={openChangeRole}
                        onClose={handleCloseChangeRole}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{ ...style }} className="max-w-2xl mx-auto">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <strong>Edit Role</strong>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div>
                                    <Formik
                                        initialValues={{ role: "Member" }}
                                        validationSchema={
                                            yup.object({
                                                role: yup.string().required("Please select a role"),
                                            })}
                                        onSubmit={async (values) => {
                                            try {
                                                const response = await changeUserRole({ userId: selectedUser?.id, role: values.role })
                                                refetch()
                                                console.log(response);
                                                if (response.error) {
                                                    alert("❌ Siz bunu edə bilməzsiniz!")
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
                                            setOpenChangeRole(false)
                                        }}
                                    >
                                        {({ isSubmitting, values, setFieldValue }) => (
                                            <Form className="flex flex-col">
                                                {/* Member */}
                                                <div className='flex items-center mt-4 text-lg'>
                                                    <Field
                                                        type="radio"
                                                        name="role"
                                                        id='cbtest-23'
                                                        value="Member"
                                                    />
                                                    <label htmlFor="cbtest-23" className='cursor-pointer font-["PT_Serif"] ml-2'> Member </label>
                                                </div>

                                                {/* Moderator */}
                                                <div className='flex items-center mt-4 text-lg'>
                                                    <Field
                                                        type="radio"
                                                        name="role"
                                                        id='cbtest-22'
                                                        value="Moderator"
                                                    />
                                                    <label htmlFor="cbtest-22" className='cursor-pointer font-["PT_Serif"] ml-2'> Moderator </label>
                                                </div>

                                                {/* Admin */}
                                                <div className='flex items-center mt-4 text-lg'>
                                                    <Field
                                                        type="radio"
                                                        name="role"
                                                        id='cbtest-21'
                                                        value="Admin"
                                                    />
                                                    <label htmlFor="cbtest-21" className='cursor-pointer font-["PT_Serif"] ml-2'> Admin </label>
                                                </div>

                                                {/* SuperAdmin */}
                                                <div className='flex items-center mt-4 text-lg'>
                                                    <Field
                                                        type="radio"
                                                        name="role"
                                                        id='cbtest-20'
                                                        value="SuperAdmin"
                                                    />
                                                    <label htmlFor="cbtest-20" className='cursor-pointer font-["PT_Serif"] ml-2'> SuperAdmin </label>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="mt-3 text-white rounded max-w-[150px] bg-gradient-to-r from-blue-800 to-blue-300 mx-auto px-3 py-1"
                                                >
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
                                                    alert(`${lockOutData.userName} ${response.data.lockoutEnd} tarixinə kimi banlandı`);
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
        )

    )
}