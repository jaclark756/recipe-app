import { Category } from "./category";
import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";
import { RecipeUpdateNote } from "./recipeUpdateNote";
import { User } from "./user";

export interface Recipe {
    id?: number;
    user2?: User;
    ingredients?: Ingredient[];
    instructions?: Instruction[];
    title?: string;
    photoUrl?: string;
    categories?: Category[];
    cookTime?: number;
    prepTime?: number;
    notes?: RecipeUpdateNote[];
}