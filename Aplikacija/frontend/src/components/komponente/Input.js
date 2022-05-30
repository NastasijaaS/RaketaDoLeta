
const Input = (props) => {
    return (
        <div className={props.ime}>
            <label>{props.label}: </label>
            <input {...props.input}></input>
        </div>
    )
}
export default Input