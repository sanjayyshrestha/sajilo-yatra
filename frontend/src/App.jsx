import React from 'react'
import Navbar from './components/Navbar'
import { createBrowserRouter, createRoutesFromElements ,Outlet,Route, RouterProvider} from 'react-router-dom'
import Places from './components/Places'
import About from './components/About'
import { Contact } from 'lucide-react'

const RootLayout=()=>{
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
        <Route path='/places' element={<Places/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
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