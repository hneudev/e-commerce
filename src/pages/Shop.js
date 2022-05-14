import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductItem from "../components/ProductItem"
import { setCategoriesThunk, setProductThunk } from "../redux/actions"
import { useNavigate } from "react-router-dom"

import './Shop.css'

const Shop = () => {
    const navigate = useNavigate()

    const handlerOnClick = () => {
  
        navigate('/Cart')
    }

    const dispatch = useDispatch()
    const productArr = useSelector(state => state.products)
    const categoriesArr = useSelector(state => state.categories)

    const [currentCategory, setCurrentCategory] = useState('')

    useEffect(() => {
        dispatch(setProductThunk(currentCategory))
        dispatch(setCategoriesThunk())
    }, [dispatch, currentCategory])


    const list = productArr.map((item) => <ProductItem key={item.id} prodObj={item} />)
    const categoriesList = categoriesArr.map(item => <button key={item.id} onClick={() => setCurrentCategory(item.id)} >{item.name}</button>) 

    return (
        <div className="Content">
            <div className="Header">
            <button onClick={handlerOnClick}>Go to Cart</button>

            <h1>Adamantium Jewelry</h1>
            <button onClick={() => setCurrentCategory('')} >
                All Products
            </button>
            {categoriesList}
            </div>

            <div className="grid">
            {list}

            </div>
        </div>
    )
}
export default Shop
