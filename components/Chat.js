import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useRouter } from "next/dist/client/router";
import { db } from "../firebase";

function Chat({ name, id }) {
  const router = useRouter();
  const letter = name.substring(0, 1).toUpperCase();
const [pic, setpic] = useState();
  const enterChat = () => {

    router.push(`/chat/${id}`);

    //redirecting the page to chat page
  };

  useEffect(() => {
   
    const picurl=async()=>{
 await db.collection("users").doc(name).get()
.then((doc)=>{
  setpic(doc.data());
})
     
      }
    picurl();

  }, [])

  return (
    <div className="individualchat" onClick={enterChat}>
      <Avatar
        className="Avatar"
        alt={letter?letter:""}
        src={pic?.photourl?pic?.photourl:"/static/images/avatar/1.jpg"} 
      />
      <p className="chatnames">{name.substring(0,name.search('@'))}</p>
    </div>
  );
}

export default Chat;

// server side rendering .....means the chats will be fetched on server
// export async function getServerSideProps(context) {
//   const ref = db.collection("chats").doc(context.query.id);

  // prep the msges ons server

//   const messagesRes = await ref
//     .collection("messages")
//     .orderBy("timestamp", "asc")
//     .get();
//     const messages=messagesRes.docs.map(doc=>({
//       id:doc.id,
//       ...doc.data(),
//     })).map(messages=>({
//       ...messages,
//       timestamp:messages.timestamp.toDate().getTime() //when we do api call we loose out timestamp datatype..so we are manipulating it
//     }))

//     //prep the chats
//     const Chatrefs=await ref.get();
//     const chat={
//       id:chatRes.id,
//       ...chatRes.data()
//     }
//     console.log(chat,messages);
//     return {
//       props:{
//         messages:JSON.stringify(messages),
//         chat:chat
//       },
//     }
// }
