import Container from "react-bootstrap/esm/Container";
import { FaMedal } from "react-icons/fa6";

export default function StreakRanking() {
    const userData = [
        { id: 1, name: "Elvin", points: 10 },
        { id: 2, name: "Aysel", points: 20 },
        { id: 3, name: "Nicat", points: 1 },
        { id: 4, name: "Günay", points: 8 },
        { id: 5, name: "Murad", points: 9 },
        { id: 6, name: "Elvinn", points: 3 },
        { id: 7, name: "Aysell", points: 0 },
        { id: 8, name: "Nicatt", points: 0 },
        { id: 9, name: "Günayy", points: 1 },
        { id: 10, name: "Muradd", points: 1 }
    ];

    let sortedUserPoints = userData.toSorted((a, b) => b.points - a.points)
    return (
        <>
            <div className="bg-[var(--bg-color)] text-[var(--text-color)] py-5">
                <Container>
                    <div className="max-w-[1000px] mx-auto my-0">
                        <div className="my-5">
                            <p className="text-center text-3xl font-['Dancing_Script']">ALOV LİDERLİK TABLOSU</p>
                            <div className="grid grid-cols-3 items-end">
                                <div className="flex flex-col items-center justify-center">
                                    <div>{sortedUserPoints[1].name}</div>
                                    <div>{sortedUserPoints[1].points}</div>
                                    <div className="border-[8px] border-r-0 border-solid border-[var(--movies-bg)] w-full 
                                    h-[150px] flex items-center justify-center text-7xl text-[gray]">
                                        <FaMedal />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <div>{sortedUserPoints[0].name}</div>
                                    <div>{sortedUserPoints[0].points}</div>
                                    <div className="border-[8px] border-solid border-[var(--movies-bg)] w-full 
                                    min-h-[200px] flex items-center justify-center text-7xl text-[yellow]">
                                        <FaMedal />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <div>{sortedUserPoints[2].name}</div>
                                    <div>{sortedUserPoints[2].points}</div>
                                    <div className="border-[8px] border-l-0 border-solid border-[var(--movies-bg)] w-full 
                                    h-[100px] flex items-center justify-center text-7xl text-[#CD7F32]">
                                        <FaMedal />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div>
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[var(--movies-bg)] text-xl text-[gray] border-y">
                                        <td className="font-semibold p-3">#</td>
                                        <td>İstifadəçi</td>
                                        <td>Streak</td>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {
                                        sortedUserPoints.slice(3).map((user, index) => (
                                            <tr key={user.id}
                                                className="bg-[var(--movies-bg)] text-xl text-[var(--text-color)] border-y">
                                                <td className="p-3">{index + 4}</td>
                                                <td>{user.name}</td>
                                                <td>{user.points}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}