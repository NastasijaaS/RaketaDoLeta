import { Button, Typography, TextField } from "@mui/material"
import { Box, } from "@mui/system"
import Info from "./Info"
import { useRef, useState } from "react"
import DropDown from "./DropDown"
import useAxiosPrivate from "../api/useAxiosPrivate"

const tagovi = ['Zdravlje', 'Fitnes', 'Ishrana', 'Trening']

const FormaDodajBlog = (props) => {

    const axiosPrivate = useAxiosPrivate()

    const file = useRef()
    const naslov = useRef()
    const kratakOpis = useRef()
    const duziOpis = useRef()
    const slika = useRef()

    const [tag, setTag] = useState('')

    function dodajBlog(event) {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);

        console.log(file)
        console.log(formData)
    }

    //labela, tip, reff, err, tekst
    //{ labela, set, niz, value }

    return (

        <Box className='cardCenter marginS' sx={{ gap: '1vh', padding: '0% 20%', alignItems: "stretch", display: 'flex', flexDirection: 'column' }}>

            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>Blog</Typography>

            <Info labela='naslov' tip='text' reff={naslov} tekst='naslov' />
            <DropDown labela='tag' set={setTag} niz={tagovi} value={tag} />
            <Info multiline labela='kratak opis' tip='text' reff={kratakOpis} tekst='kratak opis' />
            <Info multiline labela='tekst' tip='text' reff={duziOpis} tekst='tekst' width='100%' />

            <Info labela='slika' tip='text' reff={slika} tekst='slika' />
            <Info tip='file' reff={file} />

            <Box sx={{ alignItems: 'center' }} fullWidth>
                <Button variant='outlined' onClick={dodajBlog} >Unesi</Button>
                <Button variant='outlined' onClick={props.onClose} >otkazi</Button>
            </Box>

        </Box>
    )
}
export default FormaDodajBlog