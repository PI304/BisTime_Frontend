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
  availability: {},
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
        [action.payload.date]: action.payload.availability,
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
