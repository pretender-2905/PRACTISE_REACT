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
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const provider = new GoogleAuthProvider();

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user data exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      // If it's a new user, create Firestore record
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          username: user.displayName,
          country: "", // You can update later
          createdAt: new Date()
        });
      }
      alert("Signin with google successfully");
      navigate("/products");
    } catch (error) {
      console.error("❌ Google login error", error.message);
      alert("Signin with google Something went wrong");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date(),
        country,
        username,
      });

      alert('Signup successful!');
      setEmail('');
      setPassword('');
      setUsername('');
      setCountry('');
      navigate("/products");
    } catch (error) {
      console.log('Signup Error:', error.message);
      alert(`Signup failed: ${error.message}`);
    }
  };

  return (
    <Box
      sx={{
        marginTop: isMobile ? '20px' : '90px',
        minHeight: 'calc(100vh - 40px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: isMobile ? 1 : 2,
        py: isMobile ? 2 : 0
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={isMobile ? 1 : 3}
          sx={{
            p: isMobile ? 2 : 4,
            borderRadius: 3,
            background: 'linear-gradient(145deg, #f8f5ff, #ffffff)',
            boxShadow: '0 8px 32px rgba(90, 57, 148, 0.1)',
            width: '100%'
          }}
        >
          <Box textAlign="center" mb={isMobile ? 2 : 4}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(to right, #7b1fa2, #4527a0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              SIGN UP
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"} color="text.secondary">
              Create your account
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleSignUp}
            sx={{
              py: isMobile ? 1 : 1.5,
              mb: 3,
              borderRadius: 2,
              borderColor: '#e0e0e0',
              color: '#5f6368',
              fontSize: isMobile ? '0.875rem' : '1rem',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            Continue with Google
          </Button>

          <Divider sx={{ my: isMobile ? 2 : 3 }}>or</Divider>

          <Box component="form" onSubmit={handleSignup}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              size={isMobile ? "small" : "medium"}
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#b39ddb',
                  },
                } 
              }}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              size={isMobile ? "small" : "medium"}
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#b39ddb',
                  },
                } 
              }}
            />
            <TextField
              label="Country"
              fullWidth
              margin="normal"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              size={isMobile ? "small" : "medium"}
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#b39ddb',
                  },
                } 
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
              size={isMobile ? "small" : "medium"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={() => setShowPassword(!showPassword)} 
                      edge="end"
                      size={isMobile ? "small" : "medium"}
                    >
                      {showPassword ? <VisibilityOff fontSize={isMobile ? "small" : "medium"} /> : <Visibility fontSize={isMobile ? "small" : "medium"} />}
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
                } 
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: isMobile ? 1 : 1.5,
                mt: 2,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: isMobile ? '0.875rem' : '1rem',
                background: 'linear-gradient(to right, #7b1fa2, #4527a0)',
                '&:hover': {
                  background: 'linear-gradient(to right, #6a1b9a, #3d1b92)',
                },
              }}
            >
              SIGN UP
            </Button>

            <Typography align="center" sx={{ mt: 3, fontSize: isMobile ? '0.875rem' : '1rem' }}>
              Do you have an account?{' '}
              <Link to={"/signin"} style={{ textDecoration: 'none' }}>
                <Button
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    color: '#7b1fa2',
                    fontWeight: 600,
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    minWidth: 'unset',
                    p: isMobile ? '4px' : '8px'
                  }}
                >
                  Sign In
                </Button>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}