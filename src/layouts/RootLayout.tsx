import {Link, Outlet} from "react-router-dom";
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";

export const RootLayout = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5'}}>
            <AppBar position="static" elevation={1} sx={{bgcolor: '#ffffff', color: '#000000'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{gap: 4}}>
                        <Typography variant="h6" noWrap component={Link} to="/users"
                                    sx={{fontWeight: 700, color: 'primary.main'}}>
                            LOGO
                        </Typography>
                        <Box sx={{display: 'flex', gap: 1}}>
                            <Button component={Link} to="/users"
                                    variant="text"
                                    color="primary"
                                    sx={{textTransform: 'none'}}>Пользователи</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Container maxWidth="xl">
                    <Outlet/>
                </Container>
            </Box>
        </Box>
    )
}