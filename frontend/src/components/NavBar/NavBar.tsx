import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Loan Manager</h2>
      <div className="nav-links">
        <Link to="/">Apply</Link>
        <Link to="/user-dashboard">User</Link>
        <Link to="/admin-dashboard">Admin</Link>
        <Link to="/verifier-dashboard">Verifier</Link>
      </div>
    </nav>
  );
};

export default NavBar;
