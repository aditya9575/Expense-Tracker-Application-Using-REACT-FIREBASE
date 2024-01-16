import { auth,provider } from "../../config/firebase-config";

//importing functions from firebase
import {signInWithPopup} from "firebase/auth";

//for redirection to expense tracker page after successful authentication we use -> navigate functionality 
import { useNavigate } from "react-router-dom";

//here we import the styles for this page from the styles.css files
import "./styles.css";


export const Auth = () => {

//destructuring from the useNavigate hook 
const navigate = useNavigate();

const signInWithGoogle = async() =>{
  //it will call a part of our firebase package 
  //these results will be including of the user that signed in that we can use later on 
const results = await signInWithPopup(auth,provider);

const authInfo = {
  userID: results.user.uid,
  name:results.user.displayName,
  profilePhoto:results.user.photoURL,
  isAuth:true,
}

//now as we have our user info in our results tab we will now store some info into our localstorage and as we can't directly store 
//object in our local storage we will use json.stringify method and then store 
localStorage.setItem("auth" , JSON.stringify(authInfo));

//and now if we console the results this should be working 
console.log(results);

//this will redirect the user to the expense-tracker page 
navigate("/expenseTrackerPage");
}

  return <div className="login-page">
  <p>Sign In With Google To Continue.</p>
  <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign In With Google</button>
  
      </div>
  
}