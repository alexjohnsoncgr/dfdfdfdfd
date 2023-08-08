import { prices } from "../../utils/price"

const RadioBox = ({ prices, handleFilters }) => {

    const handleChange = e => {
        handleFilters(e.target.value); //price id
    }

    return prices.map(price => (
        <div key={price.id} className="col-6">
            <input
                onChange={handleChange}
                value={price.id}
                name="price-filter"
                type="radio"
                className="mr-2"
            />
            <label className="form-check-label">
                {price.name}
            </label>
        </div>
    ))
}

export default RadioBox;