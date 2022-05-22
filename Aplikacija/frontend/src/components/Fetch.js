export const GetData = async (url, setData, setError) => {

    try {
        const response = await fetch(url)

        if (response.ok) {

            const data = await response.json();
            setData(data);
        }
        else {
            throw new Error("Greska prilikom ucitavanja --- " + response.statusText);
        }
        //setIsLoading(false)
        setError(false)
    }
    catch (error) {
        setData([])
        console.log(error)
        setError(true + error)
    };
}

export const LoginMetoda = async (zahtev, dispatch, setGreska) => {
    // console.log(zahtev)
    dispatch({ tip: "LOGIN_START" });
    await fetch(zahtev.url, {
        method: "POST",
        headers: zahtev.headers,
        body: JSON.stringify(zahtev.body)
    }).then(p => {
        p.json()
            .then(data => {
                if (p.ok) {

                    dispatch({ tip: "LOGIN_SUCCESS", payload: data });
                    // console.log(data)
                }
                else if (p.status == 400) {
                    setGreska('Pogresna lozinka')
                }
                else {
                    setGreska(p.statusText)
                }
            })
    }).catch(error => {
        // setGreska('Doslo je do greske!')
        dispatch({ tip: "LOGIN_FAIL", payload: error });
        console.log(error)
    })

}

// export const PostMetoda = async (zahtev, setData, setGreska) => {
//     await fetch(zahtev.url, {
//         method: "POST",
//         headers: zahtev.headers,
//         body: JSON.stringify(zahtev.body)
//     }).then(p => {
//         p.json()
//             .then(data => {
//                 if (p.ok) {
//                    setData(data)
//                 }
//                 else if (p.status == 400) {
//                     setGreska('Pogresna lozinka')
//                 }
//                 else {
//                     setGreska(p.statusText)
//                 }
//             })
//     }).catch(error => {
//         // setGreska('Doslo je do greske!')
//         console.log(error)
//     })
// }
