import { Box, Divider, IconButton, InputLabel, MenuItem, Select, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GET } from '../../../services/requests';
// import TuneIcon from '@mui/icons-material/Tune';
import { flag_data } from '../../../assets/flags/flags';
import Trending from './Trending/Trending';
import AllNews from './AllNews/AllNews';
import ClearIcon from '@mui/icons-material/Clear';
import ALlNewsSkeleton from './AllNews/AllNewsSkeleton';
import TrendingSkeleton from './Trending/TrendingSkeleton';

export default function Home(props) {

  const [tabValue, setTabValue] = React.useState(0);
  const [date, setDate] = useState({});
  const [trendingNews, setTrendingNews] = useState([]);
  const [country, setCountry] = useState('us');
  const [feedNews, setFeedNews] = useState([]);
  const [trendingSize, setTrendingSize] = useState(10);
  const [totalTrending, setTotalTrending] = useState();
  const [trendingPageNum, setTrendingPageNum] = useState(1);
  const [feedLoad, setFeedLoad] = useState(false);
  const [trendingLoad, setTrendingLoad] = useState(false);
  // const [category, setCategory] = useState('Business');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // setCategory(categories[newValue]);
  };

  const categories = {
    0: 'Business',
    1: 'Entertainment',
    2: 'General',
    3: 'Health',
    4: 'Science',
    5: 'Sports',
    6: 'Technology'
  }

  useEffect(() => {
    const d = new Date();
    let currentDate = JSON.stringify(d);
    currentDate = currentDate.substring(1, 11);

    let tempDate = {
      day: getDayName(d.getDay()),
      date: currentDate
    }
    setDate(tempDate);
  }, []);

  useEffect(() => {
    setTrendingLoad(true);
    const params = {
      country: country,
      apiKey: 'de713b26887d4c68a61209262645aa51',
      pageSize: trendingSize,
      page: trendingPageNum
    };
    GET('top-headlines', params)
      .then((e) => {
        setTrendingNews(e.data.articles);
        setTotalTrending(e.data.totalResults);
        setTrendingLoad(false);
      })
  }, [country, trendingSize, trendingPageNum]);

  useEffect(() => {
    setFeedLoad(true);
    const params = {
      q: (props.search !== '') ?
        props.search :
        categories[tabValue].toLowerCase(),
      apiKey: 'de713b26887d4c68a61209262645aa51'
    };
    GET('everything', params)
      .then((res) => {
        setFeedNews(res.data.articles);
        setFeedLoad(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue, props.search]);

  const getDayName = (dayNum) => {
    let day = '';
    switch (dayNum) {
      case 0:
        day = 'Sunday';
        break;
      case 1:
        day = 'Monday';
        break;
      case 2:
        day = 'Tuesday';
        break;
      case 3:
        day = 'Wednesday';
        break;
      case 4:
        day = 'Thursday';
        break;
      case 5:
        day = 'Friday';
        break;
      case 6:
        day = 'Saturday';
        break;
      default:
        day = 'N/A';
    }
    return day;
  }

  const handleCountryChange = (e) => {
    setCountry(e);
  }

  return (
    <>
      <div style={{
        display: 'flex',
        // alignItems: 'center',
        justifyContent: 'space-between',
        overflowX: 'hidden',
        padding: '15px',
        position: 'relative'
      }}>
        <Box sx={{
          width:
          {
            xs: '100%', sm: '100%', md: "50%",
            lg: props.drawerOpen ? '53%' : '58%'
          },
          // { xs: '100%', sm: '100%', md: "50%", lg: '60%' },
          bgcolor: 'background.paper',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;',
          position: 'fixed',
          left: props.drawerOpen ? '250px' : '80px',
          top: '78px',
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Box sx={{
              width: { md: 150 },
              fontFamily: 'Poppins',
              p: 1
            }}>
              {Object.keys(date).length > 0 ?
                <>
                  <Typography
                    fontWeight={600}
                    letterSpacing={1}
                    sx={{
                      opacity: '0.8',
                    }}>
                    {(date?.day).toUpperCase()}
                  </Typography>
                  <Typography
                    fontWeight={500}
                    sx={{
                      opacity: '0.7',
                      fontSize: '14px'
                    }}>
                    {date?.date}
                  </Typography>
                </> : <Skeleton />}
            </Box>
            <Divider orientation="vertical" flexItem />
            {props.search !== '' ?
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '-webkit-fill-available'
              }}>
                <Typography
                  fontSize={16}
                  sx={{
                    px: 1
                  }}
                >
                  <i>Showing results for '<b>{props.search}</b>'</i>
                </Typography>
                <IconButton>
                  <ClearIcon />
                </IconButton>
              </Box>
              : <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                textColor='inherit'
                indicatorColor='primary'
                sx={{
                  width: props.drawerOpen ? 450 : 600
                }}
              >
                <Tab label="Business" />
                <Tab label="Entertainment" />
                <Tab label="General" />
                <Tab label="Health" />
                <Tab label="Science" />
                <Tab label="Sports" />
                <Tab label="Technology" />
              </Tabs>}
          </Box>
          {feedLoad ? <ALlNewsSkeleton
            drawerOpen={props.drawerOpen}
          /> :
            <AllNews
              feedNews={feedNews}
              drawerOpen={props.drawerOpen}
            />}

        </Box>
        <Box sx={{
          width: { xs: '0%', sm: '0%', md: "49%", lg: '35%' },
          display: { xs: 'none', sm: 'none', md: 'block', },
          position: 'fixed',
          right: '0px',
          top: '78px',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;'
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'background.paper',
            p: 1
          }}>
            <Typography
              fontWeight={600}
              fontSize={16}
              letterSpacing={1}
              sx={{
                opacity: '0.8',
              }}>TRENDING THIS WEEK</Typography>
            {/* <IconButton> */}
            {/* <TuneIcon /> */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              width: '200px',
              justifyContent: 'end',
            }}>
              <InputLabel id="demo-simple-select-filled-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                label='Choose'
                sx={{
                  ml: 2,
                  width: '75px'
                }}
                value={country}
                // label="Age"
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                {flag_data.map((country, index) => {
                  return <MenuItem value={country.code} key={`${index}flag`}>
                    {country.flag}
                  </MenuItem>
                })}
              </Select>
            </Box>
          </Box>
          {trendingLoad ?
            <TrendingSkeleton /> :
            <Trending
              trendingNews={trendingNews}
              totalTrending={totalTrending}
              trendingSize={trendingSize}
              setTrendingSize={(e) => {
                setTrendingSize(e);
              }}
              trendingPageNum={trendingPageNum}
              setTrendingPageNum={(e) => {
                setTrendingPageNum(e);
              }}
            />}
        </Box>
      </div>
    </>
  )
}
