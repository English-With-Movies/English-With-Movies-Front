import { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useGetAllBlogsQuery } from "../../../redux/rtk query/Slices/blogSlice";
import { Helmet } from "react-helmet";
import LoaderIcon from "../../../components/Loaders/Loader";
import moment from 'moment';
import { useGetAllUserQuery, useGetByIdUserQuery } from "../../../redux/rtk query/Slices/userSlice";
import { useGetAllAvatarQuery, useGetByIdAvatarQuery } from "../../../redux/rtk query/Slices/avatarSlice";
import { useGetAllFrameQuery } from "../../../redux/rtk query/Slices/frameSlice";

const BlogPage = () => {
    let navigate = useNavigate()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    let { data: allBlogs, isLoading, refech } = useGetAllBlogsQuery()
    console.log(allBlogs);
    let { data: allUsers, isLoading: usersLoading } = useGetAllUserQuery()
    console.log(allUsers);
    let { data: allAvatar, isLoading: avatarLoading } = useGetAllAvatarQuery()
    console.log(allAvatar);
    const { data: allFrame } = useGetAllFrameQuery();

    return (
        <>
            <Helmet>
                <title>Bloqlar</title>
            </Helmet>
            {
                isLoading ? (
                    <LoaderIcon />
                ) : (
                    <div className="bg-[var(--bg-color)] py-[130px] text-[var(--text-color)]">
                        <Container>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_3fr] lg:grid-cols-[1fr_2fr] gap-3 sm:gap-[50px] relative">
                                <div className="flex">
                                    <div className="order-first w-full sm:h-[80vh] sm:sticky sm:top-[17%] sm:right-[7.5%] p-4 cursor-pointer rounded-4 bg-[var(--movies-bg)] shadow-lg">
                                        <h2 className="text-xl font-semibold">Sabit Panel</h2>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex justify-end">
                                        <button onClick={() => navigate('create')} className="flex items-center rounded-5 font-bold mb-1 justify-end bg-green-600 text-white py-1 px-2 "><FaPlus /> Create your own blog</button>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {
                                            allBlogs.length ? (
                                                allBlogs.map((blog, index) => {
                                                    // const { data: userData, isLoading: userLoading } = useGetByIdUserQuery(blog?.authorId);
                                                    // const { data: avatar, isLoading: avatarLoading } = useGetByIdAvatarQuery(user?.avatarId);
                                                    // console.log(avatar);

                                                    // if (userLoading) return <LoaderIcon />;
                                                    let user = allUsers?.find(user => user.id === blog?.authorId);
                                                    let userPhoto = allAvatar?.find(avatar => avatar.id === user?.avatarId)
                                                    console.log(user);

                                                    let time = moment(blog.createdAt).fromNow();
                                                    return (
                                                        <div key={blog.id} onClick={() => { navigate(`${blog.id}`) }} className="cursor-pointer p-3 rounded-4 bg-[var(--movies-bg)] transition-all duration-250 ease-in hover:shadow-gray-500 hover:shadow-lg">
                                                            <h3 className="font-['Kanit'] text-sm md:text-xl">{blog.title}</h3>
                                                            <div className="flex gap-2 justify-end">
                                                                <div className="flex flex-col items-end justify-center">
                                                                    <span className="font-['PT_Serif'] text-sm md:text-md">{user?.userName}</span>
                                                                    <span className="font-['PT_Serif'] text-sm md:text-md">{time}</span>
                                                                </div>
                                                                <div className='relative flex items-center justify-center w-[65px] h-[65px]'>
                                                                    <img className='w-[75%] h-[75%] rounded-full object-cover z-0 object-center' src={`https://englishwithmovies.blob.core.windows.net/avatar/${userPhoto?.imgName}`} alt="profile" />
                                                                    {
                                                                        user?.userFrames &&
                                                                        user?.userFrames.map((frame) => {
                                                                            if (frame.isCurrent) {
                                                                                let userFrame = allFrame?.find((value) => value.id == frame.frameId);
                                                                                return (
                                                                                    <div
                                                                                        key={frame.frameId}
                                                                                        className="absolute w-full h-full bg-cover bg-center z-10"
                                                                                        style={{ backgroundImage: `url('https://englishwithmovies.blob.core.windows.net/frame/${userFrame?.imgName}')` }}
                                                                                    ></div>
                                                                                );
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <h1>Hələ ki heç bir bloq yoxdur</h1>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </Container >
                    </div >
                )
            }
        </>


    );
};

export default BlogPage;
