import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GuestState {
	name: string | null;
}

const initialState: GuestState = {
	name: null,
};

const guestSlice = createSlice({
	name: 'guest',
	initialState,
	reducers: {
		setGuestName(state, action: PayloadAction<{ name: string }>) {
			state.name = action.payload.name;
		},
		clearGuestName(state) {
			state.name = null;
		},
	},
});

export const guestActions = guestSlice.actions;

export default guestSlice.reducer;
