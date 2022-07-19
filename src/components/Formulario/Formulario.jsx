function Formulario(props) {
    return (
      <div className="mb-3">
        <label htmlFor={props.id} className="form-label">
          {props.label}
        </label>
        <input
          name={props.name}
          type={props.type}
          className="form-control"
          id={props.id}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
        />
      </div>
    );
  }
  
  export default Formulario;