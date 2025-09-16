import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './Dashboard.css'

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/users').then(res => setTotalUsers(res.data.length))
  }, [])

  return (
    <div className="dashboard">
      <h2>Welcome to User Management Dashboard</h2>
      <p>Manage users efficiently: add, view, edit, and delete users.</p>
      <div className="dashboard-cards">
        <div className="card card-users">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="card card-add" onClick={() => navigate('/users/new')}>
          <h3>Add Users</h3>
          <p>Quickly add new users</p>
        </div>
        <div className="card card-manage" onClick={() => navigate('/users')}>
          <h3>Manage Users</h3>
          <p>Edit or remove users</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
