import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <h1>404</h1>
        <p>Oops! Page not found</p>
        <Link to="/" className="btn-home">Go to Dashboard</Link>
      </div>
    </div>
  )
}

export default NotFound
