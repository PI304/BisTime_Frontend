import { createSlice } from '@reduxjs/toolkit';

interface globalEvent extends Partial<Event> {
  additionalDates: string[];
}

const initialState: globalEvent = {
  uuid: '',
  title: '',
  startTime: '',
  endTime: '',
  availability: '',

  additionalDates: [],
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
      starTime: action.payload.start_time,
      endTime: action.payload.end_time,
    }),
    addAdditionalDate: (state, action) => ({
      ...state,
      additionalDates: [...state.additionalDates, action.payload],
    }),
    removeAdditionalDate: (state, action) => ({
      ...state,
      additionalDates: state.additionalDates.filter(
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
  setUuid,
  setTitle,
  setTime,
  addAdditionalDate,
  removeAdditionalDate,
  setAvailability,
} = eventSlice.actions;
export default eventSlice.reducer;
