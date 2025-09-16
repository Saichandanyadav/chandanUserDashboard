import { useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-logo">C</span>
        <div className="brand-text">
          <span className="brand-name">Chandan Dashboard</span>
          <span className="sub-brand"><span className="sub-icon">⚡</span> By Forty4</span>
        </div>
      </div>
      <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/users" onClick={() => setMenuOpen(false)}>Users</Link>
        <Link to="/users/new" onClick={() => setMenuOpen(false)}>Add User</Link>
      </div>
    </nav>
  )
}

export default Navbar
