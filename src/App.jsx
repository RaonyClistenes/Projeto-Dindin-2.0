
import './App.css'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import SignIN from './pages/signIN'
import SignUp from './pages/signUP'
import Main from './pages/home'
import { getItem } from './storage/storage'

function Validation({ page }) {
  const token = getItem('token')
  return token ? <Outlet /> : <Navigate to={page} />
}
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignIN />} />
        <Route element={<Validation page={'/'} />}>
          <Route path='/main' element={<Main />} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  )
}
export default App
