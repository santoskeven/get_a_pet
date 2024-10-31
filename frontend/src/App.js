import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//components
import Login from './components/pages/auth/login'
import Register from './components/pages/auth/register'
import Home from './components/pages/home'



function App() {
  return (
    <Router>
      <Routes>

        <Route exact path='/login' 
          element={<Login/>} 
        />

        <Route exact path="/register" 
          element={<Register/>}
        />

        <Route exact path="/" 
          element={<Home/>} 
        />

      </Routes>
    </Router>
  ) 
}

export default App;
