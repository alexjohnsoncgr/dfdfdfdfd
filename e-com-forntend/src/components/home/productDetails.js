import { useEffect, useState } from 'react';
import Layout from '../Layout';
import { API } from '../../utils/config';
import { Link, useParams } from 'react-router-dom';
import { getProductDetails } from '../../api/apiProduct';
import { showSuccess, showError } from '../../utils/messages';
import { addToCart } from '../../api/apiOrder';
import { isAuthnticated, userInfo } from '../../utils/auth';
import { newComment, loadComment } from "../../api/apiComment";
import LoadComment from "./LoadComment";
import { Form, Input, Label } from 'reactstrap';

const ProductDetails = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [photoUrl, setphotoUrl] = useState(`${API}/product/photo/`);
    const { id } = useParams();
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState();
    const [allComment, setAllComment] = useState([]);
    const [isAuthnticated, setIsAuthenticated] = useState(localStorage.getItem("jwt") ? true : false);

    useEffect(() => {
        getProductDetails(id)
            .then(response => {
                return setProduct(response.data)
            })
            .catch(err => setError("Failed to load products"));

        loadComment(id)
            .then(response => {
                return setAllComment(response.data);
            })
            .catch(err => setError("Failed to load comments"));

    }, [success, error]);

    let loadAllComment = null;
    if (allComment.length !== 0) {
        loadAllComment = allComment.map(comment => {
            return (
                <LoadComment
                    key={comment._id}
                    comment={comment}
                />
            )
        })

    }

    const handleAddToCart = product => () => {
        if (isAuthnticated) {
            setError(false);
            setSuccess(false);
            const user = userInfo();
            const cartItem = {
                user: user._id,
                product: product._id,
                price: product.price,
            }
            addToCart(user.token, cartItem)
                .then(response => setSuccess("Add to cart Successfully!"))
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

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            productId: product._id,
            comment: comment,
            rating: rating,
        }
        setComment('');
        setRating();
        newComment(userInfo().token, data)
            .then(response => {
                if (response.status === 200) {
                    setSuccess("Comment added Successfully");
                }
            })
            .catch(error => {
                console.log(error);
                return setError("Comment Upload Failed")
            });
    }

    const handleChange = (e) => {
        if (e.target.name === "comment") {
            setComment(e.target.value);
        } else {
            setRating(parseInt(e.target.value));
        }

    }

    const commentForm = (
        <Form onSubmit={handleSubmit}>
            <div className="form-group">
                <Label className="text-muted">Your Comment:</Label>
                <Input name='comment' type="text-area" className="form-control"
                    value={comment} onChange={handleChange} required />
                <br />
                <Input type='radio' id='rate1' value="1" name='rating' onChange={handleChange} /><Label htmlFor='rate1'>&nbsp; 1 </Label>
                &nbsp;&nbsp;&nbsp;
                <Input type='radio' id='rate2' value="2" name='rating' onChange={handleChange} /><Label htmlFor='rate2'>&nbsp;2</Label>
                &nbsp;&nbsp;&nbsp;
                <Input type='radio' id='rate3' value="3" name='rating' onChange={handleChange} /><Label htmlFor='rate3'>&nbsp;3</Label>
                &nbsp;&nbsp;&nbsp;
                <Input type='radio' id='rate4' value="4" name='rating' onChange={handleChange} /><Label htmlFor='rate4'>&nbsp;4</Label>
                &nbsp;&nbsp;&nbsp;
                <Input type='radio' id='rate5' value="5" name='rating' onChange={handleChange} /><Label htmlFor='rate5'>&nbsp;5</Label>
            </div>
            <button type="submit" className="btn btn-outline-primary" style={{ marginTop: "10px" }}>Submit</button>
        </Form>
    )
    let productDetailsShow = null;
    if (Object.keys(product).length !== 0 && product.constructor === Object) {
        productDetailsShow = (<div className="row container">
            <div className="col-6">
                <img
                    src={`${photoUrl}${product._id}`}
                    alt={product.name}
                    width="100%"
                />
            </div>
            <div className="col-6">
                <h3>{product.name}</h3>
                <span style={{ fontSize: 20 }}>&#2547;</span>{product.price}
                <p>{product.quantity ? <span className="badge badge-pill badge-primary" style={{ color: "green" }}>In Stock</span> : <span className="badge badge-pill badge-danger" style={{ color: "red" }}>Out of Stock</span>}</p>
                <p>{product.description}</p>
                {product.quantity ? <>
                    &nbsp;<button className="btn btn-outline-primary btn-md" onClick={handleAddToCart(product)}>Add to Cart</button>
                </> : ""}
            </div>
        </div>)
    }

    return (
        <Layout title="Product Page">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="#">Product</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{product.category ? product.category.name : ""}</li>
                </ol>
            </nav>
            <div>
                {showSuccess(success, success)}
                {showError(error, error)}
            </div>
            {productDetailsShow}
            <div className='row justify-content-center rounded border border-info m-4 p-3'>
                <div className='col-sm-8'>
                    <h4>Comments</h4>
                    <hr />
                    {loadAllComment ? loadAllComment : "No Comments yet......."}
                </div>
            </div>
            {isAuthnticated ?
                <div className='row justify-content-center m-5 p-4'>
                    <div className='col-sm-6'>
                        {commentForm}
                    </div>
                </div> :
                <div className='row justify-content-center m-2 p-4'>
                    <h6 className='col-sm-4'>Please <Link to="/login">Login</Link> to comment
                    </h6>
                </div>}
        </Layout >
    )
}

export default ProductDetails;