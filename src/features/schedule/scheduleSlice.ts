import { createSlice } from '@reduxjs/toolkit';

export interface scheduleState {
  name: string;
  event: number | undefined;
  dates: string[];
  availability: string;
}
const initialState: scheduleState = {
  name: '',
  event: undefined,
  dates: [],
  availability: '',
};

const scheduleSlice = createSlice({
  name: 'scheduleReducer',
  initialState,
  reducers: {
    setName: (state, action) => ({
      ...state,
      name: action.payload,
    }),
    setEvent: (state, action) => ({
      ...state,
      event: action.payload,
    }),
    setDates: (state, action) => ({
      ...state,
      dates: action.payload,
    }),
    setAvailability: (state, action) => ({
      ...state,
      availability: action.payload,
    }),
  },
});

export const { setName, setEvent, setDates, setAvailability } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
