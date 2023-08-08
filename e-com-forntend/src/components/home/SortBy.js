import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const SortBy = ({ sortBy, sort }) => {
    const [newSortBy, setNewSortBy] = useState(sortBy);

    useEffect(() => {
        sort(newSortBy);
    }, [newSortBy]);

    const changeSort = event => {
        setNewSortBy(event.target.value);
    }
    return (
        <>
            <Label htmlFor="sortby"> <h5>Sort by</h5> </Label>
            <Input id="sortby" type="select" name="select" onChange={changeSort}>
                <option value={null}>Select an option</option>
                <option value="price">Price</option>
                <option value="sold">Sold</option>
                <option value="rating">Review</option>
            </Input>
        </>

    )
}

export default SortBy;