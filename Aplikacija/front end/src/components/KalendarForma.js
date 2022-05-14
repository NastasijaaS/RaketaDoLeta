const KalendarForma = (props) => {
    console.log(props.id);

    const datum = new Date().getDay();
    
    return (
        <div className="kalendar">
            <div className="dani-u-nedelji">
                <span>
                    Pon
                    <button>1.</button>
                </span>
                <span>
                    Uto
                    <button>1.</button>
                </span>
                <span>
                    Sre
                    <button>1.</button>
                </span>
                <span>
                    Cet
                    <button>1.</button>
                </span>
                <span>
                    Pet
                    <button>1.</button>
                </span>
                <span>
                    Sub
                    <button>1.</button>
                </span>
            </div>
            
        </div>
    )

}
export default KalendarForma