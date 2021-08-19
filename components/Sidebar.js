import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
// npm i email-validator  : just to validate email
import * as EmailValidator from "email-validator";
import { db, auth } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "./Chat";
import { Router } from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";








function Sidebar() {
  const router= useRouter();//next.js way to get a router--->in order to direct the user to desired selected eamil chat 

  const [user] = useAuthState(auth);
  const userchatref = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userchatref);
  const createchat = () => {
    let chatname = prompt("enter valid email of person you wanna connect");
    if (!chatname) return null;
    chatname= chatname.toLowerCase();
    if (
      EmailValidator.validate(chatname) &&
      // !chatalreadyexisitcheck(chatname) &&
      chatname !== user.email
    ) {
      // add the chats in the db "chats" if it doesnt already exists
      const s1=toString(user.email)+toString(chatname);
      db.collection("chats").doc(user.email+chatname).set({
        users: [user.email, chatname],
      });
    } else alert("Invalid/your own's Email..Try Again");
  };

  const chatalreadyexisitcheck = (recipientEmail) => 
    // this is gonna search the dstabase for that chatof recipientEmails....thiscould return either chat or undefined or null
    // so we need to convert everything into boolean either true or false..therefore !! is used
    !!chatsSnapshot?.docs.find(
      (chats) =>
        chats.data().users.find((user) => user === recipientEmail)?.length > 0
    );


  return (
    <div className="sidebar">
      <div className="header">
        <div className="headerleft">
          <Avatar
            className="Avatar"
            alt="P"
            src={user.photoURL}
          />
        </div>
        <div className="headerright">
          <abbr title="">
            <MessageRoundedIcon className="icon" />
          </abbr>
          <abbr title="MoreOptions">
            <MoreVertIcon className="icon" />
          </abbr>
          <abbr title="LogOut">
            <ExitToAppRoundedIcon
              onClick={() => auth.signOut()}
              className="icon"
            />
          </abbr>
        </div>
      </div>
      <div className="searchbox">
        <SearchIcon className="search" />
        <input type="text" placeholder="search chat" />
      </div>
      <div className="chatlist">
        <AddCircleOutlineRoundedIcon onClick={createchat} className="addicon" />
        <p>chat</p>
      </div>
      {/* now we are going to pull all the 1-1 chat list present in the database and display it */}
    
   
      <div className="displaychats">
      {
        chatsSnapshot?.docs.map(el=>(
          el.data().users[0]==user.email?
          <Chat name={el.data().users[1]} id={el.id}  />:console.log({user})
        ))
       }
       
      </div>
       
     
     
   
    </div>
  );
}

export default Sidebar;
