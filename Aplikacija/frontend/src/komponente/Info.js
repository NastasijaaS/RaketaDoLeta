import { TextField } from "@mui/material";


const Info = ({ labela, tip, reff, err, tekst }) => {
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
                focused />
        </div>
    )
}

export default Info;