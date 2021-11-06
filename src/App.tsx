// react
import React from 'react'
// lib
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Header from './components/Header'
// components
import Favourite from './screens/Favourite'
import NotFound from './screens/NotFound'
import Search from './screens/Search'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Search />} />
            <Route path='favourite' element={<Favourite />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default styled(App) `
  
`
