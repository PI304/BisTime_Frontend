import { createSlice } from '@reduxjs/toolkit';

interface scheduleState {
  name: string;
  availability: any[];
}
const initialState: scheduleState = {
  name: '',
  availability: [],
};

const scheduleSlice = createSlice({
  name: 'scheduleReducer',
  initialState,
  reducers: {
    setName: (state, action) => ({
      ...state,
      name: action.payload,
    }),
    setAvailability: (state, action) => ({
      ...state,
      availability: action.payload,
    }),
    reset: () => initialState,
  },
});

export const { setName, setAvailability, reset } = scheduleSlice.actions;
export default scheduleSlice.reducer;
