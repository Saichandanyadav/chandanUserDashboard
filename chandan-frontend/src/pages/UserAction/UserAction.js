import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'
import './UserAction.css'

function UserAction() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    street: '', city: '', state: '', zip: '', lat: '', lng: ''
  })

  useEffect(() => {
    if (isEdit) {
      api.get(`/users/${id}`).then(res => {
        const u = res.data
        setForm({
          name: u.name, email: u.email, phone: u.phone, company: u.company,
          street: u.address.street, city: u.address.city, state: u.address.state || '', zip: u.address.zip,
          lat: u.address.geo.lat, lng: u.address.geo.lng
        })
      })
    }
  }, [id, isEdit])

  const handleChange = async e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (name === 'zip' && value.length === 6 && !isEdit) {
      try {
        const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${value}&key=0ba3c0fd58614b26a0558318c6d11d79`)
        if (!res.ok) return
        const data = await res.json()
        if (data.results.length > 0) {
          const comp = data.results[0].components
          setForm(f => ({
            ...f,
            city: comp.city || comp.town || comp.village || comp.state_district || comp.county || '',
            state: comp.state || '',
            lat: data.results[0].geometry.lat,
            lng: data.results[0].geometry.lng
          }))
        }
      } catch {}
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        zip: form.zip,
        geo: { lat: form.lat, lng: form.lng }
      }
    }
    try {
      if (isEdit) {
        await api.put(`/users/${id}`, payload)
        toast.success('User updated successfully')
      } else {
        await api.post('/users', payload)
        toast.success('User added successfully')
      }
      navigate('/users')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed')
    }
  }

  return (
    <div className="user-action-page">
      <div className="user-action-card">
        <h2>{isEdit ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
          <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company" required />
          <input type="text" name="street" value={form.street} onChange={handleChange} placeholder="Street" required />
          <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" required />
          <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" required />
          <input type="text" name="zip" value={form.zip} onChange={handleChange} placeholder="Zip" required />
          <input type="text" name="lat" value={form.lat} placeholder="Latitude" readOnly />
          <input type="text" name="lng" value={form.lng} placeholder="Longitude" readOnly />
          <button type="submit">{isEdit ? 'Update User' : 'Add User'}</button>
        </form>
      </div>
    </div>
  )
}

export default UserAction
