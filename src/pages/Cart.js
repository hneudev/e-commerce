import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import { setCartProductsThunk } from "../redux/actions";
import { postCheckout } from "../services";

const Cart = () => {
  const dispatch = useDispatch();
  const cartValues = useSelector((state) => state.cart);
  const navigate = useNavigate()

  const [total, setTotal] = useState(0)
  const [confirmCheckout, setConfirmCheckout] = useState(false)

  useEffect(() => {
    dispatch(setCartProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    let amount = 0;
    cartValues.forEach(item => amount += item.product.price * item.quantity);
    setTotal(amount)
  }, [cartValues])

  useEffect(() => {
    if(confirmCheckout){
      postCheckout()
        .then(() => {
          setConfirmCheckout(false)
          navigate('/cart/success')
        })
    }
  }, [confirmCheckout, navigate])

  const list = cartValues.map((item) => {
    return <CartProduct key={item.id} prodObj={item} />;
  });

  return (
    <div>
      <h1>Cart</h1>
      <button onClick={() => setConfirmCheckout(true)} >Checkout</button>
      {total}
      {list}
    </div>
  );
};

export default Cart;