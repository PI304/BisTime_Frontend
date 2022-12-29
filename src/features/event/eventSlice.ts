import { createSlice } from '@reduxjs/toolkit';
type Date = string;

interface eventState {
  title: string;
  start_time: string;
  end_time: string;
  additional_dates: Set<Date>;
}
const initialState: eventState = {
  title: '',
  start_time: '',
  end_time: '',
  additional_dates: new Set<Date>([]),
};

const eventSlice = createSlice({
  name: 'eventReducer',
  initialState,
  reducers: {
    setTitle: (state, action) => ({
      ...state,
      title: action.payload,
    }),
    setTime: (state, action) => ({
      ...state,
      start_time: action.payload,
      end_time: action.payload,
    }),
    addDate: (state, action) => {
      state.additional_dates.add(action.payload);
    },
    removeDate: (state, action) => {
      state.additional_dates.delete(action.payload);
    },
  },
});

export const { setTitle } = eventSlice.actions;
export default eventSlice.reducer;
