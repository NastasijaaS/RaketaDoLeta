import { TextField } from "@mui/material";


const Info = ({ labela, tip, reff }) => {
    return (
        <div>
            {/* <label>{labela}: */}

            <TextField
                className='loginInp'
                inputRef={reff}
                label={labela}
                type={tip}
                color="primary"
                size="small"
                placeholder={labela}
                focused />

            {/* <input className='loginInp' ref={reff}
                    type={tip} placeholder={labela} /> */}
            {/* </label> */}
        </div>
    )
}

export default Info;