import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardFooter, CardText, CardTitle, Col, Row } from "reactstrap";
import { getProductDetails } from "../../api/apiProduct";


const LoadOrder = ({ order }) => {
    const [productName, setProductName] = useState(null);


    const userOrder = order.cartItems.map(item => {

        // getProductDetails(item.product)
        //     .then(response => setProductName(response.data.name))
        // //     .catch(error => console.log(error))
        // if (productName) {
        return (
            <div key={item._id}>
                <Row>
                    <Col md={8}>
                        <Card>
                            {/* <CardTitle>Product Name : {productName} </CardTitle> */}
                            <CardText>
                                Price : <span style={{ color: "blue", fontWeight: "600", fontSize: "20px" }}>{item.price}</span> BDT
                                <br />
                                Unit Ordered : <span style={{ color: "green", fontWeight: "600", fontSize: "20px" }}>{item.count}</span>
                            </CardText>

                        </Card>
                    </Col>
                </Row>
            </div>
        )
        // }

    })

    return (
        <div style={{ marginTop: "10px" }}>
            {userOrder}
        </div>
    )
}

export default LoadOrder;