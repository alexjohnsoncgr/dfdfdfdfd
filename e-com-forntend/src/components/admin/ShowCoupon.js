import { Button } from "reactstrap";


const ShowCoupon = ({ coupon, deleteCoupon }) => {
    return (
        <tr className="table-info">
            <td>{coupon.couponName}</td>
            <td>{coupon.discountAmount}</td>
            <td>{coupon.minPurchase}</td>
            <td><Button color="danger" onClick={deleteCoupon}>Delete</Button></td>
        </tr>
    )
}

export default ShowCoupon;