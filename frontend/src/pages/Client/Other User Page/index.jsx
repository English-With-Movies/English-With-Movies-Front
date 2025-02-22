import { useParams } from "react-router"
import { useGetByNameUserQuery } from "../../../redux/rtk query/Slices/userSlice";
import { Helmet } from "react-helmet";
import LoaderIcon from "../../../components/Loaders/Loader";
import { useGetByIdAvatarQuery } from "../../../redux/rtk query/Slices/avatarSlice";
import { useGetAllFrameQuery } from "../../../redux/rtk query/Slices/frameSlice";
import Cup from '../../../assets/trophy.png'
import Calcifer from '../../../assets/calcifer-streak1.png'
import moment from 'moment';
import { FaRegHeart } from 'react-icons/fa6';
import Container from "react-bootstrap/esm/Container";

export default function OtherUserPage() {
    let { userName } = useParams()
    let { data: userData, isLoading } = useGetByNameUserQuery(userName)
    let { data: avatarUser } = useGetByIdAvatarQuery(userData?.avatarId)
    let { data: allFrame } = useGetAllFrameQuery()
    console.log(userData);

    return (
        <>
            <Helmet>
                <title>{userData?.userName}</title>
            </Helmet>
            {
                isLoading ? (
                    <LoaderIcon />
                ) : (
                    <>
                        <div className='bg-[var(--bg-color)] text-[var(--text-color)] pt-[170px] pb-[20px]'>
                            <Container>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                    <div className='font-["PT_Serif"]'>
                                        <div className='cursor-pointer relative flex items-center justify-center w-[220px] h-[220px]'>
                                            <img className='w-[75%] h-[75%] rounded-full object-cover z-0' src={`https://englishwithmovies.blob.core.windows.net/avatar/${avatarUser?.imgName}`} alt="profile" />
                                            {
                                                userData?.userFrames &&
                                                userData?.userFrames.map((frame) => {
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
                                        <h5 className='font-["Kanit"] text-lg'>{userData?.userName}</h5>
                                        <h5 className='text-md'>{userData?.firstName} {userData?.lastName}</h5>
                                        <p>{userData?.about}</p>
                                    </div>

                                    <div>
                                        <div className='flex flex-col gap-4 mb-4'>
                                            <div className='hover:shadow-[0_0px_20px_0px_yellow] hover:bg-[var(--movies-bg)] cursor-pointer p-2 rounded transition hover:shadow-yellow-400 bg-[var(--movies-bg)]' onClick={() => navigate('points-ranking')}>
                                                <div className="grid grid-cols-2 items-center">
                                                    <img src={Cup} className='w-[190px] rounded' alt="Points Ranking" />
                                                    <div>
                                                        <p className="text-center flex flex-col -gap-1"><span className="text-lg font-semibold">Ümumi xal: </span><span className='text-orange-500 font-bold text-lg'>{userData?.point}</span></p>
                                                        <p className="mb-0 text-center flex flex-col -gap-1"><span className="text-lg font-semibold">Bugünün xalı: </span><span className='text-orange-500 font-bold text-lg'>{userData?.todaysPoint}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='cursor-pointer items-center justify-center p-2 rounded transition hover:shadow-yellow-400 bg-[var(--movies-bg)] hover:shadow-[0_0px_20px_0px_yellow] hover:bg-[var(--movies-bg)]' onClick={() => navigate('streak-ranking')}>
                                                <div className='flex'>
                                                    <img src={Calcifer} className='w-[150px]' alt="Streak" />
                                                    <h5 className='text-center text-sm'>STREAK {userData?.streak} GÜN</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full rounded-lg flex flex-col gap-2'>
                                        {
                                            userData?.blogs.length == 0 ? (
                                                <h4 className='font-["Kanit"]'>Bu hesabda heç bir blog paylaşılmayıb</h4>
                                            ) : (
                                                userData?.blogs?.slice(0, 3).map((blog) =>
                                                    <div key={blog.id} onClick={() => { navigate(`/blog/${blog.id}`) }} className="cursor-pointer p-3 rounded-4 bg-[var(--movies-bg)] transition-all duration-250 ease-in hover:shadow-gray-500 hover:shadow-lg">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="font-['Kanit'] text-sm md:text-xl">{blog.title}</h3>
                                                            <span onClick={() => addFavBlog(blog.id)} className="text-xl"><FaRegHeart /></span>
                                                        </div>
                                                        <div className="flex gap-2 justify-end">
                                                            <div className="flex flex-col items-end justify-center">
                                                                <span className="font-['PT_Serif'] text-sm md:text-md">{userData?.userName}</span>
                                                                <span className="font-['PT_Serif'] text-sm md:text-md">{moment.utc(blog?.createdAt.split('.')[0]).local().fromNow()}</span>
                                                            </div>
                                                            <div className='relative flex items-center justify-center w-[65px] h-[65px]'>
                                                                <img className='w-[75%] h-[75%] rounded-full object-cover z-0 object-center' src={`https://englishwithmovies.blob.core.windows.net/avatar/${avatarUser?.imgName}`} alt="profile" />
                                                                {
                                                                    userData?.userFrames &&
                                                                    userData?.userFrames.map((frame) => {
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
                                                    </div>)
                                            )
                                        }
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </>

                )
            }
        </>
    )
}