import { Button, Typography} from "@mui/material"
import { Box } from "@mui/system"
import Info from "./Info"


const FormaDodajBlog = () => {


    return (

        <Box className='cardCenter marginS' sx={{ gap: '1vh', padding: '0% 20%', alignItems: "stretch", display: 'flex', flexDirection: 'column' }}>
           
            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>Blog</Typography>
        

            {/* <Info multiline labela='naslov' tip='text' reff = 'naslov' eff = 'naslov' tekst = 'naslov'  /> */}
            {/* <Info multiline labela='kratakopis' tip='text'  />
            <Info multiline labela='tekst' tip='text' />

            <Info labela='slika' tip='text'/> */}
             
         
            <Box sx={{ alignItems: 'center' }}>
                <Button fullWidth variant = 'outlined' >Unesi</Button>
            </Box>

        </Box>
    )
}
export default FormaDodajBlog