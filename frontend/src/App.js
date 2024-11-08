import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Link } from 'react-router-dom'

//components
import Container from './components/layouts/container'
import Header from './components/layouts/header'
import Footer from './components/layouts/footer'
import Message from './components/layouts/message'

import Login from './components/pages/auth/login'
import Register from './components/pages/auth/register'
import Home from './components/pages/home'
import Profile from './components/pages/user/profile'
import Mypets from './components/pages/pets/mypets'
import AddPets from './components/pages/pets/addPets'


//context
import { UserProvider } from './context/Context'


function App() {
  return (
    <Router>

      <UserProvider>

        <Header />
          <Message />
          <Container>

            <Routes>
              <Route path='/login' 
                element={<Login/>} 
              />

              <Route path="/register" 
                element={<Register/>}
              />

              <Route path="/user/profile" 
                element={<Profile/>}
              />

              <Route path="/user/mypets" 
                element={<Mypets/>}
              />

               <Route path="/pet/add" 
                element={<AddPets/>}
              />

              <Route path="/" 
                element={<Home/>} 
              />
            </Routes>

          </Container>

        <Footer/>

      </UserProvider>

    </Router>
  ) 
}

export default App;
