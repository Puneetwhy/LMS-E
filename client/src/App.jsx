import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CourseList from './pages/course/CourseList';
import Contact from './pages/Contact';
import Denied from './pages/Denied';
import CourseDescription from './pages/course/CourseDescription';
import RequireAuth from './components/auth/RequireAuth';
import CreateCourse from './pages/course/CreateCourse';
import UserProfile from './pages/user/UserProfile';
import EditProfile from './pages/user/EditProfile';
import Checkout from './pages/payment/Checkout';
import CheckoutSuccess from './pages/payment/CheckoutSuccess';
// import Footer from './components/Footer'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <Homepage /> }></Route>
        <Route path="/about" element={ <AboutUs /> }></Route>
        <Route path="/signup" element={ <Signup /> }></Route>
        <Route path="/login" element={ <Login /> }></Route>
        <Route path="/courses" element={ <CourseList /> }></Route>
        <Route path="/course/description" element={ <CourseDescription /> }></Route>
        <Route path="/contact" element={ <Contact /> }></Route>
        <Route path="/denied" element={ <Denied /> }></Route>

        <Route  element={ <RequireAuth allowedRoles= { ["ADMIN"]} /> }>
          <Route path="/course/create" element={ <CreateCourse /> }></Route>
        </Route>

        <Route  element={ <RequireAuth allowedRoles= { ["ADMIN", "USER"]} /> }>
          <Route path="/user/profile" element={ <UserProfile /> }></Route>
          <Route path="/user/editprofile" element={ <EditProfile /> }></Route>
          <Route path="/checkout" element={ <Checkout /> }></Route>
          <Route path="/checkout/success" element={ <CheckoutSuccess /> }></Route>
        </Route>

        <Route path="*" element={ <NotFound /> }></Route>

      </Routes>

    </>
  )
}

export default App
