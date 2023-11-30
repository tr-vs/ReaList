import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ProfileIcon from './ProfileIcon';
import '../styles/SignUp.css';
// change to sign in.cc
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="/">
                ReaList
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const lightTheme = createTheme();

export default function SignIn() {
    const { login, error, isLoading } = useLogin();
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        await login(data);
    
    };


    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: 'solid 3px transparent',
                        borderRadius: '15px',
                        padding: '35px',
                        borderImage:
                            'linear-gradient(to bottom, #61f4de, #6e78ff)',
                        borderImageSlice: 1,
                    }}
                >
                    
                        <ProfileIcon/>
                    
                    {/* i removed the avatar image above*/}
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{
                            mt: 3,
                            mb: 2,
                            fontWeight: 'bold',
                            fontSize: '2rem',
                        }}
                    >
                        Sign In
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{ mt: 1 }}
                        >
                            {" "}
                            {showPassword ? "Hide Password" : "Show Password"}
                        </Button>
                        {/* <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                            Sign In
                        </Button>
                        {error && <div className="error">{error}</div>}
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {'Sign Up'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
