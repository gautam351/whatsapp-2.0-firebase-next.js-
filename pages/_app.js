import "../styles/globals.css";
import "../styles/sidebar.css";
import "../styles/login.css";
import "../styles/Chat.css"
import "../styles/[id].css"

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./Login";
import Loading from "../components/Loading";
import firebase from "firebase";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [user,loading] = useAuthState(auth);
useEffect(() => {
  if(user){ //if there is a user then go on and do following
    db.collection("users").doc(user.email).set(
      {
        email:user.email,
        lastseen:firebase.firestore.FieldValue.serverTimestamp(),
        photourl:user.photoURL,
      },
      {merge:true} //doesnt change all data just merge these fields
      
    );
  }
}, [user]);

 
  if(loading) return <Loading />
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
