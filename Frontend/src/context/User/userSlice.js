import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { BsFillSignNoRightTurnFill } from "react-icons/bs";

const initialState = {
	status: false,
	userData: null,
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.status = true;
			state.userData = action.payload;
			state.error = null;
		},
		loginFailure: (state, action) => {
			state.status = false;
			state.userData = null;
			state.error = action.payload;
		},
		logout: (state) => {
			state.status = false;
			state.userData = null;
			state.error = null;
		},
		updateUser: (state, action) => {
			state.status = true;
			state.userData = action.payload;
			state.error = null;
		},
		updateUserFailure: (state, action) => {
			state.error = action.payload;
		},
		deleteUser: (state) => {
			state.status = false;
			state.userData = null;
			state.error = null;
		},
		deleteUserFailure: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const {
	login,
	logout,
	loginFailure,
	updateUser,
	updateUserFailure,
	deleteUser,
	deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
