import { useLocation, } from "react-router-dom";
import { Card, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
import '../styles/blog.css'
import { Box, Container } from "@mui/system";

const VelikiBlog = (props) => {

    console.log(props)

    const location = useLocation();

    console.log(location.state)

    const blog = location.state

    return (
        <Card className="marginaVeliki" elevation={3} >
            <Grid container>
                <Grid item xs={12} md={4}>
                    <CardMedia
                    component="img"
                    className="trImg"
                    image= {blog.slika}
                    alt= {blog.naslov}
                    height="250"
                    />
                </Grid>
                <Grid item xs = {12} md = {8}>
                    <CardContent>
                    {/* <Typography variant="caption" component="div"align="center" >{blog.tagovi}</Typography> */}
                    <Typography gutterBottom variant="h5" component="div" align="center">{blog.naslov}</Typography>

                    <Typography variant="body1" align = "justify" sx = {{padding: '2vh 3vw'}}> {blog.tekst} </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
        )
}

export default VelikiBlog