import RasporedTrener from "../../komponente/RasporedTrener";
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import { UserContext } from "../../context/UserContext";
import Loading from '../../komponente/Loading'
import { CircularProgress, Box } from '@mui/material'

const OdbijeniTreninzi = () => {

    const axiosPrivate = useAxiosPrivate()
    const { user } = useContext(UserContext)
    const [treninzi, setTreninzi] = useState([])
    const [loading, setIsLoading] = useState(false)

    const rowGrupni = ['Vreme', 'Trajanje', 'Intenzitet', 'Mesta']


    useEffect(() => {
        const get = async () => {
            try {
                setIsLoading(true)
                const res = await axiosPrivate.get("http://localhost:8800/api/trening/vratiProsleTreninge/" + user.trenerId)
                console.log(res)
                if (res.data) {
                    setTreninzi(res.data)
                }
                setIsLoading(false)

            }
            catch (err) {
                setIsLoading(false)

            }
        }
        get()
    }, [])

    if (loading) {
        return <Box className='cardCenter' ><CircularProgress size='2rem' /> </Box>
    }
    return (
        <Box className = "cardCenter marginS">
            <Typography gutterBottom component="div" variant="h4" textAlign="center">Prosli treninzi</Typography>
            <RasporedTrener prosli={true} treninzi={treninzi} />
        </Box>
        
    )

}
export default OdbijeniTreninzi