import "./Input.css";
const InputError = ({ errorStr, linkStr, onClickChangePassword }) => {
  return (
    <h5 className="rb12m c-danger" style={{ marginTop: 4 }}>
      {errorStr&& <span className="input-errorstr">{errorStr}</span>}
      {linkStr && (
        //eslint-disable-next-line
        <a
          onClick={onClickChangePassword}
          className="rb14m c-purple pointer"
          id="ptur-login-password-linkStr"
          style={{ marginLeft: 6, float: "right" }}
        >
          <u>{linkStr}</u>
        </a>
      )}
    </h5>
  );
};
export default InputError;
