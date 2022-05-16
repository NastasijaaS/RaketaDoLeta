import '../styles/usluge.css'

//naziv
//opis
//cena
const nizUsluga = [{ naziv: 'naziv', opis: 'opis dugacak0', cena: 222 },
{ naziv: 'naziv', opis: 'opis dugacak0', cena: 222 },
{ naziv: 'naziv', opis: 'opis dugacak0', cena: 222 }];

const Usluge = () => {
    return (
        <div className="sveUsluge">
            {nizUsluga.map((usl, i) => (
                <div key={i} className="usluga">
                    <span className="nazivUsluge">{usl.naziv}</span>
                    <span className="cenaUsluge">Cena: {usl.cena}</span>
                </div>
            ))}
        </div >
    )
}

export default Usluge