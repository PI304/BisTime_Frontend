import { createSlice } from '@reduxjs/toolkit';

export interface eventState {
  title: string;
  start_time: string;
  end_time: string;
  additional_dates: string[];
}
const initialState: eventState = {
  title: '',
  start_time: '',
  end_time: '',
  additional_dates: [],
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
      start_time: action.payload.start_time,
      end_time: action.payload.end_time,
    }),
    addAdditionalDate: (state, action) => ({
      ...state,
      additional_dates: [...state.additional_dates, action.payload],
    }),
    removeAdditionalDate: (state, action) => ({
      ...state,
      additional_dates: state.additional_dates.filter(
        (date) => date !== action.payload,
      ),
    }),
  },
});

export const { setTitle, setTime, addAdditionalDate, removeAdditionalDate } =
  eventSlice.actions;
export default eventSlice.reducer;
