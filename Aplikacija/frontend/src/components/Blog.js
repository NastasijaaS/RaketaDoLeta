import { useState } from 'react';
import '../styles/blog.css'


const blogovi = [{ naslov: 'naslov', text: 'text dugacak0', autor: 'mika mikic' },
{ naslov: 'naslov', text: 'text dugacak0', autor: 'mika mikic' },
{ naslov: 'naslov', text: 'text dugacak0', autor: 'mika mikic' }];

const Blog = () => {

    const [naslov, setNaslov] = useState('Zdravlje')

    const promeniDugme = (ev) => {
        setNaslov(ev.target.value)

        //console.log(ev.target.value)

        //baza
   
    }

    return (
        <div className="sviBlogovi">
            <div  onClick = {promeniDugme}  className='divZaIzbor'>
                <button value = 'Zdravlje' className='zdravlje'>Zdravlje</button>
                <button value = 'Ishrana' className='ishrana'>Ishrana</button>
                <button value = 'Treninzi' className='treninzi'>Treninzi</button>
                <button value = 'Bodi' className='bodi'>bodi bilding</button>
            </div>

            <h2>{naslov}</h2>

            {blogovi
                .map((usl, i) => (
                    <div key={i} className="blog">
                        <h2 className="naslovBloga">{usl.naslov}</h2>
                        <p className="textBloga">{usl.text}</p>
                        <span className="autorBloga">{usl.autor}</span>
                    </div>
                ))}
        </div >
    )

}

export default Blog