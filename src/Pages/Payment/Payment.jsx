import React, { useContext, useState } from 'react'
import classes from "./payment.module.css";
import LayOut from '../../Components/LayOut/LayOut';
import {DataContext } from "../../Components/DataProvider/DataProvider"
import ProductCard from "../../Components/Product/ProductCard"
import { useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../API/axios';
import {ClipLoader} from "react-spinners";
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, setDoc, doc } from 'firebase/firestore';
import { Type } from '../../Utility/action.type';
const Payment = () => {
  const [{user, basket}, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item)=>{
      return item.amount + amount;
    },0);
  const total = basket.reduce((amount, item) => {
    return item?.price * item?.amount + amount;
  }, 0);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cardError, setCardError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("")
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    // setCardError(null);
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total*100}`,
      });
      const clientSecret = response.data?.clientSecret;
      console.log(clientSecret)
      const {paymentIntent, error} = await stripe.confirmCardPayment(
        clientSecret, 
        {
          payment_method : {
          card: elements.getElement(CardElement)
          }
        });
        if (error) {
          setCardError(error.message);
          setProcessing(false);
        return;
      }
      await setDoc(
        doc(collection(db, "user"), user.uid, "orders", paymentIntent.id),
        {
          basket: basket, 
          amount: paymentIntent.amount, 
          created: paymentIntent.created
        });
        // empty the basket
        dispatch({type:Type.EMPTY_BASKET});
      setProcessing(false);
      navigate("/orders", { state : {msg: "You have placed new order"}})
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  }
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>
        Checkout ({totalItem}) items
      </div>
      <hr />
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {
                      processing ? (
                        <div className={classes.loading}>
                          <ClipLoader color="gray" size={12} />
                          <p>Please Wait ...</p>
                        </div>
                      ) : (
                      "Pay now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment
