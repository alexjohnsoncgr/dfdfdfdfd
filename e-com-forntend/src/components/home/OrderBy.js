import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const OrderBy = ({ OrderBy, order }) => {
    const [orderBy, setOrderBy] = useState(OrderBy);

    useEffect(() => {
        order(orderBy);
    }, [orderBy])

    const changeOrder = event => {
        // e.preventDefault();
        setOrderBy(event.target.value);
        // console.log("OrderBy", orderBy);
        // order(orderBy);

    }
    return (

        <Label htmlFor="orderby"> <h5>Filter OrderBy</h5>
            <Input id="orderby" type="select" name="select" onChange={changeOrder}>
                <option value="desc">DESC</option>
                <option value="asc">ASC</option>
            </Input>
        </Label>

    )
}

export default OrderBy;