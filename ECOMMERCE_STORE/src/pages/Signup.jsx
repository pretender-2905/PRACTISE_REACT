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
import { createUserWithEmailAndPassword,  GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState('');
  const [username, setUsername] = useState('');

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
    alert("Signin with google successfully")
    console.log("✅ Google login successful", user.email);
        navigate("/products")

  } catch (error) {
    console.error("❌ Google login error", error.message);
     alert("Signin with google Something went wrong")
  }
};

  const handleSignup = async () => {
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
          navigate("/products")

    } catch (error) {
      console.log('Signup Error:', error.message);
    }
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
              Create your account
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleSignUp}
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

          <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="Country"
              fullWidth
              margin="normal"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                mt: 2,
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
