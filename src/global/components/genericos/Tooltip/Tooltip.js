import "./Tooltip.css";

const Tooltip = ({ descripcion, data, customCss }) => {
  return (
    <div className="wrapper">
      <div className="icon">
        <div className={"tooltip noSeleccionable " + customCss}>
          <span className="tooltip-txt c-latex10 rb14m">{descripcion}</span>
        </div>
        <div className="tooltip-data" data-tooltip={descripcion}>
          {data}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
