import "./Input.css";
import InputDate from "./InputDate";
import InputError from "./InputError";
import InputHeader from "./InputHeader";
import { useEffect, useState } from "react";

const Input = ({
  onClick,
  value,
  name,
  headerStr,
  placeholderText,
  errorStr,
  inputType = "text",
  linkStr,
  autocomplete = "off",
  isRequired,
  onChange,
  onClickChangePassword,
  onKeyPress,
  maxLength,
  checkboxStr,
  className,
  labelStr,
  nombreRadio,
  desactivado,
  checkError,
  checked,
  deshabilitaFormulario,
  inputMode,
  pattern,
  refElement,
  radioClass,
  letterColor
}) => {
  const [showError, setShowError] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  
  const [requerido, setRequerido] = useState(false);

  useEffect(() => {
    setShowError(checkError);
    if (!checkError) {
      setIsUsed(false);
    }
  }, [checkError]);

  useEffect(() => {
    if (isRequired !== undefined) {
      setRequerido(isRequired);
    }
  }, [isRequired]);

  const doOnChange = (e) => {
    onChange(e);
    setIsUsed(true);
  };

  const checkBlur = (e) => {
    
  };

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

  if (placeholderText) placeholderText = "ej: " + placeholderText;
  const render = (tipo) => {
    switch (tipo) {
      case "text":
      case "number":
      case "password":
      case "email":
      case "select":
        return (
          <>
            {/*agregue un div para mantener el espacio del error*/}
            <div>
              <InputHeader headerStr={headerStr} />
              <div className="ptur-inputContainer">
                <input
                  ref={refElement}
                  name={name}
                  type={inputType}
                  className={
                    !checkMostrarError()
                      ? className
                      : className + " ptur-input-borderError"
                  }
                  placeholder={placeholderText}
                  autoComplete="off"
                  required={isRequired}
                  onChange={doOnChange}
                  style={{
                    width: "100%",
                    height: 36,
                    paddingLeft: 8,
                    color: deshabilitaFormulario
                      ? "var(--color-grey45)"
                      : letterColor,
                  }}
                  onKeyPress={onKeyPress}
                  value={value}
                  maxLength={maxLength}
                  disabled={desactivado || deshabilitaFormulario}
                  onBlur={checkBlur}
                  inputMode={inputMode}
                  pattern={pattern}
                />
                <InputError
                  onClickChangePassword={onClickChangePassword}
                  errorStr={checkMostrarError() ? errorStr : ""}
                  linkStr={linkStr}
                />
              </div>
            </div>
          </>
        );
      case "fecha":
        return (
          <>
            <div>
              <InputHeader headerStr={headerStr} />
              <InputDate
                placeholderText={placeholderText}
                onChange={onChange}
                className={className}
              ></InputDate>
              <InputError errorStr={errorStr} linkStr={linkStr} />
            </div>
          </>
        );
      case "check":
        return (
          <>
            <input
              type="checkbox"
              className="checkBox"
              onChange={onChange}
              id={"check" + name}
              checked={checked}
              onClick={onClick}
              name={name}
              autoComplete="off"

            />{" "}
            <label
              className="ptur-label-checkbox rb16t c-white"
              htmlFor={"check" + name}
            >
              {checkboxStr}
            </label>
          </>
        );
      case "radio":
        return (
          <>
            <input
              className="radio"
              type="radio"
              id={"radio" + name}
              name={nombreRadio}
              defaultChecked={checked}
              onChange={onChange}
              defaultValue={value}
              // checked={checked}
              autoComplete="off"

            />
            <label
              className={`ptur-label-radio ${radioClass} rb16l`}
              // htmlFor={"radio" + name}
            >
              {labelStr}
            </label>
            <InputError
              errorStr={checkMostrarError() ? errorStr : ""}
              linkStr={linkStr}
            />
          </>
        );
      case "textarea":
        return (
          <>
            <textarea
              className={className}
              name={name}
              placeholder={placeholderText}
              onChange={onChange}
              value={value}
              maxLength={maxLength}
            >
              {value}
            </textarea>
          </>
        );
      default:
        return <></>;
    }
  };
  return <div className="input">{render(inputType)}</div>;
};

export default Input;
