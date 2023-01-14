import { createSlice } from '@reduxjs/toolkit';
import { Event } from 'types/event';

const initialState: Event = {
  uuid: '',
  title: '',
  start_time: '',
  end_time: '',
  additional_dates: [],
  availability: {},
};

const eventSlice = createSlice({
  name: 'eventReducer',
  initialState,
  reducers: {
    setUuid: (state, action) => ({
      ...state,
      uuid: action.payload,
    }),
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
    setAvailability: (state, action) => ({
      ...state,
      availability: action.payload,
    }),
  },
});

export const {
  setTitle,
  setTime,
  addAdditionalDate,
  removeAdditionalDate,
  setAvailability,
} = eventSlice.actions;
export default eventSlice.reducer;
