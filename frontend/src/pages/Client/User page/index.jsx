import Container from 'react-bootstrap/Container';
import Cup from '../../../assets/trophy.png'
import Calcifer from '../../../assets/calcifer-streak1.png'
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';

export default function UserProfile() {
    let navigate = useNavigate()

    return (
        <>
            <Helmet>
                <title>Profilim</title>
            </Helmet>
            <div className='user-profile py-5 bg-[var(--bg-color)] text-[var(--text-color)]'>
                <Container>
                    <div className='grid grid-cols-[1fr_2fr_2fr] gap-[50px]'>
                        <div>
                            <div>
                                <img className='w-full' src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg" alt="profile" />
                            </div>
                            <h4
                                onClick={() => navigate('/premium')}
                                className='cursor-pointer p-3 rounded-4 transition-all duration-200 ease-in flex items-center justify-center
                            hover:shadow-[0_0px_20px_0px_yellow] cursor-pointer my-2 bg-[var(--movies-bg)]'>PREMİUM OL!</h4>
                            <h5>Sülüman</h5>
                            <h5>Sebastian Szymanski</h5>
                            <div>
                                about about about about about about about about about about about about about about about about about about about about about
                            </div>
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
                            <h4 className='p-3 rounded-3 cursor-pointer my-1 bg-[var(--movies-bg)]'>Bildiyiniz sözlər</h4>
                            <h4 className='p-2 rounded-3 cursor-pointer my-1 bg-[var(--movies-bg)]'>Burda qalmisiniz</h4>
                        </div>
                    </div>


                </Container>

            </div>
        </>

    )
}