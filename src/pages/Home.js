import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import "../styles/Home.css";
import { Link } from 'react-router-dom';
import {getProductsThunk,getCategoriesthunk,filterCategorythunk,filterCatethunk} from '../redux/actions'



const Home = () => {


    const dispatch = useDispatch();
    const [cate, setCate]= useState("");

    const products = useSelector(state=> state.products);
    const categories = useSelector(state=> state.categories);

    useEffect(()=>{
    dispatch(getProductsThunk());
    dispatch(getCategoriesthunk());
    },[dispatch])




 const searchCate = e => {
     e.preventDefault();
     dispatch(filterCatethunk(cate));
 }
    return (
        <>
        <div className='info' >
           <div className='fluid'>
                    <div className='categories'>
                    
                    {
                        categories.map((category) =>(
                        <button key={category.id}
                        onClick={()=> dispatch(filterCategorythunk(category.id))}>
                            {category.name}
                            </button> 
                        ))
                    }
                    <button> Login</button>
                    <button onClick={
                        ()=>{
                           window.alert("Thanks to : Dalia Macías Muñoz - Andres Tabares - Carlos Sarabia")
                        }
                    }> Credits</button>
                    </div>
            </div>
            <form onSubmit={searchCate}>
                <input type="text" placeholder="What are you looking for?" 
                value={cate}
                onChange={e => setCate(e.target.value)} 
                 />
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>

            <div className='ProductContainer'>
                <ul className="new-list">
                {
                    products.length === 0 ? (
                        <p>Me didn't Found news with the filter</p>
                        ) : (
                            products.map(product=>(
                                <li key={product.id}>
                        <Link className="link" to={`/product/${product.id}`}>
                                <div className='card-image'>
                                    <img src={product.productImgs[2]} alt="producto" /> 
                                </div>  
                                <div className='card-info'>
                                   <p>
                                   <h4>{product.title} </h4>
                                    <h3>${product.price}</h3>
                                   </p>
                                    <button ><i className="fa-solid fa-cart-shopping"></i></button>
                                </div>
                        </Link>  
                        </li> 
                    ))
                    )
                
                    
                }
                </ul>
            </div>
            </>
        
    );
};

export default Home;
