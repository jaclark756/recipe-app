import { Category } from "./category";
import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export interface Recipe {
    id?: number;
    userId?: string;
    ingredients?: Ingredient[];
    instructions?: Instruction[];
    title?: string;
    photoUrl?: string;
    category?: Category[];
    cookTime?: number;
    prepTime?: number;
}