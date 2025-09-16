import { useEffect, useState } from 'react'
import api from '../../services/api'
import UserCard from '../../components/UserCard/UserCard'
import { FiMoreVertical, FiRefreshCw } from 'react-icons/fi'
import './UserList.css'

function UserList() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [sortOption, setSortOption] = useState('recent')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSortMenu, setShowSortMenu] = useState(false)

  useEffect(() => {
    api.get('/users').then(res => {
      setUsers(res.data)
      setFilteredUsers(res.data)
    })
  }, [])

  useEffect(() => {
    let filtered = users.filter(
      u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (sortOption === 'recent') filtered = [...filtered].reverse()
    if (sortOption === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name))
    if (sortOption === 'company') filtered.sort((a, b) => (a.company || '').localeCompare(b.company || ''))
    if (sortOption === 'city') filtered.sort((a, b) => (a.address?.city || '').localeCompare(b.address?.city || ''))
    setFilteredUsers(filtered)
  }, [searchQuery, sortOption, users])

  const resetFilters = () => {
    setSearchQuery('')
    setSortOption('recent')
    setFilteredUsers(users)
  }

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h2>All Users</h2>
        <div className="underline"></div>
        <div className="filters-container">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="mobile-filter-menu">
            <FiMoreVertical size={24} onClick={() => setShowSortMenu(!showSortMenu)} />
            {showSortMenu && (
              <div className="sort-menu">
                <div onClick={() => { setSortOption('recent'); setShowSortMenu(false) }}>Recently Added</div>
                <div onClick={() => { setSortOption('name'); setShowSortMenu(false) }}>Name</div>
                <div onClick={() => { setSortOption('company'); setShowSortMenu(false) }}>Company</div>
                <div onClick={() => { setSortOption('city'); setShowSortMenu(false) }}>City</div>
              </div>
            )}
          </div>
          <select value={sortOption} onChange={e => setSortOption(e.target.value)} className="sort-dropdown">
            <option value="recent">Recently Added</option>
            <option value="name">Alphabetical (Name)</option>
            <option value="company">Company</option>
            <option value="city">City</option>
          </select>
          <FiRefreshCw size={35} className="btn-reset-icon" onClick={resetFilters} />
        </div>
      </div>
      {filteredUsers.length > 0 ? (
        <div className="user-list-grid">
          {filteredUsers.map(user => <UserCard key={user._id} user={user} />)}
        </div>
      ) : (
        <div className="no-users">No users found</div>
      )}
    </div>
  )
}

export default UserList
