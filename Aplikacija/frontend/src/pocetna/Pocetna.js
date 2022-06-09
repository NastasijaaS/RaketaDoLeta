import '../styles/pocetnan.css'
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { UserContext } from '../context/UserContext';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Carousel } from 'react-carousel-minimal';
 
const Pocetna = () => {
    //const toTop = () => window.scrollTo(0,0)

    const data = [
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-wellness-TERETANA-1-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/04/DSC_6581-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/04/DSC_6584-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/04/DSC_6605-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-wellness-TERETANA-2-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-wellness-lokacija-1-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-wellness-lokacija-2-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/04/DSC_6637-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-Wellness-NI%C5%A1-sektor-plus-1-3-1024x686.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-Wellness-NI%C5%A1-sektor-plus-1-5-1024x686.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/DSC_6663-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-Wellness-NI%C5%A1-sektor-plus-1-6-1024x686.jpg',
        }
      ];
    
      const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
      }


    return (

    <Box>
             
        <Box className='container' sx = {{marginBottom: '10%'}}>
            <Box>
                <div className = "poruka"> Krenimo zajedno u novu avanturu </div>
                <Link to = '/treneri'>
                    <Button variant="contained" id = 'centralBtn' size = 'large' sx = {{backgroundColor:'black',color:'white', fontWeight:'800'}} >
                        Zakazite trening         
                    </Button>
                </Link>
            </Box>
        </Box>
        <Box sx = {{margin: "0% 5%"}}>
            <Grid container spacing = {5}>
                <Grid item xs={12} md={4} >
                <Typography gutterBottom variant = 'h6' textAlign = 'center'> Krenimo zajedno u novu avanturu</Typography>
                <Typography variant = 'body1' textAlign = 'justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                <Typography gutterBottom variant = 'h6' textAlign = 'center'> Krenimo zajedno u novu avanturu</Typography>
                <Typography variant = 'body1' textAlign = 'justify' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                <Typography gutterBottom variant = 'h6' textAlign = 'center'> Krenimo zajedno u novu avanturu</Typography>
                <Typography variant = 'body1'textAlign = 'justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                </Grid> 
            </Grid>
        </Box>
        <Box>
            <Carousel
                data={data}
                time={2000}
                width="100%"
                height="500px"
                radius="10px"
                slideNumber={true}
                slideNumberStyle={slideNumberStyle}
                captionPosition="bottom"
                automatic={true}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="darkgrey"
                slideImageFit="cover"
                thumbnails={true}
                thumbnailWidth="100px"
                style={{
                textAlign: "center",
                maxHeight: "500px",
                margin: "10% 5%",
                }}
            />
            </Box>

    </Box>
    )
}

export {Pocetna }