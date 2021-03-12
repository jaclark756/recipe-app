export interface User {

    userId?: string;
    username?: string;
    bio?: string;
    profileImageUrl?: string;

}


// POST /user

// {

//    'userId': "String", <-- name subject to change based on openId attrs

//    'username': "String", <-- must be unique

//    'bio': "String",

//    'profileImageUri': "String" <-- update to use openId in future

// }



// GET /user

// returns list of all usernames and ids



// GET /user?{id}

// returns all information for {id} user

