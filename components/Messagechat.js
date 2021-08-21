function Messagechat(props) {
  return (
    <div className="msgr">
      <p className="msgtext">
        {props.item}
        <small>{props.time?.substring(11, 16)}</small>
      </p>
    </div>
  );
}

export default Messagechat;
