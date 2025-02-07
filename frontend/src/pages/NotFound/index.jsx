import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router";
import Helmet from 'react-helmet'
export default function NotFound() {
    let navigate = useNavigate()
    return (
        <>
        <Helmet><title>Not Found</title></Helmet>
        <div className="bg-[var(--bg-color)] text-[var(--text-color)] flex flex-col items-center justify-center min-h-[70vh]">
            <h1 className="font-['PT_Serif'] text-7xl text-center font-semibold">404 not found :&#40;</h1>
            <button onClick={() => navigate("/")} className="flex items-center justify-center gap-2 border-2 border-solid border-[#02C9A8] py-1 pr-5 rounded-5 text-xl my-3"><IoChevronBack /> Home </button>
        </div>
        </>
    )
}