import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IUserState } from "./User.type";
import { getUserList } from "./UserService";

const initialState: IUserState = {
    list : [],
    listStatus: ApiStatus.ideal,
};

export const getUserListAction = createAsyncThunk(
    "user/getUserListAction", 
    async () => {
        const response = await getUserList()
        return response.data;
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserListAction.pending, (state) => {
            state.listStatus = ApiStatus.loading
        });
        builder.addCase(getUserListAction.fulfilled, (state, action) => {
            state.listStatus = ApiStatus.ideal;
            state.list = action.payload
        });
        builder.addCase(getUserListAction.rejected, (state) => {
            state.listStatus = ApiStatus.error;
        });

    }
});

export default userSlice.reducer;