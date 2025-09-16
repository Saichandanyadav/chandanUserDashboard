import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'
import UserList from './pages/UserList/UserList'
import UserAction from './pages/UserAction/UserAction'
import UserDetails from './pages/UserDetails/UserDetails'
import NotFound from './pages/NotFound'
import "./App.css"

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserAction />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/:id/edit" element={<UserAction />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
