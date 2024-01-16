//to add doc to our database we use this firebase function 
import {addDoc , collection , serverTimestamp} from "firebase/firestore"
//importing database reference that we created in config file 
import { db } from "../config/firebase-config"

//here we import another custom hook to get specific user info
import { useGetUserInfo } from "./useGetUserInfo"

export const  useAddTransaction =()=> {

    //providing reference to the collection we want to use inside this collection reference the 1st parameter will be the database
    // reference that we create inside our config file and the second parameter should be the collection name   
    const transactionCollectionRef = collection(db,"transactions")

//we destructure the userID from our getuserinfo hook 
const {userID} = useGetUserInfo();

//function to add transaction 
const addTransaction = async ({description,transactionAmount,transactionType}) =>  {
    // whatever data we put here inside the addDoc function of firebase will ultimateky be stored inside our database so we put the 
    //reference of our colection 
  await addDoc(transactionCollectionRef , {
    userID,
    description,
    transactionAmount,
    transactionType,
    createdAt:serverTimestamp()
  });
}

  return {addTransaction};
}
