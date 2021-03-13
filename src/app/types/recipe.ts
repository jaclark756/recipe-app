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