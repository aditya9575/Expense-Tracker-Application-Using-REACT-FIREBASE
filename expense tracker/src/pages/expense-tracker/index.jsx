import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction"

import { useGetTransactions } from "../../hooks/useGetTransactions";

//here we import the styles for this page from the styles.css files
import "./styles.css";

//here we import the auth variable from our firebase config file so that we can allow the logout functionality to happen 
import { auth } from "../../config/firebase-config";

//here we import this getuserinfo hook to be able to display the name and profile picture of the user 
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";

//here we import this useNavigate hook from react-router-dom to be able to redirect the user to login page after being logged out 
import {useNavigate} from "react-router-dom"

export const ExpenseTracker = () => {

//here we destructure the addTransaction function from our custom hook 
const { addTransaction } = useAddTransaction();

//here we destructure transactions function from our custom hook which ultimately gets the list of transactions 
//and we also destructure the transaction totals from our custom hook to reflect the changes in our total balance of our application 
const { transactions , transactionTotals } = useGetTransactions();

//here we destructure user info from this custom hook
const {name , profilePhoto} = useGetUserInfo();

//here we destructure useNavigate hook to be used for redirection purposes 
const navigate = useNavigate();

//Now we make use of useState hook to add in the data that the user enters in the form to our database 
//NOW the thing we want to do to update the value is whenever there is a change in their respective input fields 
//we grab THEIR EVENT.TARGET.VALUE and assign it to the SET METHOD OF THE USE STATE HOOK FOR THEIR ReSPECTIVE STATES 
const [description , setDescription] = useState("");
const [transactionAmount , setTransactionAmount] = useState(0);
const [transactionType , setTransactionType] = useState("expense");


//we destructure the balance, income , expenses from our transactionTotals to be used seprately and easily
const {balance , income , expenses } = transactionTotals;

const onSubmit = (e) => {
e.preventDefault();

//we test this addTransaction with some fake data 
// addTransaction({description:"Haircut" , transactionAmount:22 , transactionType:"expense"})

//as we handled the data fetching part from the form we now just pass in the values and not some hardcoded testing data 
addTransaction({description, transactionAmount , transactionType});

//here we apply useState hook to make the values of input fields as empty after hitting the add transaction button 
setDescription("");
setTransactionAmount("");

}

//we now create a logout functionality 
const signUserOut = async() =>{
//inside this sign out functionality we use the ---> sign out function from firebase to perform this functionality 
try {
    await signOut(auth);
    //if there is no error in triggering this signout function it means we need to clear the local storage and 
    //then we need to navigate to our login page using the use navigate hook so import navigate at the top 
    localStorage.clear();
    navigate("/");
} catch (error) {
    console.error(error)
}
 
}

    return( 

<>
    <div className="expense-tracker">
        
        <div className="container">

<h1>{name}'s Expense Tracker </h1>

{/* to display balance  */}
<div className="balance">
    <h3>Your Balance :</h3>
    {balance >=0 ? <h2>₹{balance}</h2> : <h2>-₹{balance * -1}</h2> }
    
</div>

{/* to display summary of the balance  */}
<div className="summary">
    <div className="income">
        <h4>Income </h4>
        <p>₹{income}</p>
    </div>
    <div className="expenses">
        <h4>Expenses </h4>
        <p>₹{expenses}</p>
    </div>
</div>

{/* form to add expense / income and make it reflect in our balance  */}
<form className="add-transaction" onSubmit={onSubmit}>
 
 <input type="text" placeholder="Description" value={description} required  onChange={(e)=>setDescription(e.target.value)}/>
 
 <input type="number" placeholder="Amount" value={transactionAmount} required  onChange={(e)=>setTransactionAmount(e.target.value)}/>

 
 <input type="radio" id="expense" value="expense" onChange={(e)=>setTransactionType(e.target.value)} checked={transactionType === "expense"} />
 <label htmlFor="expense">Expense</label>


 <input type="radio" id="income" value="income" onChange={(e)=>setTransactionType(e.target.value)} checked={transactionType === "income"}/>
 <label htmlFor="income">Income</label>

<button type="submit">Add Transaction</button>

</form>

        </div>

{/* here we set up our profile picture to be displayed from the id  */}
{profilePhoto && (
          <div className="profile">
          {/* this is to display the user image with the already applied css in our styles.css file  */}
               <img className="profile-photo" src={profilePhoto}/>
          {/*this is to add a signout / logout button below the image also with the already applied css styles and also we add an 
           event listener -> button click that triggers a function that ultimately signs out the current user   */}
               <button className="sign-out-button" onClick={signUserOut}> Sign Out</button>
          </div>
)}


    </div>  

 {/*now we display the list of expenses  */}
 <div className="transactions">
<h3>Transactions:-</h3>
<ul>
    {transactions.map((transaction) =>{

//WE HERE DESTRUCTURE THE ITEMS FROM OUR TRANSACTIONS LIST 
const {description, transactionAmount , transactionType} = transaction;

        return(
            <li>
                <h4> {description} </h4>
               <p>
                 {""}
                 ₹{transactionAmount} . <label style={{color: transactionType === "expense" ? "red" : "green"}}> {transactionType} </label>
                 </p>
            </li>
        )
    })}
</ul>
 </div>

</>   
    
    
    )}