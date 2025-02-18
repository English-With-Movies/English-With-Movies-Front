import Container from 'react-bootstrap/Container';
import Cup from '../../../assets/trophy.png'
import Calcifer from '../../../assets/calcifer-streak1.png'
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { userInfoContext } from '../../../context/UserInfo';
import { useContext } from 'react';
import { useGetByIdUserQuery } from '../../../redux/rtk query/Slices/userSlice';
import LoaderIcon from '../../../components/Loaders/Loader';
import { GrUserSettings } from "react-icons/gr";

export default function UserProfile() {
    let navigate = useNavigate()
    let { userInfo } = useContext(userInfoContext)
    console.log(userInfo);
    let { data, isLoading, isError, error } = useGetByIdUserQuery(userInfo.userId)
    console.log(data);

    return (
        <>
            <Helmet>
                <title>{data?.userName}</title>
            </Helmet>
            {
                isLoading ? (
                    <LoaderIcon />
                ) : (
                    <div className='user-profile bg-[var(--bg-color)] text-[var(--text-color)] pt-[130px] pb-[30px]'>
                        <Container>
                            <div className='grid grid-cols-[1fr_2fr_2fr] gap-[50px]'>
                                <div className='font-["PT_Serif"]'>
                                    <div className='w-[300px] h-[300px] flex items-center justify-center relative'>
                                        <img className='w-[80%] rounded-full aspect-square object-cover z-0' src="https://marketplace.canva.com/EAF75sVF3q8/1/0/900w/canva-pink-cute-ribbon-quote-phone-wallpaper-AnXsf2cfOpI.jpg" alt="profile" />
                                        <div className='bg-[url("https://static.vecteezy.com/system/resources/thumbnails/034/385/584/small/circle-shape-neon-frame-png.png")] bg-no-repeat bg-cover bg-center w-[300px] h-[300px] absolute z-10'></div>
                                    </div>
                                    <h4
                                        onClick={() => navigate('/premium')}
                                        className='cursor-pointer p-3 rounded-4 transition-all duration-200 ease-in flex items-center justify-center
                                        hover:shadow-[0_0px_20px_0px_yellow] cursor-pointer my-2 bg-[var(--movies-bg)]'>PREMİUM OL!</h4>
                                    <h5 className='font-["Kanit"]'>{data.userName}</h5>
                                    <h5>{data.firstName} {data.lastName}</h5>
                                    <div className='text-lg'>{data.about}</div>
                                    <div className='mt-2 flex gap-2 items-center text-gray-400 cursor-pointer'><GrUserSettings /> Parametrlər</div>
                                </div>

                                <div>
                                    <div className='w-full h-[400px] bg-lime-400'>
                                        
                                    </div>
                                </div>
                                <div>
                                    <div className='grid grid-cols-2 gap-3 mb-4'>
                                        <div className='cursor-pointer p-3 rounded-4 
                            transition-all duration-200 ease-in flex items-center justify-center
                            hover:shadow-[0_0px_20px_0px_yellow] hover:bg-[var(--movies-bg)]'
                                            onClick={() => navigate('points-ranking')}>
                                            <img src={Cup} alt="" />
                                        </div>
                                        <div className='flex flex-col cursor-pointer rounded-4 items-center justify-center px-1
                            transition-all duration-200 ease-in
                            hover:shadow-[0_0px_20px_0px_yellow] hover:bg-[var(--movies-bg)]'
                                            onClick={() => navigate('streak-ranking')}>
                                            <img src={Calcifer} className="w-[50%]" />
                                            <h4 className='text-center'>STREAK 777 GÜN</h4>
                                            <p className='text-center'>Hər gün Quiz'dən ən azı 1000 xal topla və serini davam etdir!</p>
                                        </div>
                                    </div>
                                    <div onClick={() => navigate('known-words')}>
                                        <h4 className='p-3 rounded-3 cursor-pointer my-1 bg-[var(--movies-bg)] transition-all duration-200 ease-in flex items-center justify-center
                                hover:shadow-[0_0px_20px_0px_yellow] hover:bg-[var(--movies-bg)]'>Bildiyiniz sözlər</h4>
                                        <div></div>
                                    </div>
                                    <h4 className='p-3 rounded-3 cursor-pointer my-1 bg-[var(--movies-bg)]'>Burda qalmisiniz</h4>
                                </div>
                            </div>


                        </Container>

                    </div>
                )
            }

        </>

    )
}