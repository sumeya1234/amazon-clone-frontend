import React, { useContext, useEffect, useState } from "react";
import classes from "./orders.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

const Orders = () => {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user) {
      const userOrdersRef = collection(db, "user", user.uid, "orders"); 
      const q = query(userOrdersRef, orderBy("created", "desc"));
      setIsLoading(true);
      onSnapshot(q, (snapshot) => {
        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setOrders(fetchedOrders);
        setIsLoading(false);
      });
    } else {
      setOrders([]);
      setIsLoading(false); 
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>

          {isLoading ? (
            <div style={{ padding: "20px" }}>
              <Loader/>
            </div>
          ) : (
            <>
              {orders.length === 0 && (
                <div style={{ padding: "25px" }}>
                  Oops! You don't have orders
                </div>
              )}
              {/* Display the orders */}
              <div>
                {orders.map((eachOrder, i) => (
                  <div key={i}>
                    <hr />
                    <p>Order ID: {eachOrder.id}</p>
                    {eachOrder.data.basket?.map((order) => (
                      <ProductCard flex={true} product={order} key={order.id} />
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
