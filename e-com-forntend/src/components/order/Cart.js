import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCartItems, updateCartItems } from '../../api/apiOrder';
import { userInfo } from '../../utils/auth';
import { showError } from '../../utils/messages';
import CartItem from './CartItem';
import { deleteCartItem } from '../../api/apiOrder';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(false);

    const loadCart = () => {
        getCartItems(userInfo().token)
            .then(response => setCartItems(response.data))
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data)
                }
                else {
                    setError("Cannot show cart!");
                }
            })
    }

    useEffect(() => {
        loadCart();
    }, [])

    const increaseItem = (item) => () => {
        if (item.count === 5) return
        const cartItem = {
            ...item,
            count: item.count + 1,
        }
        updateCartItems(userInfo().token, cartItem)
            .then(response => loadCart())
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data)
                }
                else {
                    setError("Cannot show cart!");
                }
            })
    }

    const decreaseItem = (item) => () => {
        if (item.count === 1) return
        const cartItem = {
            ...item,
            count: item.count - 1,
        }
        updateCartItems(userInfo().token, cartItem)
            .then(response => loadCart())
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data)
                }
                else {
                    setError("Cannot show cart!");
                }
            })
    }

    const getCartTotal = () => {
        const arr = cartItems.map(item => item.price * item.count);
        const sum = arr.reduce((a, b) => a + b, 0);
        return sum;
    }

    const removeItem = (item) => () => {
        if (!window.confirm("Delete Item?")) return
        deleteCartItem(userInfo().token, item)
            .then(response => loadCart())
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data)
                }
                else {
                    setError("Cannot show cart!");
                }
            })
    }

    return (

        <Layout title="Your Cart" description="Hurry up! Place your order!" className="container">
            {showError(error, error)}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Order</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Cart</li>
                </ol>
            </nav>
            <div className="container my-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" width="15%">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col" align="right">Price</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => <CartItem
                            key={item._id}
                            item={item}
                            serial={index + 1}
                            increaseItem={increaseItem(item)}
                            decreaseItem={decreaseItem(item)}
                            removeItem={removeItem(item)}
                        />)}
                        <tr>
                            <th scope="row" />
                            <td colSpan={3}>Total</td>
                            <td align="right">৳ {getCartTotal()}</td>
                            <td />
                        </tr>
                        <tr>
                            <th scope="row" />
                            <td colSpan={5} className="text-right">
                                <Link to="/"><button className="btn btn-warning mr-4">Continue Shoping</button></Link>
                                <Link to="/shipping" className="btn btn-success mr-4">Proceed To Checkout</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Cart;