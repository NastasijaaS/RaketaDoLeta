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
                    <h2 className="nazivUsluge">{usl.naziv}</h2>
                    <p className="opisUsluge">{usl.opis}</p>
                    <span className="cenaUsluge">Cena: {usl.cena}</span>
                </div>
            ))}
        </div >
    )
}

export default Usluge