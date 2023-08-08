import { useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap"

const UserCoupon = ({ coupon, addCoupon }) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    return (
        <div className="col-md-4">
            <Card>
                <CardHeader>{coupon.couponName}</CardHeader>
                <CardBody>Amount : {coupon.discountAmount}<br />Min. Purchase : {coupon.minPurchase}</CardBody>
                <CardFooter><Button block color="danger" disabled={buttonDisabled} onClick={() => addCoupon(coupon)}>Use Now</Button></CardFooter>
            </Card>
        </div>

    )
}

export default UserCoupon;