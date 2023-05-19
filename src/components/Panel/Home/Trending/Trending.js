// import { Box } from '@mui/system';
import { Divider, FormControl, Link, MenuItem, Pagination, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { checkStringLength, removeSource } from '../../functions';
import './Trending.css';

export default function Trending(props) {
    return (
        <>
            <div className='trending-container'>
                {props.trendingNews.map((item) => {

                    return (
                        item.content ?
                            <div className='each-trending-news'>
                                <img src={item.urlToImage} alt='trending-news' />
                                <div>
                                    <Typography
                                        fontSize={16}
                                        fontWeight={500}
                                    >
                                        {removeSource(item.title)}
                                    </Typography>
                                    <Typography
                                        fontSize={14}
                                        fontWeight='200'
                                        color={'GrayText'}
                                    >
                                        {checkStringLength(item.content, 20)}
                                        {' '}<Link href='#'>Read More</Link>
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography
                                            fontSize={14}
                                            color={'GrayText'}
                                        >
                                            {item.publishedAt.substr(0, 10)}
                                        </Typography>

                                        <Link
                                            fontSize={14}
                                            href='#'
                                        >
                                            {item.source.name}
                                        </Link>
                                        {/* </Typography> */}
                                    </Box>
                                </div>
                            </div> :
                            <></>
                    )


                })}
            </div>
            <Divider />
            <div className='trending-pagination-container'>
                <Pagination
                    count={Math.ceil(props.totalTrending / props.trendingSize)}
                    onChange={(e) => {
                        props.setTrendingPageNum(parseInt(e.target.textContent))
                    }}
                    page={props.trendingPageNum}
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography sx={{
                            mx: 2,
                            fontSize: 14
                        }}>
                            Rows per page:
                        </Typography>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select"
                            value={props.trendingSize}
                            onChange={(e) => {
                                props.setTrendingSize(parseInt(e.target.value));
                                props.setTrendingPageNum(1);
                            }}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select>
                    </Box>
                </FormControl>
            </div>
        </>
    )
}
