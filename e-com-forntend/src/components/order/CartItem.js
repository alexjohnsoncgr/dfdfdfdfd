import React from 'react';
import { API } from '../../utils/config';

const CartItem = ({ item, serial, increaseItem, decreaseItem, removeItem }) => {
    const imgStyle = {
        height: 250,
        objectFit: "cover",
        objectPosition: "0px 0px"
    }
    return (
        <tr>
            <th scope="row">{serial}</th>
            <th><img src={`${API}/product/photo/${item.product._id}`} style={imgStyle} /></th>
            <td>{item.product ? item.product.name : ""}</td>
            <td>
                <button className="btn btn-outline-primary btn-sm" onClick={decreaseItem}>-</button>
                &nbsp;&nbsp;{item.count}&nbsp;&nbsp;
                <button className="btn btn-outline-primary btn-sm" onClick={increaseItem}>+</button>
            </td>
            <td align="right">৳ {item.price * item.count} </td>
            <td><button className="btn btn-danger btn-sm" onClick={removeItem}>Remove From Cart</button></td>
        </tr>)
};


export default CartItem;