import React from 'react';
import { useEffect,useState} from 'react';
import navbar from "../styles/navbar.css"
import axios from "axios"

const NavBar = e => {
    const [isLoginOpen, setisLoginOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const login = e => {
        e.preventDefault();
        const credentials = {email,password}
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', credentials)
        .then(res=> { localStorage.setItem("token", res.data.data.token)
          setLoginError("");
          setisLoginOpen(false);
          })

        .catch(error => {
            setLoginError(error.response.data.message);
        })

    }
    console.log(localStorage.getItem("token"))
    return (
        <div className='navbar'>
            <nav>
                 <strong>ecomerce</strong> <br />
                 <button onClick={() => setisLoginOpen(!isLoginOpen)}>
                 Login
                 </button>
            </nav>
            
                <form onSubmit={login} className={`login ${isLoginOpen ? 'open' : ''}`} >


                    
                        
                       


                                <>
                          <input 
                                type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)}  placeholder="Email"/>
                                <br />
                    <input type="password"
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)} placeholder="Password" />
                              {loginError}
                              <button>ingresar</button>
                   
                                </>
                            )
                        
                     
                    
                </form>
            
            
        </div>
    );
};

export default NavBar;