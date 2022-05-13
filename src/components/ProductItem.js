import { Link } from "react-router-dom"

const ProductItem = ({prodObj}) => {
    return (
        <Link to={`/shop/${prodObj.id}`}>
            <div style={{margin: "20px"}}>
                {prodObj.name}
            </div>
        </Link>
    )
}

export default ProductItem