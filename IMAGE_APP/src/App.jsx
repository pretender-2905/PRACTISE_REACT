
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Avatar, Box, CircularProgress, Modal, TextField, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Header from './components/Header';
import axios from "axios";
import Masonry from '@mui/lab/Masonry';



export default function App() {
  const [Images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [choosen, setChoosen] = useState([])

  useEffect(() => {
    getImageFromUnsplash()
  }, [])



  const getImageFromUnsplash = () => {

    axios
      .get('https://api.unsplash.com/photos?client_id=xxWCWVATx1WjNUqMMBMb8WAF5n5vMxhSmo6POqaUVq4&per_page=30')
      .then((res) => {
        console.log("res=> ", res.data)
        setImages(res?.data)
        setLoading(false)
      })

      .catch((err) => {
        setLoading(false)
        console.log("err=> ", err)
      })

  }
  const serchImageFromUnSplash = () => {
    setLoading(true)
    axios
      .get(`https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=xxWCWVATx1WjNUqMMBMb8WAF5n5vMxhSmo6POqaUVq4&per_page=30`)
      .then((res) => {
        console.log("res of search", res)
        setImages(res?.data?.results)
        setLoading(false)
      })

      .catch((err) => {
        setLoading(false)
        alert("Something went wrong: " + err.response?.data || err.message);
        console.log("err=> ", err)
      })
  }


  return (
    <div className='p-3'>
 


<Modal open={showModal} onClose={() => setShowModal(false)}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'white',
      width: { xs: '95%', md: '80%' },
      maxHeight: '90vh',
      overflowY: 'auto',
      borderRadius: '10px',
      p: 2,
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: 2,
    }}
  >
    {/* Image section */}
    <Box sx={{ flex: 1 }}>
      <img
        src={choosen?.urls?.regular}
        alt="selected"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
        }}
      />
    </Box>

    {/* Text section */}
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography fontWeight={600} fontSize={{ xs: '1.3rem', md: '2rem' }}>
        {choosen.description}
      </Typography>

      <Typography fontWeight={200} fontSize={{ xs: '1rem', md: '1.2rem' }}>
        {choosen.alt_description}
      </Typography>

      <Box display="flex" alignItems="center" gap={1} fontFamily="cursive" fontSize="1rem" color="purple">
        <Avatar src={choosen?.user?.profile_image?.large} />
        {choosen?.user?.first_name}
      </Box>

      <Typography color="purple" fontFamily="cursive">💜 Likes {choosen?.likes}</Typography>
      <Typography color="purple" fontFamily="cursive">🎨 Created By {choosen?.user?.first_name}</Typography>
      <Typography color="purple" fontFamily="cursive">📸 Instagram ID @{choosen?.user?.instagram_username}</Typography>
      <Typography color="purple" fontFamily="cursive">🎞️ Total Photos: {choosen?.user?.total_photos}</Typography>
      <a
        href={choosen?.user?.portfolio_url}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: 'underline', marginTop: '8px' }}
      >
        💼 Check My Portfolio 👉
      </a>
    </Box>
  </Box>
</Modal>


    


      <Header />

      <Box
        marginTop={"10px"}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        gap={2}
        marginBottom={"10px"}
      >

        <TextField

          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="outlined-basic" label="Search your image" fullWidth variant="outlined" color='secondary' />

        <Button
          disabled={search == ""}
          onClick={serchImageFromUnSplash}
          sx={{ px: 4 }} variant="outlined" color='secondary' startIcon={<SearchOutlinedIcon />}>
          SEARCH
        </Button>
      </Box>

      {
        loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              width: '100%',
            }}
          >
            <CircularProgress size={60} color="primary" />
          </Box>
        ) : (
          <Masonry
            columns={{ sm: 1, md: 2, lg: 4, xl: 5 }}
            spacing={2}
          >
            {
              Images.map((item) => (
                <img onClick={() => {
                  setChoosen(item)
                  setShowModal(true)
                }}
                  src={item.urls.regular}
                  key={item.id} />
              ))
            }
          </Masonry>
        )
      }


    </div>


  )
}


// import React, { useEffect, useState } from 'react';
// import { Box, CircularProgress, Typography } from '@mui/material';

// export default function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate a 3-second loading delay
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <Box
//           sx={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: '#f0f0f0',
//             zIndex: 9999,
//           }}
//         >
//           <CircularProgress size={60} color="primary" />
//         </Box>
//       ) : (
//         <Box sx={{ padding: 5 }}>
//           <Typography variant="h4">Loaded Successfully</Typography>
//         </Box>
//       )}
//     </>
//   );
// }
