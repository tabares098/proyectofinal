import React from 'react';
import { useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios"
import {useDispatch, useSelector} from 'react-redux';
import{getProductsThunk} from '../redux/actions';
import { Link } from 'react-router-dom';


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

 console.log(producFilter)
 
    return (
        
            <section>
                {Producfound?.description}
                <img src={Producfound?.productImgs[1]} alt="" />    
                <h2></h2>
            
             
            <ul>
                 {
                    producFilter.map(product =>(
                        <li key={product.id}>
                        <Link to={`/product/${product.id}`}>
                                 {product.title}
                        </Link>   
                           
                        <img src={product.productImgs[0]} alt="" />
                          
                       </li> 
                    ))
                } 
            </ul>
            </section>
        
    );
};

export default Product;