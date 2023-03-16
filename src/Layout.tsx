import React, {ReactNode} from 'react';
import {Box, Typography, Link, Divider, CssBaseline, createTheme, ThemeProvider} from '@mui/material';

type LayoutProps = {
    children: ReactNode;
};

const muiTheme = createTheme({
    palette: {
        primary: {
            main: '#007aff',
        },
    },
});

const Layout = ({children}: LayoutProps) => {
    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline/>
            <Box sx={{height: '98vh', backgroundColor: 'gray'}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        maxWidth: '640px',
                        maxHeight: '98vh',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        bgcolor: 'background.default',
                    }}
                >
                    <Typography sx={{p: 1}}>
                        Welcome to{' '}
                        <Link href="https://www.gfh.org.il/">
                            shoah-4d
                        </Link>{' '}
                        demo site.
                    </Typography>
                    <Divider/>
                    <Box sx={{flex: '1 1 0%'}}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>

    );
};

export default Layout;
