import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PromptStateT = {
	postModal?: any;
	authModal?: any;
};

const initialState: PromptStateT = {};

export const promptSlice = createSlice({
	name: "prompts",
	initialState,
	reducers: {
		handlePostModal: (state: PromptStateT, action: PayloadAction<any>) => {
			state.postModal = action.payload;
		},
		handleAuthModal: (state: PromptStateT, action: PayloadAction<any>) => {
			state.authModal = action.payload;
		},
		requireAuth: (state: PromptStateT) => {
			state.authModal = { open: true };
		},
	},
});

export const { handlePostModal, handleAuthModal, requireAuth } =
	promptSlice.actions;

export default promptSlice.reducer;
