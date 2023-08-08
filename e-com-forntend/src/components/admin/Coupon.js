import { useState, useEffect } from "react";
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, Row, Table } from "reactstrap";
import Layout from "../Layout";
import { postNewCoupon, getAllCoupon, couponDelete } from "../../api/apiCoupon";
import { userInfo } from "../../utils/auth";
import ShowCoupon from "./ShowCoupon";

const Coupon = () => {
    const [showCouponForm, setShowCouponForm] = useState(false);
    const [values, setValues] = useState({
        couponName: "",
        discountAmount: 0,
        minPurchase: 0,
    })
    const [openModal, setOpenModal] = useState(false);
    const [message, setMessage] = useState("");
    const [coupon, setCoupon] = useState([]);
    const [couponChange, setCouponChange] = useState(false);

    const { couponName, discountAmount, minPurchase } = values;

    useEffect(() => {
        getAllCoupon(userInfo().token)
            .then(response => setCoupon(response.data))
            .catch(error => console.log(error))
    }, [couponChange]);


    const toogleCouponForm = () => {
        setShowCouponForm(!showCouponForm);
    }

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        postNewCoupon(userInfo().token, values)
            .then(response => {
                if (response.status === 200) {
                    setMessage(response.data);
                    setOpenModal(!openModal);
                    setCouponChange(!couponChange);
                }
            })
            .catch(error => console.log(error));


        setValues({
            couponName: "",
            discountAmount: 0,
            minPurchase: 0,
        })
    }

    const deleteCoupon = (data) => {
        couponDelete(userInfo().token, data._id)
            .then(response => {
                setMessage(response.data);
                setCouponChange(!couponChange);
                setOpenModal(!openModal);
            }
            )
            .catch(error => console.log(error))
    }

    const toggleModal = () => {
        setOpenModal(!openModal);
        setMessage("");
    }

    let showAllCoupon = null;
    if (coupon !== []) {
        showAllCoupon = coupon.map(item => (
            <ShowCoupon
                key={item._id}
                coupon={item}
                deleteCoupon={() => deleteCoupon(item)}
            />
        ))
    }

    let newCouponForm = (
        <Form onSubmit={handleSubmit}>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Label htmlFor="coupon-name">Coupon Name</Label>
                    <Input
                        type="text"
                        name="couponName"
                        id="coupon-name"
                        placeholder="name"
                        value={couponName}
                        onChange={handleChange}
                        required
                    />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={4}>
                    <Label htmlFor="discount">Discount Amount</Label>
                    <Input
                        type="number"
                        name="discountAmount"
                        id="discount"
                        placeholder="Amount"
                        value={discountAmount}
                        onChange={handleChange}
                        required
                    />
                </Col>
                <Col md={4}>
                    <Label htmlFor="minPurchase">Min. Purchase</Label>
                    <Input
                        type="number"
                        name="minPurchase"
                        id="minPurchase"
                        placeholder="Min. Purchase"
                        value={minPurchase}
                        onChange={handleChange}
                        required
                    />
                </Col>
            </Row>
            <br />
            <Row className="justify-content-center">
                <Col md={8}>
                    <Button block size="sm" type="submit" className="btn btn-success">ADD</Button>
                </Col>
            </Row>

        </Form>
    )
    return (
        <Layout title="Coupon">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Discount Amount</th>
                                <th>Min. Purchase</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showAllCoupon}
                        </tbody>
                    </Table>
                </div>
                <br />
                <br />
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <Button block color="primary" onClick={toogleCouponForm}>Add new coupon</Button>
                        <br />
                        <br />
                        <br />
                        <br />
                        {showCouponForm ? newCouponForm : null}

                    </div>
                </div>
            </div>
            <Modal isOpen={openModal}>
                <ModalBody>{message}</ModalBody>
                <ModalFooter><Button color="info" onClick={toggleModal}>Close</Button></ModalFooter>
            </Modal>




        </Layout>
    )
}
export default Coupon;