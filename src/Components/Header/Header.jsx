import React, { useContext } from 'react'
import classes from './header.module.css'
import Logo from "../../assets/images/amazon.png"
import Flag from "../../assets/images/flag1.jpg"
import { SlLocationPin } from "react-icons/sl"
import { CiSearch } from "react-icons/ci";
import { BiCart } from "react-icons/bi"
import LowerHeader from './LowerHeader'
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider'
import { auth } from '../../Utility/firebase'

const Header = () => {
    const [{user, basket},dispatch] = useContext(DataContext);
    const totalItem = basket?.reduce((amount, item)=>{
        return item.amount + amount;
    },0)
    return (
        <section className={classes.fixed}>
            <section>
                <div className={classes.header__container}>
                    <div className={classes.logo__container}>
                        <Link to="/">
                            <img src={Logo} alt="Amazon logo" />
                        </Link>
                        <div className={classes.delivery}>
                            <span><SlLocationPin /></span>
                            <div>
                                <p>Deliver to</p>
                                <span>Ethiopia</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.search}>
                        {/* search */}
                        <select name="" id="">
                            <option value="">All</option>
                        </select>
                        <input type="text" placeholder='Search product' />
                        <CiSearch size={39}/>
                        {/* icon */}
                    </div>
                    {/* right side link */}
                    <div className={classes.order__container}>
                        {/* <div> */}
                            <Link to="" className={classes.language}>
                                <img src={Flag} alt="American flag" />
                            <select name="" id="">
                                <option value="">EN</option>
                            </select>
                            </Link>
                        {/* </div> */}
                        {/* three components */}
                        <Link to={!user && "/auth"}>
                            <div>
                                {
                                    user ? (
                                        <>
                                            <p>Hello, {user?.email?.split("@")[0]}</p>
                                            <span onClick={()=> auth.signOut()}>Sign Out</span>
                                        </>
                                    ) : (
                                        <>
                                            <p>Hello, Sign In</p>
                                            <span>Account and Lists</span>
                                        </>
                                    )
                                }
                            </div>
                        </Link>
                        {/* oredrs */}
                        <Link to="/orders">
                            <p>Returns</p>
                            <span>& Orders</span>
                        </Link>
                        {/* cart */}
                        <Link to="/cart" className={classes.cart}>
                            {/* icon */}
                            <BiCart size={35}/>
                            <span>{totalItem}</span>
                        </Link>
                    </div>
                </div>
            </section>
            <LowerHeader />
        </section>
    )
}

export default Header
