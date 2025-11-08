import { Helmet } from "react-helmet";
import AdminLoader from "../../../../components/Loaders/AdminLoader";
import { useDeleteMovieMutation, useGetAllMoviesQuery, usePostMovieMutation, useUpdatePostMovieMutation } from "../../../../redux/rtk query/Slices/moviesSlice";
import { useState } from "react";
import { useEffect } from "react";
import { CirclePlus } from "lucide-react";
import { useGetAllLevelQuery } from "../../../../redux/rtk query/Slices/levelSlice";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import GenresSelectOption from "../../../../components/Admin/Admin Movie Table Components/GenresSelectOption";
// delete alert
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GenresEditSelectOption from "../../../../components/Admin/Admin Movie Table Components/GenresEditSelectOption";
import { useGetByWordTextQuery } from "../../../../redux/rtk query/Slices/wordSlice";
import { useDeleteWordFromEpisodeMutation, useGetByIdEpisodeQuery, usePostWordFromEpisodeMutation } from "../../../../redux/rtk query/Slices/episodeSlice";
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
    name: yup.string()
        .required("Admin, please enter movie name!")
        .trim()
        .max(20, "Maximum 20 characters").min(3, "Minimum 3 characters"),
    description: yup.string()
        .required("Admin, please enter movie description!")
        .trim()
        .max(1000, "Maximum 1000 characters").min(3, "Minimum 3 characters"),
    imdb: yup.number()
        .required("Admin, please enter movie imdb!")
        .positive('Must be a positive number.')
        .max(10, "Maximum 10").min(0, "Minimum 0"),
    publishYear: yup.number()
        .required("Admin, please enter movie description!")
        .positive('Must be a positive number.')
        .integer().min(1800, "Minimum 1800"),
    levelId: yup.string()
        .required("Please, enter movie level."),
});

