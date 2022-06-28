import { Button, Typography, TextField } from "@mui/material"
import { Box, } from "@mui/system"
import { useRef, useState } from "react"
import DropDown from "../Inputi/DropDown"
import useAxiosPrivate from "../../api/useAxiosPrivate"
import Info from "../Inputi/Info"
import axios from 'axios'

const tagovi = ['Zdravlje', 'Fitnes', 'Ishrana', 'Trening']


const FormaDodajBlog = (props) => {

    const axiosPrivate = useAxiosPrivate()

    // const file = useRef()
    const naslov = useRef()
    const kratakOpis = useRef()
    const tekst = useRef()
    const slika = useRef()

    const [tag, setTag] = useState('')
    const [file, setFile] = useState('')
    const [data, setData] = useState('')



    const dodajBlog = async (event) => {


        // if (naslov.current.value === ''
        //     || tekst.current.value === ''
        //     || tag === ''
        //     || kratakOpis.current.value === ''
        //     || slika.current.value === '') {
        //     alert('Morate uneti sve podatke')
        //     return
        // }

        const formData = new FormData();
        formData.append('file', file);
        // formData.append('fileName', file.name);

        const base64 = await convertBase64(file);

        // console.log(data)

        // console.log(base64)

        // console.log(file)
        // console.log(formData)
        formData.append('naslov', naslov.current.value);
        formData.append('tekst', tekst.current.value);
        formData.append('tagovi', tag);
        formData.append('kratakopis', kratakOpis.current.value);


        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        // const res = await axios.post('http://localhost:8800/api/blog/upload', formData)
        // console.log(res)

        await axiosPrivate.post('http://localhost:8800/api/blog/dodajBlog', formData, {
            body: {
                naslov: naslov.current.value,
                tekst: tekst.current.value,
                // slika: slika.current.value,
                tagovi: tag,
                kratakopis: kratakOpis.current.value,
                // slika: formData
                // slika: data.image
                // slika: base64
            }
            } ).then(p => {
                if (p.status === 200) {
                    alert('Uspesno dodat blog')
                }
            }).catch((error) => {
                alert('Doslo je do greske')
                console.log('greska prilkom upisa: ' + error.message)
            });
        //  props.onClose()

    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    //labela, tip, reff, err, tekst
    //{ labela, set, niz, value }

    return (

        <Box className='cardCenter marginS' sx={{ gap: '1vh', padding: '0% 20%', alignItems: "stretch" }}>

            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>Blog</Typography>

            <Info sx={{ width: '100%' }} labela='Naslov' tip='text' reff={naslov} />
            <DropDown labela='Tag' set={setTag} niz={tagovi} value={tag} />
            <Info sx={{ width: '100%' }} multiline labela='Kratak opis' tip='text' reff={kratakOpis} />
            <Info sx={{ width: '100%' }} className='prelomi' multiline labela='Tekst' tip='text' reff={tekst} />

            <Info sx={{ width: '100%' }} labela='Slika' tip='text' reff={slika} />
            <Info sx={{ width: '100%' }} fullWidth tip='file' onChange={(ev) => { setFile(ev.target.files[0]); }} />

            <Box sx={{ alignItems: 'center' }} >
                <Button fullWidth variant='outlined' onClick={dodajBlog} >Unesi</Button>
            </Box>

        </Box>
    )
}
export default FormaDodajBlog