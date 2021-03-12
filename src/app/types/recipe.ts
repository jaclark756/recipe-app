export interface Recipe {
    id?: number;
    userId?: string;
    ingredients?: string;
    instructions?: string;
    recipeName?: string;
    imageUri?: string;
    cookTime?: number;
    prepTime?: number;
}

// POST /recipe

// {

//    'ingredients': "String", <-- upgrade to by-id in future

//    'instructions': "String", <-- upgrade to component in future

//    'recipeName': "String",

//    'imageUri': "String",

//    'cookTime': int{minutes},

//    'prepTime': int{minutes},

//    'userId': "String" <-- can be plain text for now, will swap out for OAuth later

// }



// GET /recipe

// returns list of all recipe names and recipeIds



// GET /recipe?{id}

// returns all information for {id} recipe



// GET /recipe?filter=ingredients:beef,chicken;user:mattj