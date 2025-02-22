import Container from "react-bootstrap/esm/Container"
import LoaderIcon from "../../../components/Loaders/Loader"
import { useGetAllFrameQuery } from "../../../redux/rtk query/Slices/frameSlice"
import Helmet from 'react-helmet'
import premiumIcon from "../../../assets/premium-icon.png"
import { useGetByIdUserQuery, useUserBuyFrameMutation, useUserUpdateCurrentFrameMutation } from "../../../redux/rtk query/Slices/userSlice"
import { useContext } from "react"
import { userInfoContext } from "../../../context/UserInfo"
import { useNavigate } from "react-router"


export default function FrameStore() {
    let navigate = useNavigate()
    let { data: allFrame, refetch, isLoading } = useGetAllFrameQuery()
    console.log(allFrame);
    let { userInfo } = useContext(userInfoContext)
    let { data: userData, refetch: userRefetch } = useGetByIdUserQuery(userInfo?.userId)
    console.log(userData);
    let [userUpdateCurrentFrame] = useUserUpdateCurrentFrameMutation()
    let [userBuyFrame] = useUserBuyFrameMutation()

    const buyFrame = async (frame) => {
        if (!userData?.id) {
            navigate('/login')
        } else if (frame.isPremium && userData?.subscriptionId == 1) {
            navigate('/premium')
        } else {
            const response = await userBuyFrame({ userId: userData?.id, frameId: frame.id })
            console.log(response);
            if (response.error) {
                alert(response.error.data)
            }
        }
        refetch()
        userRefetch()
    }

    const chooseCurrentFrame = async (frame) => {
        const response = await userUpdateCurrentFrame({ userId: userData?.id, frameId: frame.id })
        console.log(response);
        refetch()
        userRefetch()
    }

    return (
        <>
            <Helmet>
                <title>Frame market</title>
            </Helmet>
            {
                isLoading ? (
                    <LoaderIcon />
                ) : (
                    <div className="bg-[var(--bg-color)] text-[var(--text-color)] py-[130px]">
                        <Container>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                {
                                    allFrame.length ? (
                                        allFrame.map((frame) => (
                                            <div key={frame.id} className="relative flex flex-col items-center justify-center transition-all duration-250 p-1 rounded hover:bg-[var(--movies-bg)]">
                                                <img src={`https://englishwithmovies.blob.core.windows.net/frame/${frame.imgName}`} alt="frame" className="aspect-square object-cover" />
                                                <h4 className="font-['Kanit']">{frame.name}</h4>
                                                <div className="flex items-end gap-1">
                                                    {
                                                        userData?.userFrames.length &&
                                                            userData?.userFrames.some((userFrame) => userFrame.frameId === frame.id) ? (
                                                            <button
                                                                onClick={() => chooseCurrentFrame(frame)}
                                                                className="bg-[var(--movies-bg)] px-2 py-1 rounded font-bold text-lg transition-all duration-250 hover:bg-[var(--bg-color)]"
                                                            >
                                                                {userData?.userFrames.some((userFrame) => userFrame.frameId === frame.id && userFrame.isCurrent)
                                                                    ? "Seçilib"
                                                                    : "Seçin"}
                                                            </button>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    onClick={() => buyFrame(frame)}
                                                                    className="bg-[var(--movies-bg)] px-2 py-1 rounded font-bold text-lg transition-all duration-250 hover:bg-[var(--bg-color)]"
                                                                >
                                                                    {frame.pointsRequired}
                                                                </button>
                                                                <span className="text-xl font-bold">Point</span>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className='absolute top-3 right-3 text-2xl w-[30px] h-[30px]'>{frame.isPremium ? (
                                                    <img className='w-full h-full' src={premiumIcon} alt="" />
                                                ) : ("")}</div>
                                            </div>
                                        ))
                                    ) : (<></>)
                                }
                            </div>
                        </Container>
                    </div>
                )
            }
        </>
    )
}