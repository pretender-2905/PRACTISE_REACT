import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, Button, Container, Paper, Typography,
  Box, FormControl, InputLabel, Select, MenuItem,
  Divider, InputAdornment, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid, Avatar,
  List, ListItem, ListItemAvatar, ListItemText,
  Chip, CircularProgress, useMediaQuery, useTheme
} from '@mui/material';
import { 
  LocationOn, Phone, Email, Person, Home, 
  ShoppingCart, CheckCircle, LocalShipping 
} from '@mui/icons-material';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';

const Checkout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    province: '',
    city: '',
    phone: '',
    email: user?.userInfo?.email || ''
  });

  const [cities, setCities] = useState([]);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Province and city data
  const pakistaniProvinces = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Kashmir'];
  const cityData = {
    Punjab: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Sialkot'],
    Sindh: ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah'],
    'Khyber Pakhtunkhwa': ['Peshawar', 'Abbottabad', 'Mardan', 'Swat', 'Nowshera'],
    Balochistan: ['Quetta', 'Gwadar', 'Turbat', 'Khuzdar'],
    'Gilgit-Baltistan': ['Gilgit', 'Skardu', 'Hunza'],
    'Azad Kashmir': ['Muzaffarabad', 'Mirpur', 'Kotli']
  };

  const getCitiesByProvince = (province) => province ? cityData[province] || [] : [];

  const generateOrderId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return `ORD-${timestamp}-${randomNum}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'province') {
      setCities(getCitiesByProvince(value));
      setFormData(prev => ({
        ...prev,
        province: value,
        city: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      
      const requiredFields = ['firstName', 'lastName', 'address', 'province', 'city', 'phone', 'email'];
      const missingFields = requiredFields.filter(field => !formData[field].trim());
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      const orderTotal = Math.round(cartItems.reduce((total, item) => total + (item.price * item.quantity), 0));
      const orderId = generateOrderId();

      const orderData = {
        ...formData,
        items: cartItems.map(item => ({
          id: item.id,
          title: item.title || item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || '/placeholder-product.jpg'
        })),
        total: orderTotal,
        userId: user?.userInfo?.uid || 'guest',
        status: 'pending',
        createdAt: serverTimestamp(),
        paymentMethod: 'Cash on Delivery',
        orderId
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      
      setOrderDetails({
        ...orderData,
        id: docRef.id,
        createdAt: new Date().toLocaleString(),
        productCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      });

      if (clearCart && typeof clearCart === 'function') {
        clearCart();
      }
      setOpenSuccessDialog(true);
      
    } catch (error) {
      console.error('Order submission error:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 2 : 4 }}>
      {/* Checkout Form */}
      <Paper elevation={3} sx={{ 
        p: isMobile ? 2 : 4, 
        borderRadius: 3,
        background: theme.palette.background.paper,
        boxShadow: '0 8px 32px rgba(90, 57, 148, 0.2)',
        border: '1px solid rgba(123, 31, 162, 0.1)'
      }}>
        <Typography variant="h4" sx={{
          mb: 3,
          fontWeight: 700,
          background: 'linear-gradient(to right, #7b1fa2, #4527a0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          fontSize: isMobile ? '1.5rem' : '2rem'
        }}>
          Shipping Details
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            {/* Address Information */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                multiline
                rows={2}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="province-label">Province</InputLabel>
                <Select
                  labelId="province-label"
                  label="Province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                  variant="outlined"
                >
                  {pakistaniProvinces.map((province) => (
                    <MenuItem key={province} value={province}>
                      {province}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="city-label">City</InputLabel>
                <Select
                  labelId="city-label"
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  disabled={!formData.province}
                  variant="outlined"
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Button
              startIcon={<CheckCircle />}
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting || cartItems.length === 0}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                background: 'linear-gradient(to right, #7b1fa2, #4527a0)',
                '&:hover': {
                  background: 'linear-gradient(to right, #6a1b9a, #3d1b92)',
                },
              }}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Place Order'}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Order Confirmation Dialog */}
      <Dialog
        open={openSuccessDialog}
        onClose={() => setOpenSuccessDialog(false)}
        fullWidth
        maxWidth="md"
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(to right, #7b1fa2, #4527a0)',
          color: 'white',
          textAlign: 'center',
          py: 3
        }}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <CheckCircle sx={{ mr: 1 }} />
            Order Confirmed!
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ py: 3 }}>
          {orderDetails && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <ShoppingCart sx={{ mr: 1 }} /> Order Summary
                  </Typography>
                  
                  <Chip 
                    label={`Order #${orderDetails.orderId}`} 
                    color="primary" 
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  
                  <List dense>
                    {orderDetails.items.map((item, index) => (
                      <ListItem key={index} sx={{ py: 1 }}>
                        <ListItemAvatar>
                          <Avatar 
                            alt={item.title} 
                            src={item.image} 
                            sx={{ width: 56, height: 56, mr: 2 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.title}
                          secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}
                          primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      Total:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      ${orderDetails.total}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <LocalShipping sx={{ mr: 1 }} /> Shipping Details
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {orderDetails.firstName} {orderDetails.lastName}
                    </Typography>
                    <Typography variant="body2">
                      {orderDetails.address}
                    </Typography>
                    <Typography variant="body2">
                      {orderDetails.city}, {orderDetails.province}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2">
                    <strong>Phone:</strong> {orderDetails.phone}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {orderDetails.email}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>

       <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
  <Button 
    variant="contained"
    onClick={() => {
      setOpenSuccessDialog(false);
      navigate('/products'); // or '/shop', '/items', etc. depending on your route
    }}
    sx={{
      background: 'linear-gradient(to right, #7b1fa2, #4527a0)',
      '&:hover': {
        background: 'linear-gradient(to right, #6a1b9a, #3d1b92)',
      },
      minWidth: 200
    }}
  >
    Continue Shopping
  </Button>
</DialogActions>
      </Dialog>
    </Container>
  );
};

export default Checkout;