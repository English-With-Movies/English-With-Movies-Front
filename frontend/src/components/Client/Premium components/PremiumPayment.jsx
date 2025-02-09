import Container from "react-bootstrap/esm/Container";

export default function PremiumPayment({ setPage, price }) {
    console.log(price);

    return (
        <div className="bg-[var(--bg-color)] text-[var(--text-color)] py-5">
            <Container>
                <div>
                    <h2 className="font-['Kanit'] text-center">Aylıq ödəniş üçün məbləğ: {price}$</h2>
                    <div>

                    </div>
                </div>
            </Container>
        </div>
    )
}