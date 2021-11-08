// react
import React, { useMemo, useState } from 'react'
// lib
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Header from './components/Header'
// context
import FavPicsContext from './Context'
// components
import Favourite from './screens/Favourite'
import NotFound from './screens/NotFound'
import Search from './screens/Search'


const App = () => {
  const [favImages, setFavImages] = useState<string[]>([])
  const value = useMemo(
    () => ({ favImages, setFavImages }), 
    [favImages]
  );

  return (
    <div className="App">
      <FavPicsContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Search />} />
              <Route path='favourite' element={<Favourite />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavPicsContext.Provider>
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

export default styled(App)`
  
`
