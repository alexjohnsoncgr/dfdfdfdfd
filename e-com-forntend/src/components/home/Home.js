import { useState, useEffect } from 'react';
import Layout from '../Layout';
import Card from './Card';
import { showError, showSuccess } from '../../utils/messages';
import { getCategories, getProducts, getFilteredProducts, getAllProduct, searchProduct } from '../../api/apiProduct';
import CheckBox from './CheckBox';
import RadioBox from './RadioBox';
import { prices } from '../../utils/price';
import { isAuthnticated, userInfo } from '../../utils/auth';
import { addToCart } from '../../api/apiOrder';
import OrderBy from './OrderBy';
import SortBy from './SortBy';
import { googleLogin } from '../../api/apiAuth';
import { Col, Row } from 'reactstrap';

const Home = () => {
    const [productLength, setProductLength] = useState();
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(4);
    const [order, setOrder] = useState('desc');
    const [sortBy, setSortBy] = useState('createdAt');
    const [skip, setskip] = useState(0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        category: [],
        price: []   //according to backend API
    });
    const [addLimitButton, setAddLimitButton] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {

        getAllProduct()
            .then(response => setProductLength(response.data.length))
            .catch(err => setError("Failed to load products!"));

        getProducts(sortBy, order, limit)
            .then(response => setProducts(response.data))
            .catch(err => setError("Failed to load products!"));

        getCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                setError("Failed to load categories!")
            });
    }, []);

    //call filter api each time when [limit, order , categories , filters] change
    useEffect(() => {
        getFilteredProducts(skip, limit, filters, order, sortBy)
            .then(response => {
                return setProducts(response.data)
            })
            .catch(error => setError("Failed to load products!"))
    }, [limit, order, categories, filters, sortBy]) //very useful

    const handleAddToCart = product => () => {
        if (isAuthnticated()) {
            setError(false);
            setSuccess(false);
            const user = userInfo();
            const cartItem = {
                user: user._id,
                product: product._id,
                price: product.price,
            }
            addToCart(user.token, cartItem)
                .then(response => setSuccess(true))
                .catch(error => {
                    if (error.response) {
                        setError(error.response.data);
                    } else {
                        setError("Add to cart failed!");
                    }
                })
        } else {
            setSuccess(false);
            setError("Please login first!");
        }
    }

    const handleFilters = (myfilters, filterBy) => {
        const newFilters = { ...filters }
        if (filterBy === 'category') {
            newFilters[filterBy] = myfilters; //save selected category 
        }
        if (filterBy === 'price') {
            prices.map(price => {
                if (price.id === parseInt(myfilters)) {
                    newFilters[filterBy] = price.arr;  //save selected price range
                }
            })
        }
        if (filterBy === 'limitAdd') {
            setLimit((prevLimit) => prevLimit + 3);
            if (productLength < limit) {
                setAddLimitButton(true);
            }
        }
        if (filterBy === 'orderBy') {
            if (myfilters === 'desc') {
                setOrder(myfilters);
            } else {
                setOrder(myfilters);
            }
        }
        if (filterBy === 'sortBy') {
            setSortBy(myfilters);
            //     if (myfilters === 'price')
            //         setSortBy(myfilters);
            // 
        }
        setFilters(newFilters);
    }

    const showFilters = () => {
        return (<>
            <div className='row'>
                <div className='col-sm-3'>
                    <h5>Filter by categories</h5>
                    <CheckBox
                        categories={categories}
                        handleFilters={myfilters => handleFilters(myfilters, 'category')}
                    />
                    {/* stringify so that we can show category to page */}

                </div>
                <div className='col-sm-5'>
                    <h5>Filter by price</h5>
                    <div className='row'>
                        <RadioBox
                            prices={prices}
                            handleFilters={myfilters => handleFilters(myfilters, 'price')} />
                    </div>

                </div>
                <div className='col-sm-2'>
                    <OrderBy
                        OrderBy={order}
                        order={(myfilters) => handleFilters(myfilters, 'orderBy')} />
                </div>
                <div className='col-sm-2'>
                    <SortBy
                        sortBy={sortBy}
                        sort={(myfilters) => handleFilters(myfilters, 'sortBy')} />
                </div>
            </div>
        </>)
    }
    const searchSubmit = (e) => {
        e.preventDefault();
        searchProduct(search)
            .then(response => setProducts(response.data.result))
            .catch(error => console.log(error))
    }

    const searchForm = (
        <form onSubmit={searchSubmit}>
            <div className='row justify-content-center'>
                <input type="text" className='col-sm-6' value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className='btn btn-outline-success col-sm-1'>Search</button>
            </div>
        </form>
    )
    return (
        <Layout title="Home Page" className="container-fluid">
            {searchForm}
            {showFilters()}
            <div style={{ width: "100%" }}>
                {showError(error, error)}
                {showSuccess(success, "Added to cart successfully!")}
            </div>
            <div className="row">
                {products && products.map(product => <Card product={product} key={product._id} handleAddToCart={handleAddToCart(product)} />)}
            </div>
            <div className='row justify-content-sm-center'>
                <button className='btn btn-outline-primary col-sm-3'
                    disabled={addLimitButton}
                    onClick={() => handleFilters(null, 'limitAdd')}>
                    Load More
                </button>
            </div>

        </Layout>
    )
}

export default Home;