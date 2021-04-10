export interface User {

    id?: string;
    username?: string;
    displayName?: string;
    photoUrl?: string;
    commentNotifications: boolean;
    likeNotifications: boolean;
    recipeSavedNotifications: boolean;
    newFollowerNotifications: boolean;
    userRecipes: any[];
    //TODO: change this to collections
    bookmarks: any[];

}