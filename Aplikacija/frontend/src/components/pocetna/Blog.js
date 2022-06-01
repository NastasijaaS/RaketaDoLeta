import { Button, ButtonGroup, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import '../../styles/blog.css'
import { GetData } from '../komponente/Fetch';
import CircularProgress from '@mui/material/CircularProgress';

const blogovi = [{ naslov: 'naslov', text: 'text dugacak0', autor: 'mika mikic' },
{ naslov: 'naslov', text: 'text dugacak0', autor: 'mika mikic' },
{ naslov: 'naslov', text: 'text dugacak0', autor: 'mika mikic' }];

const Blog = () => {

    const [nizBlogova, setBlogovi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        GetData("http://localhost:8800/api/blog/vratiBlogove", setBlogovi, setGreska, setIsLoading)
    }, [])

    const [naslov, setNaslov] = useState('Zdravlje')

    useEffect(() => {
        GetData("http://localhost:8800/api/blog/VratiBlogTag/" + naslov, setBlogovi, setGreska, setIsLoading)
    }, [naslov])

    return (
        <div className="sviBlogovi">



            <ButtonGroup onClick={(ev) => { setNaslov(ev.target.value) }} className='divZaIzbor' size="large" sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button value='Zdravlje' className='btnBlog zdravlje'>Zdravlje</Button>
                <Button value='Ishrana' className='btnBlog ishrana'>Ishrana</Button>
                <Button value='Trening' className='btnBlog treninzi'>Trening</Button>
                <Button value='Fitness' className='btnBlog fitnes'>Fitnes</Button>
            </ButtonGroup>
            <FormControl fullWidth sx={{ minWidth: 120, display: { xs: 'flex', md: 'none' } }}>
                <InputLabel id="demo-simple-select-helper-label">Kategorija</InputLabel>
                <Select
                    id="demo-simple-select-helper"
                    label="Kategorija"
                    onChange={(ev) => { setNaslov(ev.target.value) }}
                >
                    <MenuItem value='Zdravlje'>Zdravlje</MenuItem>
                    <MenuItem value='Ishrana'>Ishrana</MenuItem>
                    <MenuItem value='Trening'>Trening</MenuItem>
                    <MenuItem value='Fitness'>Fitness</MenuItem>
                </Select>
            </FormControl>

            {isLoading && <CircularProgress size='2rem' disableShrink />}

            <h2>{naslov}</h2>

            {greska && <p className='greska'>Doslo je do greske</p>}

            {nizBlogova
                .map((usl, i) => (
                    <div key={i} className="blog">
                        <h2 className="naslovBloga">{usl.naslov}</h2>
                        <p className="textBloga">{usl.tekst}</p>
                        <p>{usl.datum}</p>
                        {/* <span className="autorBloga">Autor: {usl.autor}</span> */}
                    </div>
                ))}
        </div >
    )

}

export default Blog