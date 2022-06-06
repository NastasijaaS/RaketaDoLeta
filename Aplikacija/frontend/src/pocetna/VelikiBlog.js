import { useLocation, } from "react-router-dom";
import { Card, CardContent, CardMedia, Paper, Typography } from '@mui/material';
import '../styles/blog.css'
import { Box, Container } from "@mui/system";

const VelikiBlog = (props) => {
    // const { state } = props.location
    console.log(props)

    const location = useLocation();

    console.log(location.state)

    const blog = location.state

    //datum
    //naslov
    //slika
    //tagovi
    //kratakopis
    //tekst

    return (
    
        <Card className="marginaVeliki" elevation={3} >
        <CardMedia
        component="img"
       
        image= {blog.slika}
        alt= {blog.naslov}
        />
    
        <CardContent>
        {/* <Typography variant="caption" component="div"align="center" >{blog.tagovi}</Typography> */}
        <Typography gutterBottom variant="h5" component="div" align="center">{blog.naslov}</Typography>

        <Typography variant="body1" color="text.secondary" align = "justify" sx = {{padding: '2vh 3vw'}}> {blog.tekst} </Typography>

        </CardContent>
       

        </Card>
        )
}

export default VelikiBlog