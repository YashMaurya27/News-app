import { Skeleton } from '@mui/material'
import React from 'react'

export default function ALlNewsSkeleton(props) {
  return (
    <div className='feed-news-container'>
      {[1, 1, 1, 1, 1, 1, 1, 1].map((item) => {
        return (
          <div className='feed-news-card' style={{
            width: props.drawerOpen ? '90%' : '45%',
            height: props.drawerOpen ? '600px' : '400px',
            padding: '0 10px'
          }}>
            <Skeleton variant='rounded' width='100%' height='200px' />
            <Skeleton variant="text" sx={{ fontSize: '18px' }} />
            <Skeleton variant="text" sx={{ fontSize: '18px' }} />
            <Skeleton variant="rectangular" width='100%' height='100px' />
          </div>
        )
      })}
    </div>
  )
}
