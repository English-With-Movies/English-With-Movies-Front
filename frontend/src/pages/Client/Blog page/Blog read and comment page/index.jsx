import { useState } from "react";
import Container from "react-bootstrap/esm/Container";

export default function BlogReadAndComment() {
    let myArray = Array.from({ length: 19 })
    console.log(myArray);
    let [sliceNumber, setSliceNumber] = useState(5)

    const showMoreLess = () => {
        if (myArray.length >= sliceNumber + 5) {
            setSliceNumber(sliceNumber + 5)
        } else if (myArray.length == sliceNumber) {
            setSliceNumber(5)
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (myArray.length < sliceNumber + 5) {
            setSliceNumber(myArray.length)
        }
    }
    const blogContent = "<p>Bu, əvvəl yazılmış məqalənin mətnidir.</p>";

    return (
        <>
            <div className="bg-[var(--bg-color)] text-[var(--text-color)] py-[130px]">
                <Container>
                    <div className="p-3 rounded-4 bg-[var(--movies-bg)] transition-all duration-250 ease-in hover:shadow-gray-500 hover:shadow-lg">
                        <h3 className="font-['Kanit'] text-sm md:text-xl">bursasporlu futbolculara bıçak fırlatılması</h3>
                        <div className="pb-2 sm:text-lg">
                            arkadaşlar ben maçtaydım.
                            bıçak fırlatılması gibi bir durum yok.
                            bıçağı çeken bizzat bursaspor'lu josue.
                            ibreti alem için maç iptal edilip, finale fenerbahçe çıkartılmalı.
                        </div>
                        <div className="flex gap-2 justify-end">
                            <div className="flex flex-col items-end justify-center">
                                <span className="font-['PT_Serif'] text-sm md:text-md">username</span>
                                <span className="font-['PT_Serif'] text-sm md:text-md">19.02.2025 18:56</span>
                            </div>
                            <img className="w-[65px] h-[65px] rounded-full object-cover object-center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2JFyVMUGB2hCmAhFXOdCydqzgsCHd2BAzEA&s" alt="userPhoto" />
                        </div>
                        <div className="w-full h-[1px] bg-gray-500 mt-3"></div>
                        <div className="mb-3 ">
                            {
                                myArray.length > 5 ? (
                                    <>
                                        {
                                            myArray.slice(0, sliceNumber).map(() => (
                                                <div className="mt-4 flex gap-2 ">
                                                    <img className="w-[45px] h-[45px] rounded-full object-cover object-center" src="https://cdn.pixabay.com/photo/2023/12/06/21/07/photo-8434386_640.jpg" alt="userPhoto" />
                                                    <div>
                                                        <div className="text-sm opacity-80">username128937141 19.02.2025 18:56</div>
                                                        <div className="text-sm sm:text-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptatem quia architecto hic similique laborum adipisci alias possimus ipsam facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsum id iste sequi, perspiciatis animi neque nostrum eum, sit cumque cum autem quidem ullam quas nulla magnam tempora! Quibusdam earum ullam nulla temporibus.</div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                        <div className="text-white cursor-pointer flex justify-end">
                                            <button onClick={() => showMoreLess()} className="my-3 py-1 px-3 bg-[#537296] rounded">
                                                {
                                                    myArray.length == sliceNumber ? ('Read Less') : (
                                                        'Read More'
                                                    )
                                                }
                                            </button>

                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )
                            }

                        </div>
                        <div className="flex gap-2 items-center justify-center">
                            <img className="w-[45px] h-[45px] rounded-full object-cover object-center" src="https://cdn.pixabay.com/photo/2023/12/06/21/07/photo-8434386_640.jpg" alt="" />
                            <input type="text" placeholder="Your comment" className="placeholder:text-gray placeholder:opacity-70 rounded-full px-2 py-1 focus:outline-none w-full border-[var(--text-color)] border-1 border-solid" />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}