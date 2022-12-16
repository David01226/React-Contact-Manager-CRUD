import { createSlice } from "@reduxjs/toolkit";
import { ApiStatus, defaultList, IUserState } from "./User.type";

const initialState: IUserState = {
    list : defaultList,
    listStatus: ApiStatus.ideal,
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

export default userSlice.reducer;