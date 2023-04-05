import { Typography } from '@mui/material';
import React from 'react';
import { checkStringLength } from '../../functions';
import './AllNews.css';

export default function AllNews(props) {
    return (
        <div className='feed-news-container'>
            {props.feedNews.map((item) => {
                return (
                    (item.urlToImage != null) ?
                        <div className='feed-news-card' style={{
                            width: props.drawerOpen ? '90%' : '45%',
                            height: props.drawerOpen ? '600px' : '400px',
                            padding: '0 10px'
                        }}>
                            <img src={item.urlToImage} alt='feed-news'
                                style={{
                                    height: props.drawerOpen ? '400px' : '200px',
                                    width: '100%',
                                }}
                            />
                            <Typography
                                fontSize={16}
                                fontWeight={600}
                                sx={{
                                    py: 1
                                }}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                {checkStringLength(item.content, 30)}
                            </Typography>
                        </div>
                        :
                        <></>
                )
            })}
        </div>
    )
}
