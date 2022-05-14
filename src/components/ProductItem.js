import './ProductItem.css'
import { Link } from "react-router-dom"

const ProductItem = ({prodObj}) => {
    return (
        <div className="card">

        <Link 
            to={`/shop/${prodObj.id}/`} 
            key={prodObj.id} 
        >     
  
            <div className="image-box">
            {prodObj.name} 
                <img src={prodObj.images[0].url} alt="" />
            </div>
            <div className="content">
            <h3 className="title"> {prodObj.name}  </h3>
            <div class="details">
            <h2>{prodObj.name} <br /><span>{prodObj.description} </span></h2>

            <div class="data">
            <h3>${prodObj.price} </h3>

            </div>
            </div>
            </div>
            <div class="action-buttons">
   
        </div>

  </Link>

        </div>
    )
}

export default ProductItem