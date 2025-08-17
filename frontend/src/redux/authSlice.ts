import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null; // Replace 'any' with your User type if available
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any | null>) => { // Replace 'any' with your User type if available
            state.user = action.payload;
        }
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;