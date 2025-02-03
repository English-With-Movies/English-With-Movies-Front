import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';
import HomeSwipper from '../../../components/Client/Home Swipper';

export default function HomePage() {
    let navigate = useNavigate()

    return (
        <>
            {/* hemlet */}
            <>
                {/* section 1 -> swipper */}
                <HomeSwipper />

                {/* section 2 -> movies and series */}
                <div className="home-page bg-[var(--bg-color)] text-[var(--text-color)]">
                    <Container>
                        <div className="movies-grid grid-cols-5 grid gap-4">
                            <div className='flex flex-col items-center justify-center text-center'>
                                <div
                                    className="text-gray-500 text-2xl flex-col flex font-['Kanit']">
                                    featured movies
                                </div>
                                <div
                                    className="text-gray-500 text-2xl flex-col flex font-['Kanit']">
                                    be quick to learn
                                </div>
                                <div className='text-6xl font-["Kanit"]'>movies</div>
                                <div
                                    className="text-gray-500 text-2xl font-['Kanit'] leading-7">
                                    our picks for you
                                </div>
                                <div
                                    className="text-gray-500 text-2xl font-['Kanit'] leading-7">
                                    trending now
                                </div>
                                <button
                                    onClick={() => navigate("/movies")}
                                    className='px-3 py-1 border-2 rounded-4 border-[#02C9A8] my-3'>see more &#62;&#62;</button>
                            </div>
                            <div className='werere '>
                                <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                            </div>
                            <div>
                                <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                            </div>
                            <div>
                                <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                            </div>
                            <div>
                                <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                            </div>
                        </div>
                        <div className='h-[2px] w-full bg-black my-5'></div>
                        <div className="series-grid grid-cols-5 grid gap-4">
                            <div className='werere '>
                                <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                            </div>
                            <div>
                                <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                            </div>
                            <div>
                                <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                            </div>
                            <div>
                                <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                            </div>
                            <div className='flex flex-col items-center justify-center text-center'>
                                <div
                                    className="text-gray-500 text-2xl flex-col flex font-['Kanit']">
                                    featured series
                                </div>
                                <div
                                    className="text-gray-500 text-2xl flex-col flex font-['Kanit']">
                                    be quick to learn
                                </div>
                                <div className='text-6xl font-["Kanit"]'>series</div>
                                <div
                                    className="text-gray-500 text-2xl font-['Kanit'] leading-7">
                                    our picks for you
                                </div>
                                <div
                                    className="text-gray-500 text-2xl font-['Kanit'] leading-7">
                                    trending now
                                </div>
                                <button
                                    onClick={() => navigate("/series")}
                                    className='px-3 py-1 border-2 rounded-4 border-[#02C9A8] my-3'>see more &#62;&#62;</button>
                            </div>
                        </div>
                    </Container>
                </div>
            </>
        </>
    )
}