import { useState, useEffect } from 'react';
import '../../styles/blog.css'
import { GetData } from '../komponente/Fetch';


const blogovi = [{ naslov: 'naslov', text: 'text dugacak0', autor: 'mika mikic' },
{ naslov: 'naslov', text: 'text dugacak0', autor: 'mika mikic' },
{ naslov: 'naslov', text: 'text dugacak0', autor: 'mika mikic' }];

const Blog = () => {

    const [nizBlogova, setBlogovi] = useState([])
    const [greska, setGreska] = useState(false)

    useEffect(() => {
        GetData("http://localhost:8800/api/blog/vratiBlogove", setBlogovi, setGreska)
    }, [])

    const [naslov, setNaslov] = useState('Zdravlje')

    useEffect(() => {
        GetData("http://localhost:8800/api/blog/VratiBlogTag/" + naslov, setBlogovi, setGreska)
    }, [naslov])

    return (
        <div className="sviBlogovi">
            <div onClick={(ev) => { setNaslov(ev.target.value) }} className='divZaIzbor'>
                <button value='Zdravlje' className='btnBlog zdravlje'>Zdravlje</button>
                <button value='Ishrana' className='btnBlog ishrana'>Ishrana</button>
                <button value='Trening' className='btnBlog treninzi'>Trening</button>
                <button value='Fitness' className='btnBlog fitnes'>Fitnes</button>
            </div>

            <h2>{naslov}</h2>

            {greska && <p className='greska'>Doslo je do greske</p>}

            {nizBlogova
                .map((usl, i) => (
                    <div key={i} className="blog">
                        <h2 className="naslovBloga">{usl.naslov}</h2>
                        <p className="textBloga">{usl.tekst}</p>
                        <p>{usl.datum}</p>
                        {/* <span className="autorBloga">Autor: {usl.autor}</span> */}
                    </div>
                ))}
        </div >
    )

}

export default Blog