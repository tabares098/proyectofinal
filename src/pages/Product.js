import React from 'react';
import { useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios"
import {useDispatch, useSelector} from 'react-redux';
import{getProductsThunk} from '../redux/actions';
import { Link } from 'react-router-dom';
import "../styles/Product.css";
import "../styles/Home.css"


const Product = () => {
    
    const {id} = useParams();
    const [producFilter, setProducFilter] = useState([]);
    const dispatch = useDispatch();
    const product = useSelector(state => state.products);

    useEffect(()=> dispatch(getProductsThunk()),[ dispatch]);

      
     const Producfound =  product.find(product => product.id === Number(id));
    useEffect(()=>{
        if(Producfound){
            axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${Producfound?.category.id}`)
           .then(res => setProducFilter(res.data.data.products));
        }
        
    },[dispatch,Producfound]);


 
    return (
        
          <div className='productDetail'>
              
            <section>
                <div className='productDescription'><p>{Producfound?.description}</p>
                <button > <i className="fa-solid fa-cart-shopping"> Add to cart</i> </button>
                </div>

                <div className='productDescription'>
                <img  src={Producfound?.productImgs[2]} alt="" />                   
                </div>
            </section>
           <div className='categoryLike'>
           <ul>
                 {
                    producFilter.map(product =>(
                        <li key={product.id}>
                        <Link to={`/product/${product.id}`}>
                          <div className='card-image'>
                            <img src={product.productImgs[2]} alt="producto" /> 
                          </div>  
                            <div className='card-info'>
                                
                                <h4>{product.title} </h4>
                                <h3>${product.price}</h3>
                              
                            </div>                            
                        </Link>  
                       </li> 
                    ))
                } 
            </ul>
           </div>
          </div>
        
    );
};

export default Product;