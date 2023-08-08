import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { userInfo } from '../../utils/auth';
import { useEffect, useState } from 'react';
import { getOrderHistory } from '../../api/orderHistory';
import LoadOrder from './LoadOrder';
import { Card, CardBody, CardFooter, CardHeader, Toast, ToastBody, ToastHeader } from 'reactstrap';

const Dashboard = () => {
    const { name, email, role } = userInfo();
    const [loadOrder, setLoadOrder] = useState([]);

    useEffect(() => {
        getOrderHistory(userInfo().token)
            .then(response => setLoadOrder(response.data))
            .catch(error => console.log(error));
    }, [])

    let loadOrderHistory = null;
    if (loadOrder !== []) {
        loadOrderHistory = loadOrder.map(order => {
            const arr = order.cartItems.map(item => item.price * item.count);
            const sum = arr.reduce((a, b) => a + b, 0);
            return (
                <div key={order._id}>
                    <Card>
                        <CardHeader>Order ID : {order._id}</CardHeader>
                        <CardBody>
                            <LoadOrder
                                order={order}
                            />
                        </CardBody>
                        <CardFooter>
                            Payment Amount : <span style={{ color: "red", fontSize: "20px", fontWeight: "700" }}>{order.total_amount}</span> BDT
                            <Toast>
                                <ToastHeader icon="success">Voucher Status</ToastHeader>
                                <ToastBody>{sum > order.total_amount ? <span style={{ color: "green", fontSize: "20px", fontWeight: "500" }}>Used</span>
                                    :
                                    <span style={{ color: "red", fontSize: "20px", fontWeight: "500" }}>Not Used</span>
                                }
                                </ToastBody>
                            </Toast>
                            {order.status === "Complete" ?
                                <>Payment Status :<span style={{ color: 'green', fontSize: "20px", fontWeight: "700" }}> Paid</span></>
                                :
                                <>Payment Status :<span style={{ color: 'green', fontSize: "20px", fontWeight: "700" }}> Failed</span></>
                            }

                        </CardFooter>
                    </Card>
                    <br />

                </div>
            )
        })
    }


    const UserLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="#">Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    };

    // const PurchaseHistory = () => (
    //     <div className="card mb-5">
    //         <h3 className="card-header">Purchase History</h3>
    //         <ul className="list-group">
    //             <li className="list-group-item">{}</li>
    //         </ul>
    //     </div>
    // );

    const UserInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role}</li>
            </ul>
        </div>
    );

    return (
        <Layout title="Dashboard" className="container-fluid">
            <div className="row">
                <div className="col-sm-3">
                    <UserLinks />
                </div>
                <div className="col-sm-9">
                    <UserInfo />
                    <h4>Order History</h4><hr />
                    {loadOrderHistory}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;