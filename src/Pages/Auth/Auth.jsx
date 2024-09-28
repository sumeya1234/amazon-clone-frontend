import React, {useState, useContext} from 'react'
import classes from "./auth.module.css";
import Logo from "../../assets/images/amazon-logo.png";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {auth} from "../../Utility/firebase"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {DataContext} from "../../Components/DataProvider/DataProvider"
import { Type } from '../../Utility/action.type';
import {ClipLoader} from "react-spinners";
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [{user}, dispatch] = useContext(DataContext);
    const navigate = useNavigate();
    const navStateData = useLocation();
    const [loading, setIsLoading] = useState({
        signIn: false,
        signUp: false
    })
    const authHandler = (e) =>{
        e.preventDefault()
        if(e.target.name=="signIn"){
            setIsLoading({...loading, signIn: true})
            signInWithEmailAndPassword(auth, email, password)
            .then((userInfo) => {
                dispatch({
                    type:Type.SET_USER,
                    user:userInfo.user
                })
                setIsLoading({ ...loading, signIn:false})
                navigate(navStateData?.state?.redirect || "/");
            }).catch((err)=> {
                setError(err.message)
                setIsLoading({ ...loading, signIn:false})
            })
        }
        else{
            setIsLoading({ ...loading, signUp: true });
            createUserWithEmailAndPassword(auth, email, password)
            .then((userInfo) => {
                dispatch({
                    type:Type.SET_USER,
                    user:userInfo.user
                });
                setIsLoading({ ...loading, signUp: false });
                navigate(navStateData?.state?.redirect || "/");
            }).catch((err)=> {
                setError(err.message);
                setIsLoading({ ...loading, signUp: false });
            })
        }
    }
    return (
        <section className={classes.login}>
            <Link to={"/"}>
                <img src={Logo} alt="" />
            </Link>
            <div className={classes.login_container}>
                <h1>Sign In</h1>
                {
                    navStateData?.state?.msg && (
                        <small
                            style={{
                                padding:"5px",
                                textAlign: "center",
                                color: "red",
                                fontWeight: "bold"
                            }}
                        >
                            {navStateData?.state?.msg}
                        </small>
                    )
                }
                <form action="">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" />
                    </div>
                    <button type="submit" onClick={authHandler} name="signIn" className={classes.signIn_button}>
                        {
                            loading.signIn ? (<ClipLoader color='#000' size={15}/>) : 
                            ("Sign In")
                        }
                    </button>
                </form>
                <p>
                    {/* Agreement */}
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of the Use and Sale. Please see our Privacy notice, our cookies Notice and our Internet-Based Ads Notice. 
                </p>
                <button type="submit" onClick={authHandler} name="signUp" className={classes.register_button}>
                    {
                        loading.signUp ? (<ClipLoader color='#000' size={15}/>) : 
                        ("Create your Amazon Account")
                    }
                </button>
                {
                    error && <small style={{ paddingTop:"5px", color:"red"}}>{error}</small>
                }
            </div>
        </section>
    )
}

export default Auth
