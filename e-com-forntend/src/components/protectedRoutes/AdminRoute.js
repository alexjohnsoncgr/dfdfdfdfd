import { Route, Navigate } from 'react-router-dom';
import { isAuthnticated, userInfo } from '../../utils/auth';


const AdminRoute = ({ children }) => {
    return (isAuthnticated() && userInfo().role === "admin" ? children : <Navigate to="/login" />)
}

export default AdminRoute;