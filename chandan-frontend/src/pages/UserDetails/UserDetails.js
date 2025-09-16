import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'
import './UserDetails.css'

function UserDetails() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/users/${id}`)
      .then(res => setUser(res.data))
      .catch(() => toast.error('User not found'))
  }, [id])

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${id}`)
      toast.success('User deleted successfully')
      navigate('/users')
    } catch {
      toast.error('Failed to delete user')
    }
  }

  if (!user) return <p className="loading">Loading...</p>

  const initials = user.name.split(' ').map(n => n[0]).join('')

  return (
    <div className="user-details-page">
      <div className="user-details-card">
        <div className="user-avatar">{initials}</div>
        <h2>{user.name}</h2>
        <div className="user-info-grid">
          <div><strong>Email</strong>{user.email}</div>
          <div><strong>Phone</strong>{user.phone}</div>
          <div><strong>Company</strong>{user.company}</div>
          <div><strong>City</strong>{user.address.city}</div>
          <div><strong>Zip</strong>{user.address.zip}</div>
          <div><strong>Geo</strong>{user.address.geo.lat}, {user.address.geo.lng}</div>
        </div>
        <div className="user-buttons">
          <Link to={`/users/${id}/edit`} className="btn-edit">Edit</Link>
          <button onClick={() => setShowModal(true)} className="btn-delete">Delete</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="btn-confirm">Yes</button>
              <button onClick={() => setShowModal(false)} className="btn-cancel">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDetails
