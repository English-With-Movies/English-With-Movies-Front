import { Formik, Form, Field, ErrorMessage } from 'formik';
// material ui
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { usePostReportMutation } from '../../../redux/rtk query/Slices/userReportSlice';

export default function BlogReport({ blogUpdateRef, reportedUser, reporterUser, openReportModal, handleCloseReportModal, style, }) {
    const [report, setReport] = React.useState('');
    const [isOtherSelected, setIsOtherSelected] = React.useState(false);
    let [postReport] = usePostReportMutation()

    React.useEffect(() => {
        if (openReportModal) {
            setReport('');
            setIsOtherSelected(false)
        }
    }, [openReportModal]);
    return (
        <div>
            <Modal
                open={openReportModal}
                onClose={handleCloseReportModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style }} className="max-w-[700px] mx-auto">
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Formik
                            enableReinitialize={true}
                            initialValues={{ description: '', reason: '' }}
                            onSubmit={async (values) => {
                                const reportFormData = new FormData()
                                reportFormData.append("ReportedUserId", reportedUser)
                                reportFormData.append("ReporterUserId", reporterUser)
                                reportFormData.append("Reason", values.reason)
                                reportFormData.append("Description", values.description.trim())
                                try {
                                    const response = await postReport(reportFormData);
                                    if (response.data) {
                                        alert('İstifadəçi şikayət olundu');
                                        handleCloseReportModal()
                                        blogUpdateRef.current.classList.toggle("handleBars")
                                    }
                                    if (response.error) {
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
                                setSubmitting(false)
                            }}
                        >
                            {({ isSubmitting, setFieldValue }) => (
                                <Form>
                                    <div>
                                        <FormControl variant="standard" sx={{ m: 1 }} className='w-full'>
                                            <InputLabel id="demo-simple-select-standard-label">Report</InputLabel>
                                            <Select
                                                name='reason'
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                value={report}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setFieldValue('reason', value)
                                                    setReport(value);
                                                    setIsOtherSelected(value === 9);
                                                }}
                                                label="Report"
                                            >
                                                <MenuItem disabled selected >Seçin</MenuItem>
                                                {
                                                    ['Zorbalıq', 'Spam', 'Uyğunsuz məzmun', 'Saxta hesab', 'Şərtləri pozma', 'Təqlid', 'Təhqiredici dil', 'Məxfiliyin pozulması', 'Digər'].map((key, index) => (
                                                        <MenuItem value={index+1}>{key}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {isOtherSelected && (
                                        <div>
                                            <Field
                                                type="text"
                                                name="description"
                                                className="mt-2 border-2 border-gray-400 w-full rounded mt-1 p-1 text-black"
                                                placeholder="Səbəbi yazın"
                                                style={{ cursor: 'text' }}
                                            />
                                        </div>
                                    )}

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
    )
}