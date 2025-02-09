import { Helmet } from "react-helmet";
import PremiumFirstPage from "../../../components/Client/Premium components/Premium";
import PremiumPayment from "../../../components/Client/Premium components/PremiumPayment";
import { useState } from "react";

export default function PremiumPage() {
    let [page, setPage] = useState('premium-first')
    let [price, setPrice] = useState(null)

    return (
        <>
            <Helmet>
                <title>Premium</title>
            </Helmet>
            {page === 'premium-first' && <PremiumFirstPage setPage={setPage} setPrice={setPrice}/>}
            {page === 'premium-payment' && <PremiumPayment setPage={setPage} price={price}/>}
        </>
    )
}