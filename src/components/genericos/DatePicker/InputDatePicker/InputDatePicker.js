import "./InputDatePicker.css";
// import MiTurnoIcon from "../../../../assets/images/generico/MiTurnoIcon";
import { useEffect, useState } from "react";
import InputError from "../../Input/InputError";

const InputDatePicker = ({
  headerStr,
  calendarShow,
  setCalendarShow,
  fechaSelected,
  customCss,
  disable,
  errorStr,
  linkStr,
  checkError,
  deshabilitaFormulario,
  isRequired,
}) => {
  const [showError, setShowError] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const [requerido, setRequerido] = useState(false);

  useEffect(() => {
    if (isRequired !== undefined) {
      setRequerido(isRequired);
    }
  }, [isRequired]);

  useEffect(() => {
    setShowError(checkError);
    if (!checkError) {
      setIsUsed(false);
    }
  }, [checkError]);

  const checkMostrarError = () => {
    let flag = false;
    if (requerido && !deshabilitaFormulario) {
      if (isUsed && showError) flag = true;
      //se elimino el blur momentaneamente
      // if (isBlur && !isUsed) flag = true;
      if (showError) flag = true;
    }
    return flag;
  };

  // cambia el estado del calendar
  const handleClickShowCalendar = () => {
    if (!calendarShow) {
      setCalendarShow(true);
    } else setCalendarShow(false);
  };

  // variables importantes
  let fecha = fechaSelected.fechaSelected.split(" ");
  let isSelected = fechaSelected.select;

  return (
    //ptur-InputDate-inputBox
    <div className="input">
      <div className="ptur-InputDate-headerText">
        <span className="rb14m">{headerStr}</span>
      </div>
      <div
        className={
          isSelected && !disable
            ? `ptur-InputDate-container-selected  ${customCss}`
            : `ptur-InputDate-container ${customCss} ${
                disable ? "cursorDisable" : ""
              } ${!checkMostrarError() ? "" : "ptur-input-borderError"}`
        }
        onClick={disable ? () => {} : handleClickShowCalendar}
      >
        {/* <MiTurnoIcon
          color={
            isSelected && !disable
              ? "var(--color-purple)"
              : "var(--color-grey45)"
          }
          clase={"ptur-InputDate-container-svg"}
        /> */}
        {`${fecha[2]}/${fecha[1]}/${fecha[0]}`}
      </div>
      {checkMostrarError() ? (
        <InputError
          errorStr={checkMostrarError() ? errorStr : ""}
          linkStr={linkStr}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default InputDatePicker;
