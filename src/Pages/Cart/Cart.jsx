import React, { useContext } from 'react'
import classes from "./cart.module.css";
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const Cart = () => {
  const [{basket, user}, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item)=>{
    return item?.price * item?.amount + amount;
  }, 0)
  const increment =(item)=>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item
    })
  }
  const decrement= (item) =>{
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      item
    })
  }
  return (
    <LayOut>
        <section className={classes.container}>
          <div className={classes.cart__container}>
            <h2>Hello</h2>
            <h3>Your shopping Basket</h3>
            <hr />
            {
              basket?.length==0?(<p>Oops! No item in your cart</p>):(
                basket?.map((item, i)=>{
                  return (
                    <section key={item.id}className={classes.cart__product}>
                      <ProductCard
                        key={i}
                        product={item}
                        renderDesc={true}
                        flex={true}
                        renderAdd={false}
                      />
                      <div className={classes.button__container}>
                        <button
                          className={classes.btn}
                          onClick={() => increment(item)}
                        >
                          <IoIosArrowUp size={20} />
                        </button>
                        <span>{item.amount}</span>
                        <button
                          className={classes.btn}
                          onClick={() => decrement(item)}
                        >
                          <IoIosArrowDown size={20} />
                        </button>
                      </div>
                    </section>
                  );
                })
              )
            }
          </div>
          {
            basket?.length !==0 &&(
              <div className={classes.subtotal}>
                <p>Subtotal({basket?.length} items)</p>
                <CurrencyFormat amount={total} />
                <span>
                  <input type="checkbox" />
                  <small>This order contains a gift</small>
                </span>
                <Link to="/payments">Continue to pay</Link>
              </div>
            )
          }
        </section>
    </LayOut>
  )
}

export default Cart
