import { createSlice } from '@reduxjs/toolkit';

interface scheduleState {
  name: string;
  availability: any[];
  isDirty: boolean;
}
const initialState: scheduleState = {
  name: '',
  availability: [],
  isDirty: false,
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
    setIsDirty: (state, action) => ({
      ...state,
      isDirty: action.payload,
    }),
    reset: () => initialState,
  },
});

export const { setName, setAvailability, setIsDirty, reset } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
