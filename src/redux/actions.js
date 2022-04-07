//1.declarar propiedad en el objeto actions
//2.crear el case con la propiedad creada en 1
//3.hacer la funciom que retorne laaccion
//4.se despacha la funcion en un componente o  thunk

import axios from "axios"

export const actions = {
    setProducts: "SET_PRODUCTS",
    setIsLoading: "SET_IS_LOADING",
    setCategories: "SET_CATEGORIES",
}
export const setProducts = products => ({
type:actions.setProducts,
payload : products
})

export const setIsLoading = isLoading => ({
    type: actions.setIsLoading,
    payload : isLoading
})
export const setCategories = categories => ({
    type: actions.setCategories,
    payload : categories
})

export const getProductsThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
      return  axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
        .then(res=> dispatch(setProducts(res.data.data.products)))
        .finally(()=>dispatch(setIsLoading(false)));
    }
}

export const getCategoriesthunk = () =>{
    return dispatch => {
        dispatch(setIsLoading(true))
      return  axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
        .then(res=> dispatch(setCategories(res.data.data.categories)))
        .finally(()=>dispatch(setIsLoading(false)));
    }
}
export const filterCategorythunk = id =>{
    return dispatch =>{
        dispatch(setIsLoading(true));
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
        .then(res=> dispatch(setProducts(res.data.data.products)))
        .finally(()=>dispatch(setIsLoading(false)));
    }
}

export const filterCatethunk = cate =>{
    return dispatch =>{
        dispatch(setIsLoading(true));
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${cate}`)
        .then(res=> dispatch(setProducts(res.data.data.products)) )
        .finally(()=> dispatch(setIsLoading(false)))
    }

}