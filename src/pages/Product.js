import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setInfoProductThunk, setProductThunk } from "../redux/actions";
import { addProductToCart } from "../services";
import { useNavigate, Link } from "react-router-dom"
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productInfo);
  const filterProducts = useSelector((state) => state.products);

  const [quantity, setQuantity] = useState(0);
  const [confirm, setConfirm] = useState(false);

  const navigate = useNavigate()

  const handlerOnClick = () => {

      navigate('/shop')
  }
  const handlerOnShop = () => {

    navigate('/Cart')
}
  useEffect(() => {
    dispatch(setInfoProductThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (quantity && confirm) {
      addProductToCart({
        product: id,
        quantity: quantity,
      }).then((res) => {
        console.log(res);
        setConfirm(false);
      });
    }
  }, [quantity, confirm, id]);

  useEffect(() => {
    if (product.category) {
      dispatch(setProductThunk(product.category.id));
    }
    console.log(product);
  }, [dispatch, product]);

  const decrement = () => {
    setConfirm(false);
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const increment = () => {
    setConfirm(false);
    setQuantity(quantity + 1);
  };

  return (
    <div>

      <div className="cardo">
      <button onClick={handlerOnClick}>Go back</button>
      <button onClick={handlerOnShop}>Go to Cart</button>
        <h1>{product.name}</h1>
        <h2>${product.price}</h2>
 
        <p>{product.description}</p>
        {product.images?.map((item) => (
          <img
            className="sec-img"
            src={item.url}
            width="200px"
            alt=""
            key={item.id}
          />
        ))} 
<div>
        <h2>Add to cart</h2>
          <button onClick={decrement}>-</button>
          {quantity}
          <button onClick={increment}>+</button>
          <br />
          <button onClick={() => setConfirm(true)}>Accept</button>
        </div>  

      </div>

      <div className="relacionados">
        <h2>Productos Relacionados</h2>
        <div>
          {filterProducts.map((product) => (
            <Link to={`/shop/${product.id}/`} key={product.id}>
              <img
                width="200px"
                src={product.images[0].url}
                alt="{product.name}"
              />
              <p>{product.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
