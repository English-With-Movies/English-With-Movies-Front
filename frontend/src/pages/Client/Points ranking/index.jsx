import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet";
import { FaMedal } from "react-icons/fa6";
import { useGetRanksForPointQuery } from "../../../redux/rtk query/Slices/rankSlice";
import { useContext, useEffect, useState } from "react";
import { userInfoContext } from "../../../context/UserInfo";
import { useNavigate } from "react-router";
import LoaderIcon from "../../../components/Loaders/Loader";
import { useGetByIdUserQuery } from "../../../redux/rtk query/Slices/userSlice";

export default function PointsRanking() {
    let navigate = useNavigate()
    let { userInfo } = useContext(userInfoContext)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    let { data: userData } = useGetByIdUserQuery(userInfo.userId)
    let { data, isLoading } = useGetRanksForPointQuery(userInfo?.userId)
    let [pointsRanking, setPointsRanking] = useState()
    useEffect(() => {
        if (!isLoading && data) {
            setPointsRanking(data?.toSorted((a, b) => b.value - a.value))
        }
    }, [isLoading, data])

    return (
        <>
            <Helmet>
                <title>Xal Sıralaması</title>
            </Helmet>
            {
                isLoading ? (
                    <LoaderIcon />
                ) : (
                    <div className="pt-[103px]">
                        <div className="bg-[var(--bg-color)] text-[var(--text-color)] py-2">
                            <Container>
                                <div className="max-w-[1000px] mx-auto my-0">
                                    <div className="my-5">
                                        <p className="text-center text-3xl font-['Dancing_Script']">ÜMUMİ XAL SIRALAMASI</p>
                                        <div className="grid grid-cols-3 items-end">
                                            <div className="flex flex-col items-center justify-center">
                                                <div onClick={() => navigate(`/user/${pointsRanking?.[1]?.userName}`)} className="cursor-pointer">{pointsRanking?.[1]?.userName}</div>
                                                <div>{pointsRanking?.[1]?.value}</div>
                                                <div className="border-[8px] border-r-0 border-solid border-[var(--movies-bg)] w-full h-[100px] md:h-[150px] flex items-center justify-center text-4xl md:text-7xl text-[gray]">
                                                    <FaMedal />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <div onClick={() => navigate(`/user/${pointsRanking?.[0]?.userName}`)} className="cursor-pointer">{pointsRanking?.[0]?.userName}</div>
                                                <div>{pointsRanking?.[0]?.value}</div>
                                                <div className="border-[8px] border-solid border-[var(--movies-bg)] w-full h-[130px] md:h-[200px] flex items-center justify-center text-4xl md:text-7xl text-[yellow]">
                                                    <FaMedal />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <div onClick={() => navigate(`/user/${pointsRanking?.[2]?.userName}`)} className="cursor-pointer">{pointsRanking?.[2]?.userName}</div>
                                                <div>{pointsRanking?.[2]?.value}</div>
                                                <div className="border-[8px] border-l-0 border-solid border-[var(--movies-bg)] w-full h-[70px] md:h-[100px] flex items-center justify-center text-4xl md:text-7xl text-[#CD7F32]">
                                                    <FaMedal />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="bg-[var(--movies-bg)] max-[576px]:overflow-x-scroll">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-[var(--movies-bg)] text-xl text-gray-500 border-y">
                                                    <td className="font-semibold p-3">#</td>
                                                    <td>İstifadəçi</td>
                                                    <td>Point</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    pointsRanking?.slice(3)?.map((user, index) => (
                                                        <tr key={user.id}
                                                            className={`bg-[var(--movies-bg)] text-xl text-[var(--text-color)] border-y ${userData?.userName == user.userName ? "border-3 border-[#06b6d4]" : ""}`}>
                                                            <td className="p-3">{index + 4}</td>
                                                            <td><span onClick={() => navigate(`/user/${user.userName}`)} className="cursor-pointer">
                                                                {user.userName}</span></td>
                                                            <td>{user.value}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                )
            }

        </>
    )
}