import Container from "react-bootstrap/esm/Container";

export default function PremiumFirstPage({setPage, setPrice}) {
    return (
        <>
            <div className="bg-[var(--bg-color)] text-[var(--text-color)] py-5">
                <Container>
                    <div>
                        <h2 className="font-['Kanit'] text-center">Premium üzv olmaq üçün tələs!</h2>
                        <div className="grid grid-cols-2 max-w-[800px] min-h-[200px] mx-auto my-4 gap-6 font-['PT_Serif']">
                            <div className="flex flex-col items-center justify-between p-2 border-4 border-[var(--movies-bg)] rounded">
                                <div onClick={() => {setPrice(5); setPage("premium-payment")}}
                                    className="py-3 w-full text-center text-xl font-bold bg-[var(--movies-bg)] rounded cursor-pointer border-2 border-[var(--movies-bg)] hover:bg-transparent transition-all duration-200 ease-in">
                                    AYLIQ 5.00$
                                </div>
                                <div onClick={() => {setPrice(50); setPage("premium-payment")}}
                                    className="py-3 w-full text-center text-xl font-bold bg-[var(--movies-bg)] rounded cursor-pointer border-2 border-[var(--movies-bg)] hover:bg-transparent transition-all duration-200 ease-in my-3">
                                    İLLİK 50.00$
                                </div>
                                <div onClick={() => {setPrice(200); setPage("premium-payment")}}
                                className="py-3 w-full text-center text-xl font-bold bg-[var(--movies-bg)] rounded cursor-pointer border-2 border-[var(--movies-bg)] hover:bg-transparent transition-all duration-200 ease-in">
                                    ÖMÜRLÜK 200.00$
                                </div>
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
        </>
    )
}