import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type PromptStateT = {
  postModal?: any;
  authModal?: any;
  editPostModal?: any;
  deletePostModal?: any;
};

const initialState: PromptStateT = {};

export const promptSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    handlePostModal: (state: PromptStateT, action: PayloadAction<any>) => {
      state.postModal = action.payload;
    },
    handleAuthModal: (state: PromptStateT, action: PayloadAction<any>) => {
      state.authModal = action.payload;
    },
    handleEditPostModal: (state: PromptStateT, action: PayloadAction<any>) => {
      state.editPostModal = action.payload;
    },
    handleDeletePostModal: (
      state: PromptStateT,
      action: PayloadAction<any>
    ) => {
      state.deletePostModal = action.payload;
    },
    requireAuth: (state: PromptStateT) => {
      state.authModal = { open: true };
    },
  },
});

export const {
  handlePostModal,
  handleAuthModal,
  handleEditPostModal,
  handleDeletePostModal,
  requireAuth,
} = promptSlice.actions;

export default promptSlice.reducer;
