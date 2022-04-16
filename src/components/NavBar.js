import React from 'react';
import { useEffect,useState} from 'react';
import "../styles/navbar.css";
import axios from "axios"

const NavBar = e => {
    const [isLoginOpen, setisLoginOpen] = useState(true);
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
                 <strong>E-commerce</strong> <br />
                 <button onClick={() => setisLoginOpen(!isLoginOpen)}>
                    <i className="fa-solid fa-user"></i>
                 </button>
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
                              <button><i className="fa-solid fa-right-to-bracket"></i></button>
                   
                                </>
                        
                </form>
            </nav>           
            
        </div>
    );
};

export default NavBar;