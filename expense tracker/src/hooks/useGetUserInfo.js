export const useGetUserInfo = () => {

    //JSON.parse method basically transforms the stringified object back into an object and its basically does the opposite of what
    // the JSON.stringify() function does i.e-> it converts a javascript object into a json string
    //we passed in auth as the key as this is what we called when we setItem 
  const { name, profilePhoto, userID, isAuth } = JSON.parse(
    localStorage.getItem("auth")
  );


  //as we want to return the data seprately -> 
  return {name , profilePhoto , userID , isAuth};
};
