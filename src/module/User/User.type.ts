export interface IUser {
    id: number;
    name: string;
    email: string
}

export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error"
}

export interface IUserState {
    list : IUser[];
    listStatus : ApiStatus;
}

export const defaultList: IUser[] = [
    {
    id: 1,
    name: "Bob",
    email: "bob@gmail.com",
},
{
    id: 2,
    name: "Sam",
    email: "sam@gmail.com",
},
];