import { Button, Typography, TextField } from "@mui/material"
import { Box, } from "@mui/system"
import { useRef, useState } from "react"
import DropDown from "./DropDown"
import useAxiosPrivate from "../api/useAxiosPrivate"
import Info from "./Info"


const tagovi = ['Zdravlje', 'Fitnes', 'Ishrana', 'Trening']


const FormaDodajBlog = (props) => {

    const axiosPrivate = useAxiosPrivate()

    const file = useRef()
    const naslov = useRef()
    const kratakOpis = useRef()
    const tekst = useRef()
    const slika = useRef()

    const [tag, setTag] = useState('')

    const dodajBlog = async (event) => {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);

        console.log(file)
        console.log(formData)

        await axiosPrivate.post('http://localhost:8800/api/blog/dodajBlog', {

            naslov: naslov.current.value,
            tekst: tekst.current.value,
            slika: slika.current.value,
            tagovi: tag,
            kratakopis: kratakOpis.current.value,
        }).then(p => {
            if (p.status === 200) {
                alert('Uspesno dodat blog')
            }
        }).catch((error) => {
            alert('Doslo je do greske')
            console.log('greska prilkom upisa: ' + error.message)
        });
        props.onClose()
    }

    //labela, tip, reff, err, tekst
    //{ labela, set, niz, value }

    return (

        <Box className='cardCenter marginS' sx={{ gap: '1vh', padding: '0% 20%', alignItems: "stretch"}}>

            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>Blog</Typography>

            <Info sx = {{width: '100%'}} labela='Naslov' tip='text' reff={naslov}  />
            <DropDown labela='Tag' set={setTag} niz={tagovi} value={tag} />
            <Info sx = {{width: '100%'}} multiline labela='Kratak opis' tip='text' reff={kratakOpis}  />
            <Info sx = {{width: '100%'}} className = 'prelomi' multiline labela='Tekst' tip='text' reff={tekst} />

            <Info sx = {{width: '100%'}} labela='Slika' tip='text' reff={slika} />
            <Info sx = {{width: '100%'}} fullWidth tip='file' reff={file} />

            <Box sx={{ alignItems: 'center' }} >
                <Button fullWidth variant='outlined' onClick={dodajBlog} >Unesi</Button>
            </Box>

        </Box>
    )
}
export default FormaDodajBlog