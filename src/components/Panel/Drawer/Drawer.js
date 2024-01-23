import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SaveIcon from '@mui/icons-material/Save';
import './Drawer.css';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { removeBookmark } from '../../../redux/infoSlice';
// import { InputBase, Paper, TextField } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const selector = useSelector((state) => state.necessaryInfo);
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setOpen(true);
        props.setDrawerOpen();
    };

    const handleDrawerClose = () => {
        setOpen(false);
        props.setDrawerOpen();
    };

    const menuOptions = [
        {
            label: 'Home',
            image: <HomeIcon />,
        },
        {
            label: 'Bookmarks',
            image: <BookmarkBorderIcon />,
            subItems: selector?.bookmarks ?? []
        },
        {
            label: 'Saved',
            image: <SaveIcon />,
        }
    ];

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" open={open} color='default'>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: '#2e2f41',
                    color: 'white'
                }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" noWrap component="div">
                            News Daily
                        </Typography>
                    </Toolbar>
                    <Toolbar>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '350px'
                        }}>
                            <div className='search-container'>
                                <input
                                    type='text'
                                    className='search-input'
                                    placeholder='Please search something'
                                    onChange={(e) => {
                                        // props.setSearch(e.target.value);
                                        setSearchText(e.target.value);
                                    }}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            props.setSearch(searchText);
                                        }
                                    }}
                                    value={searchText}
                                />
                                <button>
                                    <SearchIcon />
                                </button>
                            </div>
                            <Button type='button' color='inherit'>
                                <AccountCircleIcon fontSize='large' />
                                <MoreVertIcon />
                            </Button>
                        </Box>
                    </Toolbar>
                </Box>
            </AppBar>
            <Drawer variant='permanent' open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuOptions.map((option, index) => (
                        <ListItem key={option?.['label']} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {option?.['image']}
                                </ListItemIcon>
                                <ListItemText primary={option?.['label']} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                            {(option?.subItems && open) && (
                                <List>
                                    {
                                        option.subItems.map((item, index) => {
                                            return (
                                                <ListItem
                                                    key={`${index}-${option['label']}`}
                                                    disablePadding sx={{ display: 'block' }}

                                                >
                                                    <ListItemButton
                                                        sx={{
                                                            minHeight: 48,
                                                            justifyContent: 'initial',
                                                            display: open ? 'block' : 'none',
                                                            px: 2.5,
                                                        }}
                                                    >
                                                        <Box
                                                            display={'flex'}
                                                            alignContent={'center'}
                                                            justifyContent={'space-between'}
                                                        >
                                                            <BookmarkAddedIcon
                                                                fontSize='small'

                                                            />
                                                            <Typography
                                                                sx={{
                                                                    textWrap: 'wrap',
                                                                    fontSize: '14px'
                                                                }}
                                                                onClick={() => {
                                                                    window.open(item?.['url'], '_blank').focus();
                                                                }}
                                                            >
                                                                {`${item?.['title'].split(" ").splice(0, 8).join(" ")}...` || 'N/A'}
                                                            </Typography>
                                                            <DeleteOutlineIcon
                                                                onClick={() => dispatch(removeBookmark(index))}
                                                            />
                                                        </Box>
                                                    </ListItemButton>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            )}
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {/* <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}
            </Drawer>
        </>
    );
}
