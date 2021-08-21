import React from "react";

function Messagechatl(props) {
  return (
    <div className="msgl">
      <p className="msgtext">
        {props.item}
        <small>{props.time?.substring(11, 16)}</small>
      </p>
    </div>
  );
}

export default Messagechatl;
