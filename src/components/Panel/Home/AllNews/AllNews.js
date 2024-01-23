import { Box, Button, Link, Typography } from '@mui/material';
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { checkStringLength } from '../../functions';
import './AllNews.css';
import { Bookmark } from '@mui/icons-material';
import { removeBookmark, saveBookmarks } from '../../../../redux/infoSlice';
import { useDispatch, useSelector } from 'react-redux';
import BeenhereIcon from '@mui/icons-material/Beenhere';

export default function AllNews(props) {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.necessaryInfo);
    const bookmarkTitles = selector.bookmarks.map((item) => {
        return item['title'];
    });

    return (
        <div className='feed-news-container'>
            {props.feedNews.map((item, index) => {
                return (

                    <Box sx={{
                        width: {
                            xs: '100%',
                            sm: '100%',
                            md: '90%',
                            lg: props.drawerOpen ? '90%' : '45%'
                        },
                        height: props.drawerOpen ? '600px' : '450px',
                        padding: '0 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        margin: '10px 0'
                    }}>
                        <img
                            src={item.urlToImage ??
                                `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`}
                            alt='feed-news'
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
                            <Link
                                onClick={() => {
                                    window.open(item?.['url'], '_blank').focus();
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {item.title}
                            </Link>
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            {checkStringLength(item.content, 30)}
                        </Typography>
                        <Box display={'flex'} justifyContent={'end'}>
                            <Button
                                endIcon={
                                    bookmarkTitles.includes(item.title) ? <BeenhereIcon /> : <Bookmark />
                                }
                                onClick={() => {
                                    dispatch(
                                        bookmarkTitles.includes(item.title) 
                                        ? removeBookmark(bookmarkTitles.indexOf(item.title))
                                        : saveBookmarks(item));
                                }}>
                                {bookmarkTitles.includes(item.title) ? 'Bookmarked' : 'Bookmark'}
                            </Button>
                        </Box>
                    </Box>
                )
            })}
        </div>
    )
}
