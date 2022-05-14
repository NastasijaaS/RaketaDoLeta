
const Input = (props) => {
    return (
        <div>
            <span>{props.label}</span>
            <input {...props.input}/>
        </div>
    )
}

export default Input