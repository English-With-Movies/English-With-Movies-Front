import { Formik, Form, Field, ErrorMessage } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import * as yup from "yup";
import { useContext, useEffect, useRef, useState } from "react";
import { userInfoContext } from "../../../../context/UserInfo";
import { usePostBlogMutation } from "../../../../redux/rtk query/Slices/blogSlice";

export default function AddBlog() {
    let { userInfo } = useContext(userInfoContext)
    let [id, setId] = useState()
    useEffect(() => {
        setId(userInfo?.userId)
    }, [userInfo])

    const editorRef = useRef(null);
    const validationSchema = yup.object({
        title: yup.string().required("Bloq başlığı boş ola bilməz"),
        content: yup.string().required("Məzmun boş ola bilməz"),
    });

    let [postBlog] = usePostBlogMutation()

    return (
        <div className="bg-[var(--bg-color)] pb-3 pt-[130px] ">
            <div className="max-w-[1000px] mx-auto my-0">
                <Formik
                    enableReinitialize={true}
                    initialValues={{ title: '', content: '', authorId: id }}
                    validationSchema={validationSchema}
                    onSubmit={ async (values) => {
                        const blogPostFormData = new FormData()
                        blogPostFormData.append("Title", values.title)
                        blogPostFormData.append("Content", values.content)
                        blogPostFormData.append("AuthorId", values.authorId)
                        console.log(...blogPostFormData)
                        try {
                            const response = await postBlog(blogPostFormData);
                            console.log(response);
                            if (response.data) {
                                alert('Successfully');
                            }
                            if (response.error) {
                                alert("❌ " + response.error.data)
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
                            <label htmlFor="blog-title" className="text-[var(--text-color)] font-bold">BLOG TITLE</label>
                            <Field type="text" name="title" className="font-bold text-xl border-2 border-[var(--text-color)] w-full rounded mt-1 p-1 text-[var(--text-color)]" />
                            <ErrorMessage name="title" component="div" className="text-red-600" />
                            <div className="mt-3">
                                <Editor
                                    apiKey="fjhoir9ox8oyvemgzkz4oc6mel798bl48qh8fysq5fw8nfiu"
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    onBlur={() => setFieldValue("content", editorRef.current.getContent())}
                                    init={{
                                        height: 400,
                                        // width: 1000,
                                        menubar: false,
                                        plugins: ["lists", "link", "image", "code"],
                                        toolbar: 'undo redo | formatselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | code | link image',
                                        color_map: [
                                            "FFFFFF", "White",
                                            "000000", "Black",
                                            "FF0000", "Red",
                                            "00FF00", "Green",
                                            "0000FF", "Blue"
                                        ],
                                        content_style: 'body { background-color:rgba(185, 185, 185, 0.71); color: #333; }',
                                    }}
                                />
                            </div>
                            <ErrorMessage name="content" component="div" className="text-red-500" />
                            <button type="submit" disabled={isSubmitting} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};