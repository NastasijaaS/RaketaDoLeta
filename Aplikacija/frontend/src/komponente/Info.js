import { TextField } from "@mui/material";


const Info = (props) => {
    const { labela, tip, reff, err, tekst } = props
    return (
        <div>
            <TextField
                sx={{ maxWidth: 300 }}
                error={err}
                className='loginInp'
                inputRef={reff}
                label={labela}
                type={tip}
                color="primary"
                size="small"
                placeholder={tekst}
                // helperText={tekst}
                {...props}
                />
        </div>
    )
}

export default Info;