export default function MovieTable() {
    let navigate = useNavigate()
    let { data: allLevel } = useGetAllLevelQuery()
    let { data, isLoading: movieIsLoading, refetch } = useGetAllMoviesQuery()
    let [postMovie] = usePostMovieMutation()
    let [deleteMovie] = useDeleteMovieMutation()
    let [updatePostMovie] = useUpdatePostMovieMutation()
    const [selectedMovie, setSelectedMovie] = useState({})
    // add movie, add create word
    let [moviesData, setMoviesData] = useState([])
    useEffect(() => {
        if (!movieIsLoading && data) {
            setMoviesData(data.filter((movieInData) => movieInData.isFilm))
        }
    }, [movieIsLoading, data])
    // description modal
    let [desc, setDesc] = useState(null)
    let [openDescModal, setOpenDescModal] = useState(false)
    const handleCloseDescModal = () => setOpenDescModal(false)
    const handleOpenDescModal = () => setOpenDescModal(true)
    // post movie modal
    const [openPostModal, setOpenPostModal] = useState(false);
    const handleOpenPostModal = () => setOpenPostModal(true);
    const handleClosePostModal = () => setOpenPostModal(false);
    // edit modal
    const [openEditModal, setOpenEditModal] = useState(false);
    const handleOpenEditModal = (movie) => {
        setSelectedMovie(movie)
        setOpenEditModal(true);
    }
    const handleCloseEditModal = () => {
        setSelectedMovie({})
        setOpenEditModal(false);
    }
    // add word modal
    let [postWordFromEpisode] = usePostWordFromEpisodeMutation()
    const [submittedWord, setSubmittedWord] = useState('');
    const { data: getWordText, error: getWordTextError, isLoading: getWordTextLoading } = useGetByWordTextQuery(submittedWord, { skip: !submittedWord });

    const [openAddWordModal, setOpenAddWordModal] = useState(false);
    const handleOpenAddWordModal = (movie) => {
        setSelectedMovie(movie)
        setOpenAddWordModal(true);
    }
    const handleCloseAddWordModal = () => {
        setSelectedMovie({})
        setOpenAddWordModal(false);
    }
    useEffect(() => {
        if (submittedWord) {
            console.log("Word submitted:", submittedWord);
        }
    }, [submittedWord]);

    // delete word modal
    let [episodeId, setEpisodeId] = useState('')
    let [deleteWordFromEpisode] = useDeleteWordFromEpisodeMutation()
    const [submittedDeleteWord, setSubmittedDeleteWord] = useState('');
    const { data: episodeById, error: episodeByIdError, isLoading: episodeByIdLoading } = useGetByIdEpisodeQuery(episodeId, { skip: !episodeId });

    const [openDeleteWordModal, setOpenDeleteWordModal] = useState(false);
    const handleOpenDeleteWordModal = (movie) => {
        setSelectedMovie(movie)
        setOpenDeleteWordModal(true);
    }
    const handleCloseDeleteWordModal = () => {
        setSelectedMovie({})
        setOpenDeleteWordModal(false);
    }
    useEffect(() => {
        if (submittedDeleteWord) {
            console.log("Word submitted:", submittedDeleteWord);
        }
    }, [submittedDeleteWord]);

    // delete alert
    const [openAlert, setOpenAlert] = React.useState(false);
    const handleClickOpen = (movie) => {
        setSelectedMovie(movie)
        setOpenAlert(true);
    };
    const handleClose = () => setOpenAlert(false);
    const handleDeleteMovie = async () => {
        const response = await deleteMovie(selectedMovie.id)
        if (response.data == null) {
            alert("Film silindi")
        }
        if (response.error) {
            if (response.error.status == 403) {
                alert("❌ Siz film silə bilməzsiniz")
                return
            }
            alert("❌ Xəta baş verdi")
        }
        setOpenAlert(false);
        refetch()
    }

    useEffect(() => {
        const fetchAndDeleteWord = async () => {
            if (episodeById) {
                const episodeWords = episodeById.episodeWords || [];
                const foundWord = episodeWords?.find(wordObj => wordObj.word.wordText === submittedDeleteWord);
                if (foundWord) {
                    const response = await deleteWordFromEpisode({ episodeId: episodeById.id, wordId: foundWord.wordId })
                    if (response.data) {
                        alert(response.data.message)
                        refetch()
                    } 
                    if (response.error) {
                        if (response.error.status == 400) {
                            alert(response.error.data.Message)
                        }
                    }
                } else {
                    alert("Bu söz mövcud deyil!");
                }
            }
        };

        fetchAndDeleteWord()

    }, [submittedDeleteWord, episodeById]);

    // add word to movie
    useEffect(() => {
        const fetchAndPostWord = async () => {
            if (getWordTextError) {
                if (getWordTextError.status == 404) {
                    alert('This word does not exist in the wordData')
                }
            } else if (getWordText) {
                if (getWordText && getWordText.id) {
                    const episodesId = selectedMovie?.seasons[0].episodes[0].id;
                    if (episodesId) {
                        const response = await postWordFromEpisode({
                            episodeId: episodesId,
                            wordId: getWordText.id,
                        });
                        if (response.data) {
                            alert(response.data.message)
                        }
                        if (response?.error) {
                            if (response.error.status == 409) {
                                alert(response.error.data.Message)
                            } else (
                                alert('Error')
                            )
                        }
                    } else {
                        alert("Episode ID not found.");
                    }
                } else {
                    alert("Word not found.");
                }
            }
        };

        fetchAndPostWord();
    }, [getWordText, getWordTextError, selectedMovie]);


    return (
        movieIsLoading ? (
            <AdminLoader />
        ) : (
            <>
                <Helmet>
                    <title>Movie Table</title>
                </Helmet>
                <div className="pt-[25px] text-[var(--admin-text-color)] min-h-[85vh]">
                    <div className="relative items-center flex flex-col bg-[var(--admin-bg-color)] rounded-4">
                        <div className="bg-blue-600 font-['Kanit'] text-white py-2 px-5 rounded-4 w-[95%] mx-auto my-0 text-2xl absolute -top-[8%] flex items-center justify-between flex-col sm:flex-row">
                            <span>Movie Table</span>
                            <span onClick={() => handleOpenPostModal()} className="cursor-pointer flex items-center gap-1">Create <CirclePlus /></span>
                        </div>
                        <div className="pt-[60px] w-full px-4 rounded-4 overflow-x-scroll">
                            <table className="w-full">
                                <thead className="border-b-2 text-gray-500">
                                    <tr>
                                        {
                                            ['# / ', 'Poster image / ', 'Banner image / ', 'Name / ', 'Description / ', 'IsPremium / ', 'Publish Year / ', 'isReady / ', 'Level /', 'Add word /', 'Delete word /', 'Edit / ', 'Delete'].map((value) => (
                                                <td className="pb-1 mx-1 whitespace-nowrap">{value}</td>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        moviesData.length ? (
                                            moviesData.map((movie) => {
                                                let level = allLevel?.find((level) => level.id == movie.levelId)
                                                return <tr key={movie.id} className="border-b">
                                                    <td className="p-1">{movie.id}</td>
                                                    <td className="p-1">
                                                        <img src={`https://englishwithmovies.blob.core.windows.net/movieposter/${movie.posterImgName}`} alt="poster" width={'50px'} height={''} />
                                                    </td>
                                                    <td className="p-1">
                                                        <img src={`https://englishwithmovies.blob.core.windows.net/moviebanner/${movie.bannerImgName}`} alt="banner" width={'100px'} height={'80px'} />
                                                    </td>
                                                    <td className="p-1 whitespace-nowrap">{movie.name}</td>
                                                    <td className="p-1 whitespace-nowrap">
                                                        {
                                                            movie.description.length > 30 ? (
                                                                <>
                                                                    {(movie.description).slice(0, 30)}<span onClick={() => { setDesc(movie), handleOpenDescModal() }} className="cursor-pointer">...</span>
                                                                </>
                                                            ) : (movie.description)
                                                        }
                                                    </td>
                                                    <td className="p-1 whitespace-nowrap">{movie.isPremiumFilm ? 'Premium' : 'Not Premium'}</td>
                                                    <td className="p-1">{movie.publishYear}</td>
                                                    <td className="p-1 whitespace-nowrap">{movie.isReady ? 'Ready' : 'Not Ready'}</td>
                                                    <td className="p-1">{level.name}</td>
                                                    <td className="p-1">
                                                        <button onClick={() => handleOpenAddWordModal(movie)} className="bg-gradient-to-r from-cyan-800 to-cyan-400 whitespace-nowrap text-white py-1 px-3 rounded-lg max-w-[300px]">Add word</button>
                                                    </td>
                                                    <td className="p-1">
                                                        <button onClick={() => handleOpenDeleteWordModal(movie)} className="bg-gradient-to-r from-red-800 to-red-400 whitespace-nowrap text-white py-1 px-3 rounded-lg max-w-[300px]">Delete word</button>
                                                    </td>
                                                    <td className="p-1">
                                                        <button onClick={() => handleOpenEditModal(movie)} className="bg-gradient-to-r from-blue-800 to-blue-400 text-white py-1 px-3 rounded-lg max-w-[300px]">Edit</button>
                                                    </td>
                                                    <td className="p-1">
                                                        <button onClick={() => handleClickOpen(movie)} className="bg-gradient-to-r from-red-800 to-red-300 text-white py-1 px-3 rounded-lg max-w-[300px]">Delete</button>
                                                    </td>
                                                </tr>
                                            })
                                        ) : (
                                            <h3 className="h-[67vh] py-5">Film yoxdur!</h3>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* description modal */}
                    <div>
                        <Modal
                            open={openDescModal}
                            onClose={handleCloseDescModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...style }} className="max-w-2xl mx-auto" >
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <strong>{desc?.name} description</strong>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>
                                        {desc?.description}
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
                                <Button onClick={() => handleDeleteMovie()} autoFocus>
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
                                    <strong>Create movie</strong>
                                </Typography>
                                <Typography id="modal-modal-description">
                                    <div>
                                        <Formik
                                            initialValues={{ name: '', description: '', publishYear: null, imdb: null, isReady: false, isPremiumFilm: false, posterImage: null, bannerImage: null, levelId: '', genreIds: [] }}
                                            validationSchema={validationSchema}
                                            onSubmit={async (values) => {
                                                const postFormData = new FormData()
                                                postFormData.append("IsFilm", true)
                                                postFormData.append("IsPremiumFilm", values.isPremiumFilm)
                                                postFormData.append("IsReady", values.isReady)
                                                postFormData.append("Name", values.name)
                                                postFormData.append("Description", values.description)
                                                postFormData.append("PublishYear", values.publishYear)
                                                postFormData.append("Imdb", values.imdb)
                                                postFormData.append("PosterImage", values.posterImage)
                                                postFormData.append("BannerImage", values.bannerImage)
                                                postFormData.append("LevelId", values.levelId)
                                                values.genreIds.forEach(id => postFormData.append("GenreIds", id));
                                                try {
                                                    const response = await postMovie(postFormData);
                                                    refetch()
                                                    console.log(response);
                                                    if (response.data) {
                                                        alert("Film yaradıldı")
                                                        setOpenPostModal(false)
                                                    }
                                                    if (response.error) {
                                                        if (response.error.status == 403) {
                                                            alert("❌ Siz film yarada bilməzsiniz")
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
                                                    <label htmlFor="name">Movie Name:</label>
                                                    <Field type="text" name="name" id='name' className='border-2 border-green-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter movie name' />
                                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                                                    <label htmlFor="description" className="mt-1">Movie Description:</label>
                                                    <Field type="text" name="description" id='description' className='border-2 border-green-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter movie description' />
                                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />

                                                    <label htmlFor="publishYear" className="mt-1">Publish Year:</label>
                                                    <Field type="number" name="publishYear" id='publishYear' className='border-2 border-green-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter movie publish year' />
                                                    <ErrorMessage name="publishYear" component="div" className="text-red-500 text-sm" />

                                                    <label htmlFor="imdb" className="mt-1">IMDb:</label>
                                                    <Field name="imdb" id='imdb' className='border-2 border-green-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter movie imdb' />
                                                    <ErrorMessage name="imdb" component="div" className="text-red-500 text-sm" />

                                                    <label htmlFor="posterImage" className="mt-1">Poster Image:</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        name="posterImage"
                                                        onChange={(event) => {
                                                            setFieldValue("posterImage", event.currentTarget.files[0]);
                                                        }}
                                                        className="border-2 border-green-400 rounded py-1 px-2 focus:outline-none"
                                                        required
                                                    />
                                                    <ErrorMessage name="posterImage" component="div" className="text-red-500 text-sm" />

                                                    <label htmlFor="bannerImage" className="mt-1">Banner Image:</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        name="bannerImage"
                                                        onChange={(event) => {
                                                            setFieldValue("bannerImage", event.currentTarget.files[0]);
                                                        }}
                                                        className="border-2 border-green-400 rounded py-1 px-2 focus:outline-none"
                                                        required
                                                    />
                                                    <ErrorMessage name="bannerImage" component="div" className="text-red-500 text-sm" />

                                                    <div className='flex flex-col'>
                                                        <label htmlFor="levelId" className='mt-1'>Movie Level: </label>
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

                                                    <div className='flex flex-col'>
                                                        <label htmlFor="genreIds" className='mt-1'>Movie Genres: </label>
                                                        <GenresSelectOption name='genreIds' />
                                                        <ErrorMessage name="genreIds" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className='flex items-center checkbox-wrapper-19 mt-1'>
                                                        <Field type="checkbox" name="isReady" id='cbtest-1'
                                                            className="p-2 border-2 border-[#06b6d4] rounded cursor-pointer" />
                                                        <label htmlFor="cbtest-1" className='check-box border-black'></label>
                                                        <label htmlFor="cbtest-1" className='cursor-pointer ml-2'> Is Ready? </label>
                                                    </div>

                                                    <div className='flex items-center checkbox-wrapper-19 mt-1'>
                                                        <Field type="checkbox" name="isPremiumFilm" id='cbtest-2'
                                                            className="p-2 border-2 border-[#06b6d4] rounded cursor-pointer" />
                                                        <label htmlFor="cbtest-2" className='check-box border-black'></label>
                                                        <label htmlFor="cbtest-2" className='cursor-pointer ml-2'> Is Premium? </label>
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
                            <Box sx={{ ...style }} className="max-w-2xl mx-auto">
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <strong>Edit movie</strong>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>
                                        <Formik
                                            initialValues={{ id: selectedMovie.id, name: selectedMovie.name, description: selectedMovie.description, publishYear: selectedMovie.publishYear, imdb: selectedMovie.imdb, isReady: selectedMovie.isReady, isPremiumFilm: selectedMovie.isPremiumFilm, posterImage: null, bannerImage: null, levelId: selectedMovie.levelId, genreIds: [] }}
                                            validationSchema={validationSchema}
                                            onSubmit={async (values) => {
                                                const editPostFormData = new FormData()
                                                editPostFormData.append("Id", values.id)
                                                editPostFormData.append("IsFilm", true)
                                                editPostFormData.append("IsPremiumFilm", values.isPremiumFilm)
                                                editPostFormData.append("IsReady", values.isReady)
                                                editPostFormData.append("Name", values.name)
                                                editPostFormData.append("Description", values.description)
                                                editPostFormData.append("PublishYear", values.publishYear)
                                                editPostFormData.append("Imdb", values.imdb)
                                                if (values.posterImage !== null) {
                                                    editPostFormData.append("PosterImage", values.posterImage)
                                                }
                                                if (values.bannerImage !== null) {
                                                    editPostFormData.append("BannerImage", values.bannerImage)
                                                }
                                                editPostFormData.append("LevelId", values.levelId)
                                                values.genreIds.forEach(id => editPostFormData.append("GenreIds", id));
                                                console.log(...editPostFormData);

                                                try {
                                                    const response = await updatePostMovie(editPostFormData);
                                                    console.log(response);
                                                    refetch()
                                                    if (response.data) {
                                                        alert('Film edit olundu');
                                                        setOpenEditModal(false)
                                                    }
                                                    if (response.error) {
                                                        if (response.error.status == 403) {
                                                            alert("❌ Siz film editləyə bilməzsiniz")
                                                            return;
                                                        }
                                                        if (response.error.status == 400) {
                                                            alert("❌ Inputları düzgün doldurun")
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
                                                    <label htmlFor="name">Movie Name:</label>
                                                    <Field type="text" name="name" id='name' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter movie name' />
                                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                                                    <label htmlFor="description" className="mt-1">Movie Description:</label>
                                                    <Field type="text" name="description" id='description' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter movie description' />
                                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />

                                                    <label htmlFor="publishYear" className="mt-1">Publish Year:</label>
                                                    <Field type="number" name="publishYear" id='publishYear' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter movie publish year' />
                                                    <ErrorMessage name="publishYear" component="div" className="text-red-500 text-sm" />

                                                    <label htmlFor="imdb" className="mt-1">IMDb:</label>
                                                    <Field name="imdb" id='imdb' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none' placeholder='Enter movie imdb' />
                                                    <ErrorMessage name="imdb" component="div" className="text-red-500 text-sm" />

                                                    <label htmlFor="posterImage" className="mt-1">Poster Image:</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        name="posterImage"
                                                        onChange={(event) => {
                                                            setFieldValue("posterImage", event.currentTarget.files[0]);
                                                        }}
                                                        className="border-2 border-blue-400 rounded py-1 px-2 focus:outline-none"

                                                    />
                                                    <ErrorMessage name="posterImage" component="div" className="text-red-500 text-sm" />

                                                    <label htmlFor="bannerImage" className="mt-1">Banner Image:</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        name="bannerImage"
                                                        onChange={(event) => {
                                                            setFieldValue("bannerImage", event.currentTarget.files[0]);
                                                        }}
                                                        className="border-2 border-blue-400 rounded py-1 px-2 focus:outline-none"

                                                    />
                                                    <ErrorMessage name="bannerImage" component="div" className="text-red-500 text-sm" />

                                                    <div className='flex flex-col'>
                                                        <label htmlFor="levelId" className='mt-1'>Movie Level: </label>
                                                        <select onChange={(e) => setFieldValue('levelId', e.target.value)} className="cursor-pointer border-2 border-blue-400 rounded py-1 px-2 focus:outline-none">
                                                            {
                                                                allLevel?.map((level) => (
                                                                    <option value={level.id} selected={selectedMovie.levelId == level.id ? true : false}>{level.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        <ErrorMessage name="levelId" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className='flex flex-col'>
                                                        <label htmlFor="genreIds" className='mt-1'>Movie Genres: </label>
                                                        <GenresEditSelectOption name='genreIds' />
                                                        <ErrorMessage name="genreIds" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className='flex items-center checkbox-wrapper-19 mt-1'>
                                                        <Field type="checkbox" name="isReady" id='cbtest-1'
                                                            className="p-2 border-2 border-[#06b6d4] rounded cursor-pointer" />
                                                        <label htmlFor="cbtest-1" className='check-box border-black'></label>
                                                        <label htmlFor="cbtest-1" className='cursor-pointer ml-2'> Is Ready? </label>
                                                    </div>

                                                    <div className='flex items-center checkbox-wrapper-19 mt-1'>
                                                        <Field type="checkbox" name="isPremiumFilm" id='cbtest-2'
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

                    {/* add word modal formik */}
                    <div>
                        <Modal
                            open={openAddWordModal}
                            onClose={handleCloseAddWordModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...style }} className="max-w-2xl mx-auto">
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <strong>Add word to movie</strong>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>
                                        <Formik
                                            initialValues={{
                                                episodeId: selectedMovie?.seasons?.episodes?.id, word: ''
                                            }}
                                            onSubmit={async (values, { setSubmitting }) => {
                                                const searchWord = values.word.trim();
                                                setSubmittedWord(searchWord);
                                                setSubmitting(false)
                                            }}
                                        >
                                            {({ isSubmitting }) => (
                                                <Form className="flex flex-col">
                                                    <label htmlFor="word">Search word:</label>
                                                    <Field
                                                        type="text"
                                                        required
                                                        name="word"
                                                        id='word'
                                                        className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none'
                                                        placeholder='Enter word' />
                                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                                                    <button type="submit" disabled={isSubmitting} className="mt-3 text-white rounded max-w-[150px] bg-gradient-to-r from-blue-800 to-blue-300 mx-auto px-3 py-1">
                                                        Search
                                                    </button>
                                                </Form>
                                            )}
                                        </Formik>
                                        <button onClick={() => navigate('/manage/dashboard/tables/word-table')} className="px-2 py-1 rounded bg-teal-400 text-white">Go to create word</button>
                                    </div>
                                </Typography>
                            </Box>
                        </Modal>
                    </div>

                    {/* delete word modal formik */}
                    <div>
                        <Modal
                            open={openDeleteWordModal}
                            onClose={handleCloseDeleteWordModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...style }} className="max-w-2xl mx-auto">
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <strong>Delete word from movie</strong>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>
                                        <Formik
                                            initialValues={{
                                                word: ''
                                            }}
                                            onSubmit={async (values, { setSubmitting }) => {
                                                const searchWord = values.word.trim();
                                                setSubmittedDeleteWord(searchWord);
                                                const episodeId = selectedMovie?.seasons?.[0]?.episodes?.[0]?.id;
                                                setEpisodeId(episodeId);
                                                setSubmitting(false);
                                            }}
                                        >
                                            {({ isSubmitting }) => (
                                                <Form className="flex flex-col">
                                                    <label htmlFor="word">Search word:</label>
                                                    <Field
                                                        type="text"
                                                        required
                                                        name="word"
                                                        id='word'
                                                        className='border-2 border-red-400 rounded py-1 px-2 focus:outline-none'
                                                        placeholder='Enter word' />
                                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                                                    <button type="submit" disabled={isSubmitting} className="mt-3 text-white rounded max-w-[150px] bg-gradient-to-r from-red-800 to-red-300 mx-auto px-3 py-1">
                                                        Delete
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