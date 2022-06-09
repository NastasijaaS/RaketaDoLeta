import { Button, ButtonGroup, FormControl, Grid, InputLabel, MenuItem, Select, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import '../styles/blog.css'
import { GetData } from '../komponente/Fetch';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

const Blog = () => {

    let navigate = useNavigate()

    const [nizBlogova, setBlogovi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {
    //     GetData("http://localhost:8800/api/blog/vratiBlogove", setBlogovi, setGreska, setIsLoading)
    // }, [])

    const [naslov, setNaslov] = useState('Zdravlje')

    useEffect(() => {
        const get = async () => {
            await
                GetData("http://localhost:8800/api/blog/VratiBlogTag/" + naslov, setBlogovi, setGreska, setIsLoading)
        }
        get()
    }, [naslov])

    return (
        <div className="sviBlogovi margina">

            <ButtonGroup onClick={(ev) => { setNaslov(ev.target.value) }} className='divZaIzbor' size="large" sx={{ display: { xs: 'none', s: 'none', md: 'flex' } }}>
                <Button value='Zdravlje' className='btnBlog zdravlje'>Zdravlje</Button>
                <Button value='Ishrana' className='btnBlog ishrana'>Ishrana</Button>
                <Button value='Trening' className='btnBlog treninzi'>Trening</Button>
                <Button value='Fitness' className='btnBlog fitnes'>Fitnes</Button>
            </ButtonGroup>
            <FormControl fullWidth sx={{ minWidth: 120, display: { xs: 'flex', md: 'none' } }}>
                <InputLabel id="demo-simple-select-helper-label">{naslov}</InputLabel>
                <Select
                    id="demo-simple-select-helper"
                    label="Kategorija"
                    onChange={(ev) => { setNaslov(ev.target.value) }}
                    value={naslov}
                >
                    <MenuItem value='Zdravlje'>Zdravlje</MenuItem>
                    <MenuItem value='Ishrana'>Ishrana</MenuItem>
                    <MenuItem value='Trening'>Trening</MenuItem>
                    <MenuItem value='Fitness'>Fitness</MenuItem>
                </Select>
            </FormControl>

            {isLoading && <CircularProgress size='2rem' disableShrink />}

            <Typography variant="h4" component="div">{naslov}</Typography>
            {/* <h2>{naslov}</h2> */}

            {greska && <p className='greska'>Doslo je do greske</p>}

            <Grid container className='blogovi' spacing={2} justify="flex-start"
                alignItems="flex-start">
                {nizBlogova
                    .map((usl, i) => (
                        <Grid key={i} item xs={12} sm={6} md={4}
                            onClick={() => {
                                navigate(`/blog/${usl.tagovi}/${usl.naslov}`, { state: usl });
                            }}>

                            <Card className="blog" sx={{ maxWidth: 345 }} >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={usl.slika}
                                        alt={usl.naslov}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {usl.naslov}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {usl.kratakopis}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>

                        // <div key={i} className="blog">
                        //     <h2 className="naslovBloga">{usl.naslov}</h2>
                        //     <p className="textBloga">{usl.tekst}</p>
                        //     <img src={usl.slika} />
                        //     <p>{usl.datum}</p>
                        //     {/* <span className="autorBloga">Autor: {usl.autor}</span> */}
                        // </div>
                    ))}
            </Grid>
        </div >
    )

}

export default Blog