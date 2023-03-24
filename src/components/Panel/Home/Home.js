import { Box, Divider, Skeleton, Tab, Tabs, Typography } from '@mui/material'
// import { fontFamily, fontSize } from '@mui/system';
import React, { useEffect, useState } from 'react'

export default function Home() {

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [date, setDate] = useState({});

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

  return (
    <>
      <Box sx={{
        maxWidth: { xs: 320, sm: 480, md: 900 },
        bgcolor: 'background.paper',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Box sx={{
          width: { md: 150 },
          fontFamily: 'Poppins',
          p: 2
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
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          textColor='inherit'
          indicatorColor='primary'
        >
          <Tab label="Politics" />
          <Tab label="Sports" />
          <Tab label="Education" />
          <Tab label="Corporate" />
          <Tab label="Entertainment" />
          <Tab label="Technology" />
          <Tab label="Travel" />
          <Tab label="Lifestyle" />
          <Tab label="Market" />
        </Tabs>
      </Box>
      <Divider orientation='horizontal' flexItem sx={{
        maxWidth: { xs: 320, sm: 480, md: 900 },
        // margin: '10px 0'
      }} />
    </>
  )
}
