import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';

export default function SeeMore() {
    let navigate = useNavigate()

    return (
        <div className="home-page bg-[var(--bg-color)] text-[var(--text-color)] py-[80px]">
            <Container>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
                    <div className='flex flex-col items-center justify-center text-center'>
                        <div
                            className="text-gray-500 hidden sm:block sm:text-2xl flex-col flex font-['Kanit']">
                            {/* featured movies */}
                            təqdim edilən filmlər
                        </div>
                        <div
                            className="text-gray-500 sm:text-2xl flex-col flex font-['Kanit']">
                            {/* be quick to learn */}
                            öyrənmək üçün tələs
                        </div>
                        <div className='text-3xl sm:text-6xl font-["Kanit"]'>filmlər</div>
                        <div
                            className="text-gray-500 sm:text-2xl font-['Kanit'] leading-7">
                            {/* our picks for you */}
                            sizin üçün seçilmiş
                        </div>
                        <div
                            className="text-gray-500 hidden sm:block sm:text-2xl font-['Kanit'] leading-7">
                            {/* trending now */}
                            indi trenddədir
                        </div>
                        <button
                            onClick={() => navigate("/movies")}
                            className='px-1 sm:px-3 py-1 border-2 rounded-4 border-[#02C9A8] sm:my-3 
                            hover:shadow-[0_0px_20px_0px_#06b6d4] font-["Kanit"]
                            transition-all duration-150 ease-in'>daha çoxu &#62;&#62;</button>
                    </div>
                    <div>
                        <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                    </div>
                    <div className='hidden md:block'>
                        <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                    </div>
                    <div>
                        <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                    </div>
                    <div className='block lg:hidden xl:block'>
                        <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                    </div>
                    <div className='hidden md:block lg:hidden '>
                        <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                    </div>
                </div>

                <div className='h-[2px] w-full bg-black my-5'></div>

                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
                    <div className='hidden md:block lg:hidden '>
                        <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                    </div>
                    <div>
                        <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                    </div>
                    <div className='hidden md:block'>
                        <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                    </div>
                    <div>
                        <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                    </div>
                    <div className='block lg:hidden xl:block'>
                        <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" alt="" />
                    </div>
                    <div className='flex flex-col items-center justify-center text-center'>
                        <div
                            className="text-gray-500 hidden sm:block sm:text-2xl flex-col flex font-['Kanit']">
                            {/* featured movies */}
                            təqdim edilən filmlər
                        </div>
                        <div
                            className="text-gray-500 sm:text-2xl flex-col flex font-['Kanit']">
                            {/* be quick to learn */}
                            öyrənmək üçün tələs
                        </div>
                        <div className='text-3xl sm:text-6xl font-["Kanit"]'>seriallar</div>
                        <div
                            className="text-gray-500 sm:text-2xl font-['Kanit'] leading-7">
                            {/* our picks for you */}
                            sizin üçün seçilmiş
                        </div>
                        <div
                            className="text-gray-500 hidden sm:block sm:text-2xl font-['Kanit'] leading-7">
                            {/* trending now */}
                            indi trenddədir
                        </div>
                        <button
                            onClick={() => navigate("/movies")}
                            className='sm:px-3 py-1 border-2 rounded-4 border-[#02C9A8] sm:my-3 
                            hover:shadow-[0_0px_20px_0px_#06b6d4] font-["Kanit"]
                            transition-all duration-150 ease-in'>daha çoxu &#62;&#62;</button>
                    </div>
                </div>
            </Container>
        </div>
    )
}