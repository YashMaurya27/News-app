import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MiniDrawer, { DrawerHeader } from './Drawer/Drawer';
import Home from './Home/Home';
import Profile from './Profile/Profile';

export default function Panel() {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState('');

  const renderRoutes = () => {
    return (
      <Routes>
        <Route
          path='home'
          element={<Home
            drawerOpen={drawerOpen}
            search={search}
          />}
        />
        <Route
          path='profile'
          element={<Profile />}
        />
        <Route
          path='*'
          element={<Navigate to={'home'} />}
        />
      </Routes>
    )
  }

  return (
    <div style={{
      display: 'flex',
    }}>
      <MiniDrawer
        setDrawerOpen={() => {
          setDrawerOpen(!drawerOpen)
        }
        }
        setSearch={(e) => {
          setSearch(e);
        }
        }
      />
      <div className='app-container'
        style={{
          width: drawerOpen ?
            'calc(100% - 240px)' :
            'calc(100% - 65px)'
        }}
      >
        <DrawerHeader />
        <>
          {renderRoutes()}
        </>
      </div>
    </div>
  )
}
