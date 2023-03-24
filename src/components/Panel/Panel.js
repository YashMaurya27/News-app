import { Box } from '@mui/material';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MiniDrawer, { DrawerHeader } from './Drawer/Drawer';
import Home from './Home/Home';
import Profile from './Profile/Profile';
// import Header from './Header/Header';

export default function Panel() {

  const renderRoutes = () => {
    return (
      <Routes>
        <Route
          path='home'
          element={<Home />}
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
    <div>
      <Box sx={{
        display: 'flex',
        backgroundColor: '#f8f8f9'
      }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 1, m: 2 }}>
          <DrawerHeader />
          <>
            {renderRoutes()}
          </>
        </Box>
      </Box>
    </div>
  )
}
