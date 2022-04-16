import React from 'react';
import { useEffect,useState} from 'react';
import "../styles/navbar.css";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const NavBar = e => {
    const [isLoginOpen, setisLoginOpen] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

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
        console.log(localStorage.getItem("token"))
    }
    
    return (
     <div className='navbar'>
        <nav>
                <strong>Amaxon</strong> 
                {/* <i className="fa-solid fa-user"></i> */}
                <form onSubmit={login} className={`login ${isLoginOpen ? 'open' : ''}`} >
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} 
                    placeholder="Email"/>
                    <input type="password" value={password} 
                    onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    
                    <button  onClick={() => setisLoginOpen(!isLoginOpen)}>
                        <i className="fa-solid fa-right-to-bracket login"></i></button>
                </form>
               
        </nav>     

        {loginError} 
     
     </div>
    );
};

export default NavBar;