import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AssistantState {
  isQuerying: boolean
}

const initialState: AssistantState = {
    isQuerying: false,
}

export const assistantSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setIsQuerying: (state, action: PayloadAction<boolean>) => {
      state.isQuerying = action.payload
    }
  },
})

export const { setIsQuerying } = assistantSlice.actions

export default assistantSlice.reducer
