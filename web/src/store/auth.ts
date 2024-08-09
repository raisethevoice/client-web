import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthStateT = {
	user?: any;
};

const initialState: AuthStateT = {};

export const promptSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state: AuthStateT, action: PayloadAction<any>) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = promptSlice.actions;

export default promptSlice.reducer;
