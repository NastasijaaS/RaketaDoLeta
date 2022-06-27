import { Button } from "@mui/material"
import { useState } from "react"
import FormaDodajBlog from "../../komponente/FormaDodajBlog"
import Modal from "../../komponente/Modal"

const Blogovi = () => {

    const [dodajBlog, setDodajBlog] = useState(false)

    return (
        <>
            {dodajBlog &&
                <Modal onClose={() => { setDodajBlog(false) }}>
                    <FormaDodajBlog onClose={() => { setDodajBlog(false) }} />
                </Modal>
            }

            <Button onClick={() => setDodajBlog(true)}>novi blog</Button>


        </>
    )
}
export default Blogovi