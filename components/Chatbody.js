import React from "react";
import { Avatar } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import PaymentIcon from "@material-ui/icons/Payment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { db, auth } from "../firebase";
import MicIcon from "@material-ui/icons/Mic";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useRef } from "react";
import { Message, VoiceChat } from "@material-ui/icons";
import Messagechat from "./Messagechat";
import Messagechatl from "./Messagechatl";

// speech Recorgnition setup

// speechrecorgnition=SpeechRecognition
let mic;
let SpeechRecognition;

function Chatbody() {
  const [state, setstate] = useState("");
  const [msgbox, setmsgbox] = useState(" ");
  const [user] = useAuthState(auth);
  const inutref = useRef(0);
  const deel = useRef(0);
  const [chatsdb, setchatsdb] = useState([]);
  const [temppic, settemppic] = useState();
  const [pic, setpic] = useState();

  let location = window.location.href.substring(37);

  // let location = window.location.href.substring(27);
  useEffect(() => {
    SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    mic = new SpeechRecognition();

    mic.continuous = true;
    // mic.interimResults=true;
    mic.lang = "en-IN";
  }, []);

  useEffect(() => {
    const getdata = async () => {
      await db
        .collection("chats")
        .doc(location)
        .get()
        .then((doc) => {
          setstate(doc?.data().users[1]);
          picurl(doc?.data()?.users[1]);
        });
    };

    const picurl = async (nametemp) => {
      await db
        .collection("users")
        .doc(nametemp)
        ?.get()
        .then((doc) => {
          setpic(doc?.data());
          //  settemppic(doc?.data()?.photourl);
        });
    };

    getdata();
  }, [location]);

  useEffect(() => {
    const getchatfromdb = async () => {
      db.collection("chats")
        .doc(location)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setchatsdb(snapshot?.docs);
          //  console.log(snapshot.docs);
        });

      // db.
      // collection("chats")
      // .doc(location)
      // .collection("messages").orderBy('timestamp','asc').get()
      // .then(el=>{
      //   setchatsdb(el.docs);
      // })

      //  console.log(chatsdb);
    };
    getchatfromdb();

    deel.current.scrollIntoView({ behavior: "smooth" });
  }, [location, db]);

  const msgsend = (e) => {
    e.preventDefault();

    db.collection("chats").doc(location).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: msgbox,
      user: user.email,
    });

    db.collection("chats")
      .doc(state + user.email)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: msgbox,
        user: user.email,
      });

    // accesing dom elemensts through use ref
    inutref.current.focus();
    inutref.current.value = "";

    setmsgbox(" ");

    deel.current.scrollIntoView({ behavior: "smooth" });
  };

  const setfun = (event) => {
    setmsgbox(event.target.value);
  };

  // speech recorgnition
  let status = 0;

  const voice = () => {
    if(status)console.log("mic is already start");
    else {

      status = 1;
      if (status) {
        mic.start();
  
        mic.onspeechend = () => {
          mic.stop();
          status = 0;
        };
        mic.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          console.log(transcript);
  
          inutref.current.focus();
          inutref.current.value =
            " " + inutref.current.value + " " + transcript + " ";
          setmsgbox(" " + msgbox + " " + transcript + " ");
  
          mic.stop();
          status = 0;
        };
      }

    }

  
  };

  return (
    <div className="Chatbodycontainer">
      <div className="bodyheader">
        <div className="bodyheaderleft">
          <Avatar
            className="Avatar"
            alt={state ? state : ""}
            src={pic?.photourl}
          />

          <p>{state?.substring(0, state.search("@"))} </p>
        </div>
        <div className="bodymid">
          <small className="lastseen">
            Last Seen:{" "}
            {pic?.lastseen.toDate().toLocaleTimeString().substring(0, 5)}{" "}
          </small>
        </div>
        <div className="bodyheaderright">
          <AttachFileIcon className="icon" />
          <PaymentIcon className="icon" />
          <MoreVertIcon className="icon" />
        </div>
      </div>

      <div className="chatscreen">
        {chatsdb.map((el) =>
          el?._delegate?._document?.data?.value.mapValue.fields.user
            .stringValue == user.email ? (
            <Messagechat
              item={
                el._delegate?._document?.data?.value.mapValue.fields.message
                  .stringValue
              }
              time={
                el._delegate?._document?.data?.value.mapValue.fields.timestamp
                  .timestampValue
              }
            />
          ) : (
            <Messagechatl
              item={
                el?._delegate?._document?.data?.value.mapValue.fields.message
                  .stringValue
              }
              time={
                el._delegate?._document?.data?.value.mapValue.fields.timestamp
                  .timestampValue
              }
            />
          )
        )}

        {<Messagechat />}
        <div ref={deel}></div>
      </div>

      <form action="">
        <div className="chattype">
          <div className="emojie">
            <InsertEmoticonIcon className="icon emoji" />{" "}
          </div>
          <div className="inputtext">
            <input
              type="text"
              ref={inutref}
              onChange={(event) => setfun(event)}
              className="msgtype"
            />
          </div>
          <div className="icon inputmic" onClick={voice}>
            <abbr title="click speak and send">
              {" "}
              <MicIcon />
            </abbr>
            {/* <voice /> */}
          </div>
        </div>
        <button hidden disabled={!msgbox} onClick={msgsend} type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default Chatbody;
