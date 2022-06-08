import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useRef } from 'react'


const Info = ({ labela, tip, reff }) => {
    return (
        <div>
            {/* <label>{labela}: */}

            <TextField
                className='loginInp'
                multiline
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


function DodajTrenera() {
  return (

    <div className="forma">
            <form className="login" >
                <h2>Dodajte trenera</h2>

                <Info multiline labela='opis' tip='text' />
                <Info multiline labela='iskustvo' tip='text' />
                <Info multiline labela='sertifikati' tip='text' />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Drzi grupne treninge" />

                {/* <Info labela='Prezime' tip='text' reff={prezime} />

                <Info labela='E-mail' tip='email' reff={email} />

                <Info labela='Username' tip='text' reff={username} />

                <Info labela='Lozinka' tip='password' reff={lozinka} />

                <Info labela='Broj telefona' tip='text' reff={brojTelefona} />
     */}

            </form>
        </div >
  )
}

export default DodajTrenera