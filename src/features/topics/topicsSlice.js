import { createSlice, createAction } from "@reduxjs/toolkit";

const addQuiz = createAction('quizzes/addQuiz')

const initialState = { topics: {} }

export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    addTopic: (state, action) => {
      const { id, name, icon } = action.payload
      state.topics[id] = {
        id,
        name,
        icon,
        quizIds: []
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addQuiz, (state, action) => {
        const { topicId, id } = action.payload
        state.topics[topicId].quizIds.push(id)
      })
  },
})

export const selectTopics = state => state.topics.topics
export const { addTopic } = topicsSlice.actions
export default topicsSlice.reducer