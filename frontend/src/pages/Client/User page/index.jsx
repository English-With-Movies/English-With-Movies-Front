import Container from 'react-bootstrap/Container';
import Cup from '../../../assets/trophy.png'
import Calcifer from '../../../assets/calcifer-streak1.png'
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { userInfoContext } from '../../../context/UserInfo';
import { useContext, useEffect, useState } from 'react';
import { useGetByIdUserQuery } from '../../../redux/rtk query/Slices/userSlice';
import LoaderIcon from '../../../components/Loaders/Loader';
import { GrUserSettings } from "react-icons/gr";
import { useGetByIdAvatarQuery } from '../../../redux/rtk query/Slices/avatarSlice';

export default function UserProfile() {
    const { userInfo } = useContext(userInfoContext);
    const navigate = useNavigate();
    const userId = userInfo?.userId ?? "";

    const userQuery = useGetByIdUserQuery(userId, {
        skip: !userId
    });

    const avatarQuery = useGetByIdAvatarQuery(userQuery.data?.avatarId, {
        skip: !userQuery.data?.avatarId
    });

    if (userQuery.isError) {
        return <div>Xəta baş verdi: {userQuery.error?.message}</div>;
    }

    const userData = userQuery.data;
    const avatarData = avatarQuery.data;
    console.log(userData);
    console.log(avatarData);


    return (
        <>
            <Helmet>
                <title>{userData?.userName}</title>
            </Helmet>
            {
                userQuery.isLoading ? (
                    <LoaderIcon />
                ) : (
                    // <div className='user-profile bg-[var(--bg-color)] text-[var(--text-color)] pt-[150px] pb-[20px]'>
                    //     <Container>
                    //         <div className='flex flex-col lg:grid lg:grid-cols-3 gap-6'>
                    //             {/* Profil Bölməsi */}
                    //             <div className='font-["PT_Serif"]'>
                    //                 <div className='relative flex items-center justify-center w-[220px] h-[220px]'>
                    //                     <img className='w-[75%] rounded-full object-cover z-0' src={`https://englishwithmovies.blob.core.windows.net/avatar/${avatarData?.imgName}`} alt='profile' />
                    //                     <div className='absolute w-full h-full bg-cover bg-center z-10 bg-[url("https://static.vecteezy.com/system/resources/thumbnails/034/385/584/small/circle-shape-neon-frame-png.png")]'></div>
                    //                 </div>
                    //                 <h4 onClick={() => navigate('/premium')} className='cursor-pointer p-2 rounded transition duration-200 hover:shadow-yellow-400 my-3 bg-[var(--movies-bg)]'>PREMİUM OL!</h4>
                    //                 <h5 className='font-["Kanit"] text-lg'>{userData?.userName}</h5>
                    //                 <h5 className='text-md'>{userData?.firstName} {userData?.lastName}</h5>
                    //                 <p className='text-base'>{userData?.about}</p>
                    //                 <p className='text-base'>Ümumi xal: <span className='text-orange-500'>{userData?.point}</span></p>
                    //                 <div className='flex items-center gap-2 text-gray-400 cursor-pointer'><GrUserSettings /> Parametrlər</div>
                    //             </div>

                    //             {/* Sağdakı Bölmə */}
                    //             <div>
                    //                 <div className='grid grid-cols-2 gap-4 mb-4'>
                    //                     <div className='cursor-pointer p-2 rounded transition hover:shadow-yellow-400 bg-[var(--movies-bg)]' onClick={() => navigate('points-ranking')}>
                    //                         <img src={Cup} className='w-full rounded' alt='Points Ranking' />
                    //                     </div>
                    //                     <div className='cursor-pointer flex flex-col items-center p-2 rounded transition hover:shadow-yellow-400 bg-[var(--movies-bg)]' onClick={() => navigate('streak-ranking')}>
                    //                         <img src={Calcifer} className='w-[50%]' alt='Streak' />
                    //                         <h5 className='text-center text-sm'>STREAK {userData?.streak} GÜN</h5>
                    //                         <p className='text-center text-xs'>Hər gün Quiz'dən ən azı 1000 xal topla və serini davam etdir!</p>
                    //                     </div>
                    //                 </div>
                    //                 <h4 onClick={() => navigate('known-words')} className='p-3 rounded bg-[var(--movies-bg)] cursor-pointer transition hover:shadow-yellow-400'>Bildiyiniz sözlər</h4>
                    //             </div>

                    //             {/* Ortadakı Bölmə Mobil üçün Aşağıda */}
                    //             <div className='w-full h-[350px] bg-lime-400 rounded-lg order-last lg:order-none'></div>
                    //         </div>
                    //     </Container>
                    // </div>
                    <div className='user-profile bg-[var(--bg-color)] text-[var(--text-color)] pt-[170px] pb-[20px]'>
                        <Container>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {/* Profil Bölməsi */}
                                <div className='font-["PT_Serif"]'>
                                    <div className='relative flex items-center justify-center w-[220px] h-[220px]'>
                                        <img className='w-[75%] h-[75%] rounded-full object-cover z-0' src={`https://englishwithmovies.blob.core.windows.net/avatar/${avatarData?.imgName}`} alt="profile" />
                                        <div className='absolute w-full h-full bg-cover bg-center z-10 bg-[url("https://static.vecteezy.com/system/resources/thumbnails/034/385/584/small/circle-shape-neon-frame-png.png")]'></div>
                                    </div>
                                    <h4 onClick={() => navigate('/premium')} className='cursor-pointer p-2 rounded transition duration-200 hover:shadow-yellow-400 my-3 bg-[var(--movies-bg)] hover:shadow-[0_0px_20px_0px_yellow] hover:bg-[var(--movies-bg)]'>PREMİUM OL!</h4>
                                    <h5 className='font-["Kanit"] text-lg'>{userData?.userName}</h5>
                                    <h5 className='text-md'>{userData?.firstName} {userData?.lastName}</h5>
                                    <p>{userData?.about}</p>
                                    <p>Ümumi xal: <span className='text-orange-500 font-bold text-lg'>{userData?.point}</span></p>
                                    <div className='flex items-center gap-2 text-gray-400 cursor-pointer'><GrUserSettings /> Parametrlər</div>
                                </div>

                                {/* Sağdakı Bölmə */}
                                <div>
                                    <div className='grid grid-cols-2 gap-4 mb-4'>
                                        <div className='hover:shadow-[0_0px_20px_0px_yellow] hover:bg-[var(--movies-bg)] cursor-pointer p-2 rounded transition hover:shadow-yellow-400 bg-[var(--movies-bg)]' onClick={() => navigate('points-ranking')}>
                                            <img src={Cup} className='w-full rounded' alt="Points Ranking" />
                                        </div>
                                        <div className='cursor-pointer flex flex-col items-center justify-center p-2 rounded transition hover:shadow-yellow-400 bg-[var(--movies-bg)] hover:shadow-[0_0px_20px_0px_yellow] hover:bg-[var(--movies-bg)]' onClick={() => navigate('streak-ranking')}>
                                            <div className='items-center justify-center flex flex-col'>
                                                <img src={Calcifer} className='w-[50%]' alt="Streak" />
                                                <h5 className='text-center text-sm'>STREAK {userData?.streak} GÜN</h5>
                                                <p className='text-center text-xs'>Hər gün Quiz'dən ən azı 1000 xal topla və serini davam etdir!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 onClick={() => navigate('known-words')} className='p-3 rounded bg-[var(--movies-bg)] cursor-pointer transition hover:shadow-yellow-400 hover:shadow-[0_0px_20px_0px_yellow] hover:bg-[var(--movies-bg)]'>Bildiyiniz sözlər</h4>
                                </div>

                                {/* Ortadakı Bölmə */}
                                <div className='w-full h-[350px] bg-lime-400 rounded-lg'></div>
                            </div>
                        </Container>
                    </div>

                )
            }
        </>
    )
}