import { createSlice } from '@reduxjs/toolkit';

interface userState {
  name: string;
  password: string;
}
const initialState: userState = {
  name: '',
  password: '',
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setName: (state, action) => ({
      ...state,
      name: action.payload,
    }),
    setPassword: (state, action) => ({
      ...state,
      password: action.payload,
    }),
  },
});

export const { setName, setPassword } = userSlice.actions;
export default userSlice.reducer;
