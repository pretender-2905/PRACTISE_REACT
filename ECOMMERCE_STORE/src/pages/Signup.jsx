import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Paper,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleGoogleSignIn = () => {
    console.log('Signing in with Google');
  };

  return (
    <Box
      sx={{
        marginTop: '90px',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(145deg, #f8f5ff, #ffffff)',
            boxShadow: '0 8px 32px rgba(90, 57, 148, 0.1)',
          }}
        >
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(to right, #7b1fa2, #4527a0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SIGN UP
            </Typography>
            <Typography color="text.secondary">
              Sign in to access your account
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleSignIn}
            sx={{
              py: 1.5,
              mb: 3,
              borderRadius: 2,
              borderColor: '#e0e0e0',
              color: '#5f6368',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            Continue with Google
          </Button>

          <Divider sx={{ my: 3 }}>or</Divider>

          <Box component="form" onSubmit={handleSignIn}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
            //   value={email}
            //   onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#b39ddb',
                  },
                },
              }}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#b39ddb',
                  },
                },
              }}
            />
            <TextField
              label="Country"
              fullWidth
              margin="normal"
            //   value={country}
            //   onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#b39ddb',
                  },
                },
              }}
            />

            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#b39ddb',
                  },
                },
              }}
            />

            <Box textAlign="right" mb={3}>
              <Button
                size="small"
                sx={{
                  color: '#7b1fa2',
                  fontWeight: 500,
                }}
              >
                Forgot password?
              </Button>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                mb: 2,
                borderRadius: 2,
                fontWeight: 600,
                background: 'linear-gradient(to right, #7b1fa2, #4527a0)',
                '&:hover': {
                  background: 'linear-gradient(to right, #6a1b9a, #3d1b92)',
                },
              }}
            >
              SIGN UP
            </Button>
          </Box>

          
        </Paper>
      </Container>
    </Box>
  );
}
