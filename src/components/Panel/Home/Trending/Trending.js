// import { Box } from '@mui/system';
import { Divider, FormControl, Link, MenuItem, Pagination, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { checkStringLength, removeSource } from '../../functions';
import TrendingCarousel from './Carousel/TrendingCarousel';
import './Trending.css';

export default function Trending(props) {

    const [carousel, setCarousel] = useState(false);

    useEffect(() => {
        if (window.screen.availWidth < 900 && !carousel) {
            setCarousel(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    window.onresize = function (event) {
        if (event.target.outerWidth < 900 && !carousel) {
            setCarousel(true);
        }
        else if (event.target.outerWidth > 900 && carousel) {
            setCarousel(false);
        }
    };

    return (
        (carousel) ?
            <>
                <TrendingCarousel
                    trendingNews={props.trendingNews}
                />
            </> :
            <>
                <div className='trending-container'>
                    {props.trendingNews.map((item, index) => {
                        return (
                            <div className='each-trending-news' key={`${index}div`}>
                                <img
                                    src={item.urlToImage ??
                                        `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`}
                                    alt='trending-news'
                                    key={`${index}img`}
                                />
                                <div key={`${index}innerDiv`}>
                                    <Typography
                                        fontSize={16}
                                        fontWeight={500}
                                        key={`${index}title`}
                                    >
                                        {removeSource(item.title)}
                                    </Typography>
                                    <Typography
                                        fontSize={14}
                                        fontWeight='200'
                                        color={'GrayText'}
                                        key={`${index}content`}
                                    >
                                        {(item.content) ?
                                            <>
                                                {checkStringLength(item.content, 20)}
                                                {' '}<Link href='#'>Read More</Link>
                                            </> : 'No content available'}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                        key={`${index}box`}
                                    >
                                        <Typography
                                            fontSize={14}
                                            color={'GrayText'}
                                            key={`${index}published`}
                                        >
                                            {item.publishedAt.substr(0, 10)}
                                        </Typography>

                                        <Link
                                            fontSize={14}
                                            href='#'
                                            key={`${index}source`}
                                        >
                                            {item.source.name}
                                        </Link>
                                        {/* </Typography> */}
                                    </Box>
                                </div>
                            </div>
                        )


                    })}
                </div>
                <Divider />
                <div className='trending-pagination-container'>
                    <Pagination
                        count={(Math.ceil(props.totalTrending ?? 1 / props.trendingSize ?? 1))}
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
