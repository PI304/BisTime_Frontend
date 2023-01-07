import { createSlice } from '@reduxjs/toolkit';

export interface scheduleState {
  name: string;
  event: number | string | undefined;
  current: string;
  availability: object;
}
const initialState: scheduleState = {
  name: '',
  event: undefined,
  current: '',
  availability: {}, // {'2021-01-01': '000000000000000111100000'} // 0 = not available, 1 = available
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
    setAvailability: (state, action) => ({
      ...state,
      availability: {
        ...state.availability,
        [action.payload.date]: action.payload.availability, // current:'000000000000000111100000'
      },
    }),
    setCurrnet: (state, action) => ({
      ...state,
      current: action.payload,
    }),
  },
});

export const { setName, setEvent, setAvailability, setCurrnet } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
