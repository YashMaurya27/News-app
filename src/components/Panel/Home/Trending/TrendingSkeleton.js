import { Box, Skeleton } from '@mui/material'
import React from 'react';
import './Trending.css';

export default function TrendingSkeleton() {
    return (
        <div className='trending-container'>
            <div className='trending-container'>
                {[1, 1, 1, 1, 1, 1].map((item) => {

                    return (

                        <div className='each-trending-news'>
                            <Skeleton variant='rounded' width='30%' height='150px' />
                            <div>
                                <Skeleton variant="text" sx={{ fontSize: '18px' }} />
                                <Skeleton variant="rectangular" width='100%' height='100px' />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Skeleton variant="text" sx={{ fontSize: '18px', width: '30px' }} />

                                    <Skeleton variant="text" sx={{ fontSize: '18px', width: '30px' }} />
                                </Box>
                            </div>
                        </div>
                    )


                })}
            </div>
        </div>
    )
}
