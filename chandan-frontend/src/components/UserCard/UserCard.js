import { Link } from 'react-router-dom'
import './UserCard.css'

function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
      <div className="user-actions">
        <Link to={`/users/${user._id}`} className="btn-view">View</Link>
        <Link to={`/users/${user._id}/edit`} className="btn-edit">Edit</Link>
      </div>
    </div>
  )
}

export default UserCard
