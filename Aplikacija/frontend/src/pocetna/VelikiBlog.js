import { useLocation, } from "react-router-dom";
import { CardMedia } from '@mui/material';

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

    return (<div>

        <h2>{blog.tagovi}</h2>

        <h1>{blog.naslov}</h1>
        <CardMedia
            component="img"
            image={blog.slika}
            alt={blog.naslov}
        />



        <div> <p>{blog.tekst}</p></div>


    </div>)
}

export default VelikiBlog