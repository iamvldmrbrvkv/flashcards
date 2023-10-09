import { configureStore } from "@reduxjs/toolkit";
// import reducers
import topicsSliceReducer from "../features/topics/topicsSlice";
import quizzesSliceReducer from "../features/quizzes/quizzesSlice";
import cardsSliceReducer from "../features/cards/cardsSlice";

export default configureStore({
  reducer: {
    topics: topicsSliceReducer,
    quizzes: quizzesSliceReducer,
    cards: cardsSliceReducer
  },
});
