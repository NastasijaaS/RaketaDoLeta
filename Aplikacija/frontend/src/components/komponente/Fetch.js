
import { touchRippleClasses } from '@mui/material';
import { LoginSuccess, LoginFailure, LoginStart } from '../../context/UserActions.js'

export const GetData = async (url, setData, setError, setIsLoading) => {

    setIsLoading(true)
    try {
        const response = await fetch(url)
        // console.log(response)

        if (response.ok) {

            const data = await response.json();
            console.log(data)
            setData(data);
        }
        else {
            throw new Error("Greska prilikom ucitavanja --- " + response.statusText);
        }
        setIsLoading(false)
        setError(false)
    }
    catch (error) {
        setIsLoading(false)
        setData([])
        console.log(error)
        setError(true + error)
    };
}

export const LoginMetoda = async (zahtev, dispatch) => {
    // console.log(zahtev)

    dispatch(LoginStart())

    await fetch(zahtev.url, {
        method: "POST",
        headers: zahtev.headers,
        body: JSON.stringify(zahtev.body)
    }).then(p => {
        p.json()
            .then(data => {
                if (p.ok) {

                    dispatch(LoginSuccess(data))
                }
                else if (p.status == 400) {
                    dispatch(LoginFailure('Pogresna lozinka'))
                }
                else {
                    dispatch(LoginFailure(p.statusText))
                }
            })
    }).catch(error => {
        dispatch(LoginFailure(error))
        console.log(error)
    })

}

export const PostMetoda = async (zahtev, setData, setGreska) => {
    await fetch(zahtev.url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(zahtev.body)
    }).then(p => {
        p.json()
            .then(data => {
                if (p.ok) {
                    setData(data)
                }
                else if (p.status == 404) {
                    setGreska('Ne postoji')
                }
                else {
                    setGreska(p.statusText)
                }
            })
    }).catch(error => {
        // setGreska('Doslo je do greske!')
        console.log(error)
    })
}

export const PutMetoda = async (zahtev, setData, setGreska, setIsLoading) => {
    setIsLoading(true)
    setGreska(false)

    await fetch(zahtev.url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(zahtev.body)
    }).then(p => {
        p.json()
            .then(data => {
                if (p.ok) {
                    setData(data)
                    setIsLoading(false)
                    setGreska(false)
                }
                else if (p.status == 404) {
                    setGreska('Ne postoji')
                    setIsLoading(false)
                }
                else {
                    setIsLoading(false)
                    setGreska(p.statusText)
                }
            })
    }).catch(error => {
        setIsLoading(false)
        setGreska('Doslo je do greske!')
        console.log(error)
    })
}

export const DeleteMetoda = async (zahtev, setGreska, setIsLoading) => {
    setIsLoading(true)
    setGreska(false)

    await fetch(zahtev.url, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(zahtev.body)
    }).then(p => {
        p.json()
            .then(data => {
                if (p.ok) {

                    console.log(p)
                    // setData(data)
                    setIsLoading(false)
                    setGreska(false)
                }
                else if (p.status == 404) {
                    setGreska('Ne postoji')
                    setIsLoading(false)
                }
                else {
                    setIsLoading(false)
                    setGreska(p.statusText)
                }
            })
    }).catch(error => {
        setIsLoading(false)
        setGreska('Doslo je do greske!')
        console.log(error)
    })
}