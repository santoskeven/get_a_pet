import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//components
import Header from './components/layouts/header'
import Footer from './components/layouts/footer'
import Login from './components/pages/auth/login'
import Register from './components/pages/auth/register'
import Home from './components/pages/home'



function App() {
  return (
    <Router>

      <Header />

      <Routes>

        <Route path='/login' 
          element={<Login/>} 
        />

        <Route path="/register" 
          element={<Register/>}
        />

        <Route path="/" 
          element={<Home/>} 
        />

      </Routes>

      <Footer/>

    </Router>
  ) 
}

export default App;
