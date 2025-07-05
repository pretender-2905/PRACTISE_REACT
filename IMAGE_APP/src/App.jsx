
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box, TextField, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Header from './components/Header';
import axios from "axios";
import ImageCart from './components/ImageCart';

export default function ButtonUsage() {
const [Images, setImages] = useState([])

useEffect(()=>{
  axios
  .get('https://api.unsplash.com/search/photos?query=mountains&per_page=10&client_id=xxWCWVATx1WjNUqMMBMb8WAF5n5vMxhSmo6POqaUVq4')
  .then((res)=>{
    console.log("res=> ", res?.data?.results)
    setImages(res?.data?.results)
  })
  .catch((err)=>{
    console.log("err=> ", err)
  })
  
},[])

  return (
    <div className='container mx-auto'>

      <Header />
   
      <Box
        marginTop={"10px"}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"} 
        gap={2}
        >

        <TextField id="outlined-basic" label="Search your image" fullWidth variant="outlined" />

         <Button
          sx={{
            borderRadius: "5px",

          }}
          startIcon={<SearchOutlinedIcon />}
          color={'primary'}
          variant='outlined'>
          Search
        </Button>
      </Box>

      <Box >
          {
            Images.map((image)=>{
              <ImageCart image={image} />
            })
          }
      </Box>

    </div>


  )
}
