import React from 'react'
import Navbar from './components/Navbar'
import { createBrowserRouter, createRoutesFromElements ,Outlet,Route, RouterProvider} from 'react-router-dom'
import Places from './components/Places'
import About from './components/About'
import Hero from './components/Hero'
import Footer from './components/Footer'
import NepalHeroSection from './components/Hero'
import ContactUs from './components/Contact'
import NewsletterSubscription from './components/ui/Subscription'
import Home from './components/Home'
import Login from './components/ui/Login'
import SelectInterests from './components/ui/SelectInterest'
import PlanMyTrip from './components/ui/PlanMyTrip'
import FavoritePlaces from './components/ui/FavouritePlaces'
import Interests from './components/ui/Interest'

const RootLayout=()=>{
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>} />
        <Route path='/places' element={<Places/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="/select-interests" element={<SelectInterests />} />
        <Route path="/favourites" element={<FavoritePlaces />} />
        <Route path="/plan" element={<PlanMyTrip />} />
        <Route path="/interests" element={<Interests />} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<ContactUs/>} />
    </Route>
  )
)


const App = () => {
  return (
    <div>
      <RouterProvider router={router}  />
    </div>
  )
}

export default App