import { Nav, Navbar, NavItem } from 'reactstrap';
import { Navigate, NavLink } from 'react-router-dom';
import { signout, isAuthnticated } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../utils/auth';



const Menu = () => {
    const navigate = useNavigate();
    // const signOut = () => {
    //     if (typeof window !== 'undefined') {
    //         localStorage.removeItem('jwt');
    //         navigate("/login");
    //     }
    // }

    let links = (
        <Navbar>
            <Nav>
                <NavItem>
                    <NavLink to="/home" style={{ textDecoration: "none", paddingRight: "1rem", color: "orange" }}>Home</NavLink>
                </NavItem>
                {!isAuthnticated() && <> <NavItem>
                    <NavLink to="/login" style={{ textDecoration: "none", paddingRight: "1rem", color: "orange" }}>Login</NavLink>
                </NavItem>
                    <NavItem>
                        <NavLink to="/register" style={{ textDecoration: "none", paddingRight: "1rem", color: "orange" }}>Register</NavLink>
                    </NavItem></>}

                {/* User Menu */}
                {isAuthnticated() && userInfo().role === "user" && <><NavItem>
                    <NavLink onClick={() => {
                        signout(() => {
                            navigate("/login")
                        })
                    }} style={{ textDecoration: "none", paddingRight: "1rem", color: "orange" }}>Logout</NavLink>
                </NavItem>
                    <NavItem>
                        <NavLink to="/dashboard" style={{ textDecoration: "none", paddingRight: "1rem", color: "orange" }}>Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/cart" style={{ textDecoration: "none", paddingRight: "1rem", color: "orange" }}>Cart</NavLink>
                    </NavItem>
                </>}

                {/* Admin Menu */}
                {isAuthnticated() && userInfo().role === "admin" && <><NavItem>
                    <NavLink to="/admindashboard" style={{ textDecoration: "none", paddingRight: "1rem", color: "orange" }}>Admin Area</NavLink>
                </NavItem>
                    <NavItem>
                        <NavLink to="/cart" style={{ textDecoration: "none", paddingRight: "1rem", color: "orange" }}>Cart</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => {
                            signout(() => {
                                navigate("/login")
                            })
                        }} style={{ textDecoration: "none", paddingRight: "1rem", color: "orange" }}>Logout</NavLink>
                    </NavItem></>}
            </Nav>
        </Navbar>

    );
    return (
        <div style={{ background: "#52595D" }}>
            {links}
        </div>


    )
}

export default Menu;