// react
import React from 'react';
// lib
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
// components
import Favourite from './screens/Favourite';
import Search from './screens/Search';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Search />} />
            <Route path='favourite' element={<Favourite />} />
            <Route path='*' element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const Layout = () => {
  return (
    <div className="layout">
      <nav>
        <Link to='/' >Home</Link>
        <Link to='/favourite' >Favourite</Link>
      </nav>

      <Outlet />
    </div>
  )
}

export default App;
