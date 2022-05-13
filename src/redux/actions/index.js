import { deleteProductFromCart, getFilterCategories, getFilterProducts, getProductById, getProducts, getProductsFromCart } from "../../services"

export const actions =  {
    productSetAll : "@product/setAll",
    productInfoSetById: "@productInfo/setById",
    categoriesSetValues: " @categories/setValues",
    cartSetProducts: "@cart/setProducts"
}

//! const dispatch = useDispatch()
//? dispatch({type: "@product/setAll", payload: data})
//* dispatch(productSetAll(data))

export const productSetAll = (data) => ({
    type : actions.productSetAll,
    payload: data
})

export const setProductInfo = (data) => ({
    type: actions.productInfoSetById,
    payload: data
})

export const setCategories = (data) => ({
    type: actions.categoriesSetValues,
    payload: data
})

export const setProductsToCart = (data) => ({
    type: actions.cartSetProducts,
    payload: data
})

export const setProductThunk = (category) => {
    return (dispatch) => {
        if(category){
            getFilterProducts(category)
                .then((res) => {
                    dispatch(productSetAll(res))
                })
        } else {
            getProducts()
                .then((res) => {
                    dispatch(productSetAll(res))
                })
        }
    }
}

//! const dispatch = useDispatch()
//? dispatch({type: "@product/setAll", payload: data})
//* dispatch(setProductThunk())

export const setInfoProductThunk = (id) => {
    return dispatch => {
        getProductById(id)
            .then((res) => {
                dispatch(setProductInfo(res))
            })
    }
}

//! const dispatch = useDispatch()
//? dispatch({type: "@product/setAll", payload: data})
//* dispatch(setInfoProductThunk(id))

export const setCategoriesThunk = () => {
    return (dispatch) => {
        getFilterCategories()
            .then((res) => {
                dispatch(setCategories(res))
            })
    }
}

export const setCartProductsThunk = () => {
    return (dispatch) => {
        getProductsFromCart()
            .then((res) => {
                dispatch(setProductsToCart(res))
            })
    }
}

export const deleteCartProductThunk = (id) => {
    return (dispatch) => {
        deleteProductFromCart(id)
            .then(() => {
                dispatch(setCartProductsThunk())
            })
    }
}
