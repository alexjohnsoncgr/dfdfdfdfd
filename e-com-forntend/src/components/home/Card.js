import React from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../utils/config';

const Card = ({ product, handleAddToCart }) => {
    const titleStyle = {
        display: "block",
        textOverflow: "ellipsis",
        wordWrap: "break-word",
        overflow: "hidden",
        maxHeight: "2em",
        lineHeight: "1em"
    }
    const imgStyle = {
        height: 250,
        objectFit: "cover",
        objectPosition: "0px 0px"
    }
    return (
        <div className="col-md-3 col-sm-4 col-xs-12 mb-3">
            <div className="card">
                <img
                    src={`${API}/product/photo/${product._id}`}
                    alt={product.name}
                    style={imgStyle}
                    className="card-img-top"
                />
                <div className="card-body">
                    <div style={{ minHeight: "3em" }}>
                        <p style={titleStyle}>{product.name}
                            <br /><img src='Gold_Star.svg.png' alt="start" width="16px" height="16px" />&nbsp;{product.rating}/5
                        </p>
                        <br /><img src='unit_sold.png' alt="unit_sold" width="16px" height="16px" />&nbsp;Unit Sold ({product.sold})
                    </div>
                    <span style={{ fontSize: 20 }}>&#2547;</span>{product.price}
                    <p>{product.quantity ? (<span className="badge badge-pill badge-primary">In Stock</span>) : (<span className="badge badge-pill badge-danger">Out of Stock</span>)}</p>
                    <Link to={`/product/${product._id}`}>
                        <button className="btn btn-outline-warning btn-sm">View Product</button>
                    </Link>
                    {product.quantity ? <>
                        &nbsp;<button className="btn btn-outline-primary btn-sm" onClick={handleAddToCart} >Add to Cart</button>
                    </> : ""}
                </div>
            </div>
        </div>
    )
}

export default Card;