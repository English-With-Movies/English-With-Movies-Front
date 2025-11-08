import { CirclePlus } from "lucide-react"
import { Helmet } from "react-helmet"
import { useGetAllLevelQuery, usePostLevelMutation, useUpdatePostLevelMutation } from "../../../../redux/rtk query/Slices/levelSlice"
import AdminLoader from "../../../../components/Loaders/AdminLoader"
import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
// post and edit modal
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

// add level form yup
let validationSchema = yup.object().shape({
    name: yup.string()
        .required("Admin, please enter level name!")
        .trim()
        .max(20, "Maximum 20 characters").min(3, "Minimum 3 characters"),
});

export default function LevelTable() {
    let { data: levelData, isLoading: levelIsLoading, refetch } = useGetAllLevelQuery()
    let [postLevel] = usePostLevelMutation()
    let [updatePostLevel] = useUpdatePostLevelMutation()
    const [selectedLevel, setSelectedLevel] = useState({})
    // post modal
    const [openPostModal, setOpenPostModal] = useState(false);
    const handleOpenPostModal = () => setOpenPostModal(true);
    const handleClosePostModal = () => setOpenPostModal(false);
    // edit modal
    const [openEditModal, setOpenEditModal] = useState(false);
    const handleOpenEditModal = (level) => {
        setSelectedLevel(level)
        setOpenEditModal(true);
    }
    const handleCloseEditModal = () => setOpenEditModal(false);

    return (
        levelIsLoading ? (
            <AdminLoader />
        ) : (
            <>
                <Helmet>
                    <title>Level Table</title>
                </Helmet>
                <div className="pt-[25px] text-[var(--admin-text-color)] min-h-[85vh]">
                    <div className="relative items-center flex flex-col bg-[var(--admin-bg-color)] rounded-4">
                        <div className="bg-blue-600 font-['Kanit'] text-white py-3 px-5 rounded-4 w-[95%] mx-auto my-0 text-2xl absolute -top-[3%] flex items-center justify-between flex-col sm:flex-row">
                            <span>Level Table</span>
                            <span onClick={() => handleOpenPostModal()} className="cursor-pointer flex items-center gap-1">Create <CirclePlus /></span>
                        </div>
                        <div className="pt-[100px] sm:pt-[60px] w-full px-4 rounded-4 max-[900px]:overflow-x-scroll">
                            <table className="w-full">
                                <thead className="border-b-2 border-[#8f8f8f] text-gray-500">
                                    <tr>
                                        {
                                            ['# / ', 'Name / ', 'Edit'].map((row) => (
                                                <td className="pb-1 mx-1 whitespace-nowrap">{row}</td>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        levelData.length ? (
                                            levelData.map((level) => (
                                                <tr key={level.id} className="border-b border-[#8f8f8f]">
                                                    <td className="p-1">{level.id}</td>
                                                    <td className="p-1">{level.name}</td>
                                                    <td className="p-1">
                                                        <button onClick={() => handleOpenEditModal(level)} className="bg-gradient-to-r from-blue-800 to-blue-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Edit</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <h3 className="h-[67vh] py-5">Level yoxdur!</h3>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div >


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
                                    <strong>Create Level</strong>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>
                                        <Formik
                                            initialValues={{ name: '' }}
                                            validationSchema={validationSchema}
                                            onSubmit={async (values) => {
                                                const postFormData = new FormData()
                                                postFormData.append("Name", values.name)
                                                try {
                                                    const response = await postLevel(postFormData);
                                                    refetch()
                                                    console.log(response);
                                                    if (response.data) {
                                                        alert("Level yaradıldı")
                                                    }
                                                    if (response.error) {
                                                        if (response.error.status == 403) {
                                                            alert("❌ Siz super admin deyilsiniz")
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
                                                    <label htmlFor="name">Level Name:</label>
                                                    <Field type="text" name="name" id='name' className='border-2 border-green-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter level name' />
                                                    <ErrorMessage name="name" component="div" />

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
                                    <strong>Edit Level</strong>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>
                                        <Formik
                                            initialValues={{ id: selectedLevel.id, name: selectedLevel.name }}
                                            validationSchema={validationSchema}
                                            onSubmit={async (values) => {
                                                const editPostFormData = new FormData()
                                                editPostFormData.append("Id", values.id)
                                                editPostFormData.append("Name", values.name)
                                                try {
                                                    const response = await updatePostLevel(editPostFormData);
                                                    console.log(response);
                                                    refetch()
                                                    if (response.data) {
                                                        alert('Level edit olundu');
                                                        setOpenEditModal(false)
                                                    }
                                                    if (response.error) {
                                                        if (response.error.status == 403) {
                                                            alert("❌ Siz super admin deyilsiniz")
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
                                                    <label htmlFor="name">Level Name:</label>
                                                    <Field type="text" name="name" id='name' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter level name' />
                                                    <ErrorMessage name="name" component="div" />

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