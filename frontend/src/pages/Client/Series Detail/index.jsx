import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";

export default function SeriesDetail() {
    // favorites add function
    const [checkboxStates, setCheckboxStates] = useState(
        Array.from({ length: 5 }).fill(false)
    );

    const handleCheckboxChange = (index) => {
        const updatedStates = [...checkboxStates];
        updatedStates[index] = !updatedStates[index];
        setCheckboxStates(updatedStates);
    };

    return (
        <>
            <Helmet>
                <title>`{`series.name`}`</title>
            </Helmet>

            <div className=" py-3 bg-[var(--bg-color)] text-white">
                <Container>
                    <div className="text-[var(--text-color)]">
                        {/* banner */}
                        <div className='bg-[var(--movies-bg)] relative my-0 mx-[auto] max-w-[1320px] height-[500px] w-full'>
                            <img
                                src="https://dummyimage.com/1320x500/eb99eb/343982" className="object-cover object-center w-full" />
                            {/* overlay effect */}
                            <div className="overlay"></div>
                        </div>
                        {/* series about */}
                        <div className="my-0 mx-[auto] max-w-[1200px] flex gap-10 flex-col items-center min-[450px]:flex-row min-[450px]:items-normal">
                            <div className="max-w-[150px] sm:max-w-[200px] w-full -mt-7 ml-7 relative z-index-2">
                                <img src="https://dummyimage.com/300x450/343982/eb99eb" className="w-full" />
                            </div>
                            <div className="text-[var(--text-color)] w-full">
                                <div className="flex items-center">
                                    <h3 className="mr-3">Interstellar</h3>
                                    <span className="px-2 bg-lime-600">KOLAY</span>
                                </div>
                                <div className="my-1 flex items-center">
                                    <div className="text-xl font-semibold mr-3">IMDB: 9.9</div>
                                    <div
                                        onClick={() => handleFavorites()}
                                        className='text-red-500 text-2xl cursor-pointer'>
                                        {/* {favorites.find((fav) => fav.id === item.id) ? <FaHeart/> : <FaRegHeart />} */}
                                        <FaRegHeart />
                                    </div>
                                </div>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore consectetur, impedit facilis fuga nisi odio ullam erit impedit molestiae inventore in?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore consectetur, impedit facilis fuga nisi odio ullam dolorum eveniet excepturi asperiores fugiat repellat tempora sit sunt ea similique eaque? Unde dolore vitae recusandae quam nam </p>

                            </div>

                        </div>
                    </div>
                    {/* level choice */}
                    <div className="max-w-[1000px] mx-auto my-5 text-[var(--text-color)] bg-[var(--movies-bg)] rounded-4 py-3 flex flex-col">
                        <h3 className="text-center mb-4 font-[Kanit]">Sözlərin çətinlik səviyyəsini seçin</h3>
                        <div className="flex items-center gap-2 justify-around flex-wrap sm:flex-nowrap">
                            {
                                Array.from({ length: 5 }).map((_, index) => (
                                    <div key={index + 1}>
                                        <div className="text-[var(--text-color)] font-bold text-lg">LEVEL {index + 1}</div>
                                        <div className="level-button flex items-center justify-center">
                                            <input type="checkbox" className="difficulty-check" id={`difficulty-check-${index + 1}`} checked={checkboxStates[index]} onChange={() => handleCheckboxChange(index)} />
                                            <label htmlFor={`difficulty-check-${index + 1}`} className="theme-label"></label>
                                            <div className="background"></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* <p className="text-[var(--text-color)] mt-4">
                    Seçilən səviyyələr:{" "}
                    {checkboxStates
                        .map((isChecked, index) => (isChecked ? `LEVEL ${index + 1}` : null))
                        .filter(Boolean)
                        .join(", ") || "Heç biri"}
                    </p> */}

                    {/* table */}
                    <div className="rounded max-[750px]:overflow-x-scroll">
                        <table className="rounded-5 w-full whitespace-nowrap">
                            <tbody className="rounded-5">
                                {
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <tr className="bg-[var(--movies-bg)] text-xl rounded-5 text-[var(--text-color)] border-y" key={index}>
                                            <td className="p-3"><HiSpeakerWave /></td>
                                            <td className="p-3">kaçınmak, çekinmek</td>
                                            <td className="p-3">aaaaaaaaaaaaaa</td>
                                            <td className="p-3"><HiSpeakerWave /></td>
                                            <td className="p-3"><HiSpeakerWave /></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </Container>
            </div>
        </>

    )
}