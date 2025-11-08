import React, { useState, useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import { useDeleteWordMutation, useGetAllWordsQuery, usePostWordMutation, useUpdatePostWordMutation } from '../../../../redux/rtk query/Slices/wordSlice';
import { useGetAllLevelQuery } from '../../../../redux/rtk query/Slices/levelSlice';
import AdminLoader from '../../../../components/Loaders/AdminLoader';
import { Helmet } from 'react-helmet';
import { CirclePlus } from 'lucide-react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import GenresSelectOption from "../../../../components/Admin/Admin Movie Table Components/GenresSelectOption";
// delete alert
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GenresEditSelectOption from "../../../../components/Admin/Admin Movie Table Components/GenresEditSelectOption";
import { useNavigate } from "react-router";

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

// add movie form yup
let validationSchema = yup.object().shape({
    wordText: yup.string()
        .required("Admin, please enter word text!")
        .trim(),
    meaning: yup.string()
        .required("Admin, please enter word meaning!")
        .trim()
});


export default function WordTable() {
    let [postWord] = usePostWordMutation()
    let [updatePostWord] = useUpdatePostWordMutation()
    let [deleteWord] = useDeleteWordMutation()
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const { data: wordData, isLoading, isError, refetch } = useGetAllWordsQuery({ pageNumber: currentPage, pageSize });
    let { data: allLevel } = useGetAllLevelQuery()

    // post modal
    const [openPostModal, setOpenPostModal] = useState(false);
    const handleOpenPostModal = () => setOpenPostModal(true);
    const handleClosePostModal = () => setOpenPostModal(false);
    // edit modal
    const [selectedWord, setSelectedWord] = useState({})
    const [openEditModal, setOpenEditModal] = useState(false);
    const handleOpenEditModal = (word) => {
        setSelectedWord(word)
        setOpenEditModal(true);
    }
    const handleCloseEditModal = () => {
        setSelectedWord({})
        setOpenEditModal(false);
    }
    // delete alert
    const [openAlert, setOpenAlert] = React.useState(false);
    const handleClickOpen = (word) => {
        setSelectedWord(word)
        setOpenAlert(true);
    };
    const handleClose = () => setOpenAlert(false);
    const handleDeleteWord = async () => {
        const response = await deleteWord(selectedWord.id)
        if (response.data == null) {
            alert("Söz silindi")
        }
        if (response.error) {
            if (response.error.status == 403) {
                alert("❌ Siz söz silə bilməzsiniz")
                return
            }
            alert("❌ Xəta baş verdi")
        }
        setOpenAlert(false);
        refetch()
    }

    useEffect(() => {
        if (!wordData?.length) {
            setHasNextPage(false);
        } else {
            setHasNextPage(true);
        }
    }, [wordData]);

    if (isError) return <p>Error loading words.</p>;

    const wordsToShow = wordData || [];
    const handleChangePage = (page) => {
        if (!hasNextPage) {
            setCurrentPage(1);
        } else {
            setCurrentPage(page);
        }
    };
    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
    };
    useEffect(() => {
        if (wordsToShow?.length === 0) {
            setCurrentPage(1);
        }
    }, [wordData]);

    return (
        isLoading ? (
            <AdminLoader />
        ) : (
            <>
                <Helmet>
                    <title>Word Table</title>
                </Helmet>
                <div className="text-[var(--admin-text-color)] min-h-[82.5vh]">
                    <div className="relative items-center flex flex-col bg-[var(--admin-bg-color)] rounded-4">
                        <div className="bg-blue-600 font-['Kanit'] text-white py-2 px-5 rounded-4 w-[95%] mx-auto my-0 text-2xl absolute -top-[1%] flex items-center justify-between flex-col sm:flex-row">
                            <span>Word Table</span>
                            <span onClick={() => handleOpenPostModal()} className="cursor-pointer flex items-center gap-1">Create <CirclePlus /></span>
                        </div>
                        <div className="pt-[60px] w-full px-4 rounded-4 max-[900px]:overflow-x-scroll overflow-y-auto max-h-[77vh] text-[var(--admin-text-color)]">
                            <table className="w-full">
                                <thead className="border-b-2 text-gray-500">
                                    <tr>
                                        {['#', 'Word text', 'Meaning', 'Level', 'Created at', 'Edit', 'Delete'].map((row, index) => (
                                            <td key={index} className="pb-1 mx-1 whitespace-nowrap">{row}</td>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {wordsToShow?.length ? (
                                        wordsToShow?.toSorted((a, b) => a.wordText.localeCompare(b.wordText)).map((word) => {
                                            let level = allLevel?.find((level) => level.id === word.levelId);
                                            return (
                                                <tr key={word.id} className="border-b">
                                                    <td className="p-1">{word.id}</td>
                                                    <td className="p-1">{word.wordText}</td>
                                                    <td className="p-1">{word.meaning}</td>
                                                    <td className="p-1">{level?.name}</td>
                                                    <td className="p-1">{moment.utc(word.createdAt).local().format('DD MMM YYYY HH:mm')}</td>
                                                    <td className="p-1">
                                                        <button onClick={() => handleOpenEditModal(word)} className="bg-gradient-to-r from-blue-800 to-blue-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Edit</button>
                                                    </td>
                                                    <td className="p-1">
                                                        <button onClick={() => handleClickOpen(word)} className="bg-gradient-to-r from-red-800 to-red-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Delete</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="h-[67vh] py-5 text-center">Word yoxdur!</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        < Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            onChange={handleChangePage}
                            showSizeChanger={true}
                            total={99999}
                            disabled={wordData?.length === 0}
                            pageSizeOptions={[10, 20, 30, 50, 100]}
                            onShowSizeChange={handlePageSizeChange}
                        />
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
                                    <strong>Create word</strong>
                                </Typography>
                                <Typography id="modal-modal-description">
                                    <div>
                                        <Formik
                                            initialValues={{ wordText: '', meaning: '', levelId: '' }}
                                            validationSchema={validationSchema}
                                            onSubmit={async (values) => {
                                                const postFormData = new FormData()
                                                postFormData.append("WordText", values.wordText)
                                                postFormData.append("Meaning", values.meaning)
                                                postFormData.append("LevelId", values.levelId)
                                                try {
                                                    const response = await postWord(postFormData);
                                                    refetch()
                                                    console.log(response);
                                                    if (response.data) {
                                                        alert("Söz yaradıldı")
                                                        setOpenPostModal(false)
                                                    }
                                                    if (response.error) {
                                                        if (response.error.status == 403) {
                                                            alert("❌ Siz söz yarada bilməzsiniz")
                                                            return;
                                                        }
                                                        if (response.error.status == 409) {
                                                            alert(response.error.data.Message)
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
                                                    <label htmlFor="wordText">Word Text:</label>
                                                    <Field type="text" name="wordText" id='wordText' className='border-2 border-green-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter word text' />
                                                    <ErrorMessage name="wordText" component="div" className="text-red-500 text-sm" />

                                                    <label htmlFor="meaning" className="mt-1">Word Description:</label>
                                                    <Field type="text" name="meaning" id='meaning' className='border-2 border-green-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter word meaning' />
                                                    <ErrorMessage name="meaning" component="div" className="text-red-500 text-sm" />

                                                    <div className='flex flex-col'>
                                                        <label htmlFor="levelId" className='mt-1'>Word Level: </label>
                                                        <select onChange={(e) => setFieldValue('levelId', e.target.value)} className="cursor-pointer border-2 border-green-400 rounded py-1 px-2 focus:outline-none">
                                                            <option value="Select" disabled selected></option>
                                                            {
                                                                allLevel?.map((level) => (
                                                                    <option value={level.id}>{level.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        <ErrorMessage name="levelId" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <button type="submit" disabled={isSubmitting} className="mt-2 text-white rounded max-w-[150px] bg-gradient-to-r from-green-800 to-green-300 mx-auto px-3 py-1">
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
                            <Box sx={{ ...style }} className="max-w-2xl mx-auto" >
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <strong>Edit word</strong>
                                </Typography>
                                <Typography id="modal-modal-description">
                                    <div>
                                        <Formik
                                            initialValues={{ wordText: selectedWord.wordText, meaning: selectedWord.meaning, levelId: selectedWord.levelId }}
                                            validationSchema={validationSchema}
                                            onSubmit={async (values) => {
                                                const editFormData = new FormData()
                                                editFormData.append("Id", selectedWord.id)
                                                editFormData.append("WordText", values.wordText)
                                                editFormData.append("Meaning", values.meaning)
                                                editFormData.append("LevelId", values.levelId)
                                                try {
                                                    const response = await updatePostWord(editFormData);
                                                    refetch()
                                                    if (response.data) {
                                                        alert("Söz redaktə olundu")
                                                        setOpenEditModal(false)
                                                    }
                                                    if (response.error) {
                                                        if (response.error.status == 403) {
                                                            alert("❌ Siz söz redaktə edə bilməzsiniz")
                                                            return;
                                                        }
                                                        if (response.error.status == 409) {
                                                            alert(response.error.data.Message)
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
                                                    <label htmlFor="wordText">Word Text:</label>
                                                    <Field type="text" name="wordText" id='wordText' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter word text' />
                                                    <ErrorMessage name="wordText" component="div" className="text-red-500 text-sm" />

                                                    <label htmlFor="meaning" className="mt-1">Word Description:</label>
                                                    <Field type="text" name="meaning" id='meaning' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter word meaning' />
                                                    <ErrorMessage name="meaning" component="div" className="text-red-500 text-sm" />

                                                    <div className='flex flex-col'>
                                                        <label htmlFor="levelId" className='mt-1'>Word Level: </label>
                                                        <select onChange={(e) => setFieldValue('levelId', e.target.value)} className="cursor-pointer border-2 border-blue-400 rounded py-1 px-2 focus:outline-none">
                                                            {
                                                                allLevel?.map((level) => (
                                                                    <option value={level.id}
                                                                        selected={selectedWord.levelId == level.id ? true : false}>{level.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        <ErrorMessage name="levelId" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <button type="submit" disabled={isSubmitting} className="mt-2 text-white rounded max-w-[150px] bg-gradient-to-r from-blue-800 to-blue-300 mx-auto px-3 py-1">
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
                                    <span className='text-[var(--admin-text-color)]'>This action cannot be undone. Are you sure you want to proceed?</span>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions className="bg-[var(--admin-page-bg-color)]">
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={() => handleDeleteWord()} autoFocus>
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
