import { Route, Navigate } from 'react-router-dom';
import { isAuthnticated } from '../../utils/auth';

const PrivateRoute = ({ children }) => {
    return (isAuthnticated() ? children : <Navigate to="/login" />)
}

export default PrivateRoute;