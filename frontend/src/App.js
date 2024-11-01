import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//components
import Container from './components/layouts/container'
import Header from './components/layouts/header'
import Footer from './components/layouts/footer'
import Login from './components/pages/auth/login'
import Register from './components/pages/auth/register'
import Home from './components/pages/home'



function App() {
  return (
    <Router>

      <Header />

        <Container>

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

        </Container>

      <Footer/>

    </Router>
  ) 
}

export default App;
