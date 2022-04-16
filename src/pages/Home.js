import React, { useEffect,useState } from 'react';
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
    },[])


console.log(categories)

 const searchCate = e => {
     e.preventDefault();
     dispatch(filterCatethunk(cate));
 }
    return (
        <div className='info' >
            <form onSubmit={searchCate}>
                <input type="text" placeholder="What are you looking for?" 
                value={cate}
                onChange={e => setCate(e.target.value)} 
                 />
                <button><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
           
            <div className='categories'>
                {
                    categories.map((category) =>(
                    <button key={category.id}
                    onClick={()=> dispatch(filterCategorythunk(category.id))}>
                        {category.name}
                        </button> 
                    ))
                }
            </div>

            <div className='ProductContainer'>
                <ul className="new-list">
                {
                    products.length === 0 ? (
                        <p>Me didn't Found news with the filter</p>
                    ) : (
                        products.map(product=>(
                       <li key={product.id}>
                         <div className='card-image'>
                            <img src={product.productImgs[0]} alt="producto" /> 
                        </div>  
                        <div className='card-info'>
                            <Link to={`/product/${product.id}`}>{product.title}</Link>   
                            <p>Price </p>
                            <span>$ 20.000</span>
                            <button><i class="fa-solid fa-cart-shopping"></i></button>  
                        </div>
                       </li> 
                    ))
                    )
                
                    
                }
                </ul>
            </div>
        </div>
    );
};

export default Home;