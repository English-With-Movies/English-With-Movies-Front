import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useGetAllSubscriptionQuery } from "../../../redux/rtk query/Slices/subscription";
import { Container } from "react-bootstrap";
import LoaderIcon from "../../Loaders/Loader";

export default function PremiumFirstPage() {
  const [price, setPrice] = useState(null);
  const { data, isLoading, isError, error } = useGetAllSubscriptionQuery();

  const onToken = (token) => {
    console.log(token)
  };

  return (
    <>
      {isLoading ? (
        <LoaderIcon />
      ) : (
        <div className="bg-[var(--bg-color)] text-[var(--text-color)] py-5">
          <Container>
            <div className="pt-[103px]">
              <h2 className="font-['Kanit'] text-center">
                Premium üzv olmaq üçün tələs!
              </h2>
              <div className="grid grid-col-1 sm:grid-cols-2 max-w-[800px] min-h-[200px] mx-auto my-4 gap-6 font-['PT_Serif']">
                <div className="flex flex-col items-center justify-between p-2 border-4 border-[var(--movies-bg)] rounded gap-3">
                  {data.slice(1).map((priceOption) => (
                    <div
                      onClick={() => setPrice(priceOption)}
                      key={priceOption.id}
                      className="py-3 w-full text-center text-xl font-bold bg-[var(--movies-bg)] rounded cursor-pointer border-2 border-[var(--movies-bg)] hover:bg-transparent transition-all duration-200 ease-in"
                    >
                      <span>{priceOption.name}</span>
                      <span className="mx-2">{priceOption.currentPrice}$</span>
                      <span className="old-price">{priceOption.oldPrice}$</span>
                    </div>
                  ))}
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

          {price && (
            <StripeCheckout
              stripeKey="pk_test_51QuapsR9cPmdEJUxRm9bziH6KP6CfSG9QoQoXCfWOHAwx3CT5pZ1vo9fnxO5w9EamxdlLrdmdXUZKneRPXz4nzZd00Gb4hwrn8"
              token={onToken}
              amount={price.currentPrice * 100}
              name="Deveducate"
              description="Sample charge"
              image="https://stripe.com/img/documentation/checkout/marketplace.png"
              currency="AZN"
              zipCode={true}
            />
          )}
        </div>
      )}
    </>
  );
}
