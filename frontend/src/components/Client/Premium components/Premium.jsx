import Container from "react-bootstrap/esm/Container";
import { useGetAllSubscriptionQuery } from "../../../redux/rtk query/Slices/subscription";
import { useEffect } from "react";
import LoaderIcon from "../../Loaders/Loader";

export default function PremiumFirstPage({ setPage, setPrice }) {
    useEffect(() => {

    })

    let { data, isLoading, isError, error } = useGetAllSubscriptionQuery()
    console.log(data);


    return (
        <>
            {
                isLoading ? (
                    <LoaderIcon />
                ) : (
                    <div className="bg-[var(--bg-color)] text-[var(--text-color)] py-5">
                        <Container>
                            <div className="pt-[103px]">
                                <h2 className="font-['Kanit'] text-center">Premium üzv olmaq üçün tələs!</h2>
                                <div className="grid grid-col-1 sm:grid-cols-2 max-w-[800px] min-h-[200px] mx-auto my-4 gap-6 font-['PT_Serif']">
                                    <div className="flex flex-col items-center justify-between p-2 border-4 border-[var(--movies-bg)] rounded gap-3">
                                        {
                                            data.slice(1).map((price) => (
                                                <div onClick={() => { setPrice(price.currentPrice); setPage("premium-payment") }} key={price.id}
                                                    className="py-3 w-full text-center text-xl font-bold bg-[var(--movies-bg)] rounded cursor-pointer border-2 border-[var(--movies-bg)] hover:bg-transparent transition-all duration-200 ease-in">
                                                    <span>{price.name}</span>
                                                    <span className="mx-2">{price.currentPrice}$</span>
                                                    <span className="old-price">{price.oldPrice}$</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="flex flex-col justify-between p-2 border-4 border-[var(--movies-bg)] rounded text-lg font-bold">
                                        <div>1 - Bütün film və seriallar</div>
                                        <div>2 - Maraqlı və fərqli avatar seçimləri</div>
                                        <div>3 - Evlərə pulsuz çatdırılma</div>
                                        <div>4 - İlk sifarişdə 50% endirim</div>
                                    </div>

                                </div>
                            </div>
                        </Container>
                    </div>
                )
            }
        </>
    )
}