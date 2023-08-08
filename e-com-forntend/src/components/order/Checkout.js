import React, { useState, useEffect } from 'react';
import { getCartItems, getProfile, updateCartItems } from '../../api/apiOrder';
import { userInfo } from '../../utils/auth';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import UserCoupon from './UserCoupon';
import { getAllCoupon } from '../../api/apiCoupon';

const Checkout = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [values, setValues] = useState({
        phone: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        country: ''
    });
    const [coupon, setCoupon] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [couponNumber, setCouponNumber] = useState(0);

    const {
        phone,
        address1,
        address2,
        city,
        postcode,
        country
    } = values;
    let sum = 0;
    let showCoupon = null;
    let sumAfetrDiscount = 0;
    // const getOrderTotal = () => {
    if (orderItems !== []) {
        const arr = orderItems.map(cartItem => cartItem.price * cartItem.count);
        sum = arr.reduce((a, b) => a + b, 0);
        sumAfetrDiscount = sum - discount;

    }

    // return sum;
    // }


    const addCoupon = data => {
        setDiscount(data.discountAmount);
        setCouponNumber(1);
    }
    if (coupon !== []) {
        showCoupon = coupon.map(item => {
            if (item.minPurchase <= sum) {
                return (
                    <UserCoupon
                        key={item._id}
                        coupon={item}
                        addCoupon={(data) => addCoupon(data)}
                    />
                )
            }
        })
    }

    const loadCart = () => {
        getCartItems(userInfo().token)
            .then(response => {
                return setOrderItems(response.data)
            })
            .catch(err => { });
    }


    useEffect(() => {

        getProfile(userInfo().token)
            .then(response => {
                return setValues(response.data);
            })
            .catch(err => { })
        loadCart();

        getAllCoupon(userInfo().token)
            .then(response => setCoupon(response.data))
            .catch(error => console.log(error));

    }, []);





    const shippingDetails = () => (
        <>
            To,
            <br /> <b>{userInfo().name}</b>
            <br /> Phone: {phone}
            <br /> {address1}
            {address2 ? (<><br />{address2}</>) : ""}
            <br /> {city}-{postcode}, {country}
        </>
    )

    if (address1 && city && phone && postcode && country) {

        return (<>
            <Layout title="Checkout" description="Complete your order!" className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="#">Order</Link></li>
                        <li className="breadcrumb-item"><Link to="/cart">Cart</Link></li>
                        <li className="breadcrumb-item"><Link to="/shipping">Shipping Address</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                    </ol>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card mb-5" style={{ height: 'auto' }}>
                                <div className="card-header">Shipping Details</div>
                                <div className="card-body">
                                    {shippingDetails()}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card" style={{ height: 'auto' }}>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {orderItems.map(item => (<li key={item._id} className="list-group-item" align="right">{item.product ? item.product.name : ""} x {item.count} = ৳ {item.price * item.count} </li>))}
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <span className="float-left"><b>Order Amount</b></span>
                                    <span className="float-right"><b>৳ {sum}</b></span>
                                    <br />
                                    <span className="float-left"><b>Discount</b></span>
                                    <span className="float-right"><b>৳ {discount}</b></span>
                                    <hr />
                                    <span className="float-left"><b>Order Total</b></span>
                                    <span className="float-right"><b>৳ {sumAfetrDiscount}</b></span>
                                </div>
                            </div>
                            <br />
                            {/* <p><Link className="btn btn-warning btn-md" to={`/payment/${sumAfetrDiscount}`}>Make Payment</Link></p> */}
                            <p><Link className="btn btn-warning btn-md" to={`/payment/${sumAfetrDiscount}`}>Make Payment</Link></p>
                        </div>
                    </div>
                    <hr />
                    Available Coupon
                    {couponNumber !== 1 ? <div className='row'>{showCoupon}</div> : <div>Maximum 1 Coupon can be used per order</div>}

                </div>
            </Layout>
        </>);
    }
    else {
        return <></>
    }
}

export default Checkout;