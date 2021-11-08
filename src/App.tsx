// react
import React, { FunctionComponent, useMemo, useState } from 'react'
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

interface AppProps {
  className?: string
}

const App: FunctionComponent<AppProps> = ({ className }) => {
  const [favImages, setFavImages] = useState<string[]>([])
  const value = useMemo(
    () => ({ favImages, setFavImages }),
    [favImages]
  );

  return (
    <div className={className}>
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
      <div className="outlet">
        <Outlet />
      </div>
    </>
  )
}

export default styled(App)`
  .outlet {
    text-align: center;
    width: 90%;
    margin: auto;
    padding-bottom: 1rem;
  }
`
