import { createSlice } from '@reduxjs/toolkit';

interface eventState {
  title: string;
}
const initialState: eventState = {
  title: '',
};

const eventSlice = createSlice({
  name: 'eventReducer',
  initialState,
  reducers: {
    setTitle: (state, action) => ({
      ...state,
      title: action.payload,
    }),
  },
});

export const { setTitle } = eventSlice.actions;
export default eventSlice.reducer;
