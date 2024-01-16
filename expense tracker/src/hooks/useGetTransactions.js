import { query , orderBy, onSnapshot ,where} from "firebase/firestore";
import { useEffect, useState } from "react";

//we import collection from firebase and db from our firebase-config
import { collection } from "firebase/firestore";
import { db } from "../config/firebase-config";

//to have access to the user id here we import the getuserinfohook we created before and then we destructure the userID from it 
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {

//we make this state to keep in track of the new transactions made by the user 
const [transactions, setTransactions] = useState([]);

//we make this to keep a track of the transactions total in this case its going to be an object 
const [transactionTotals, setTransactionTotals] = useState({balance:0.0 , income:0.0 , expenses:0.0});




// now we create a reference to the collection we made 
//providing reference to the collection we want to use inside this collection method of firestore reference the 1st parameter will be 
// the database reference that we create inside our config file and the second parameter should be the collection name   
const transactionCollectionRef = collection(db, "transactions");

const {userID} = useGetUserInfo();

//now we create a function to retrive transactions
const getTransactions = async () => {

    let unsubscribe ;

try {

    // we start by using the query method of our firestore to query over the collections inside our database and the
    // 1st parameter used inside this query method should be the "referenceName of the collection that we want to query on"
    // 2nd parameter is the condition to query and what to query according to firebase querying syntax
    // remember as we don't have the access to the userID till here so we will import it from the hook we created to fetch the user id
    //we use the orderBy function to dilever the results in a orderly manner according to our conditional inside it 
    const queryTransactions = query(transactionCollectionRef , where("userID" , "==" , userID) , orderBy("createdAt"));
  
//now we make the use of onSnapshot() functinality that comes from firebase and will basically keep tracking a query if there are 
//any changes to it / in it 
// [inside it we pass in the query name to be tracked so our ->queryTransactions , and our function (snapshot)]
     unsubscribe =  onSnapshot(queryTransactions , (snapshot)=>{

//we make this array to store the list of the documents / transactions made by the user and inside the looping we use .push to
// push the final document data as needed i.e => id and rest of the data 
let docs = [];

//here we are calculating the total income and expenses to be dealt with accordingly 
let totalIncome = 0;
let totalExpenses = 0;

        snapshot.forEach((doc)=>{
const data = doc.data();
const id = doc.id

docs.push({...data, id});

//here we calculate the results according to the transactions to be reflected in the balance 
if(data.transactionType === "expense"){
    totalExpenses += Number(data.transactionAmount);
}else{
    totalIncome += Number(data.transactionAmount);
}

        });

        //here when snapshot is done we are assigning the setTransactions to the variable containing the right data which is docs 
        setTransactions(docs);

        //below the setting up of our transactions we also set up our transaction totals 
        let balance = totalIncome - totalExpenses;
        setTransactionTotals({
            balance,
            expenses:totalExpenses,
            income:totalIncome
        })

    })

} catch (error) {
    console.error(error);
}

return () => unsubscribe();
}

//we call in the useState hook here so that the getTransactions function automatically gets triggered whenever the transaction 
//is being created 

useEffect(()=>{
    getTransactions()
} , []);

  return { transactions , transactionTotals };
};
