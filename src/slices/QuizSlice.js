import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  QuizListCategoryWise: { quizes: [], loading: true, error: null },
};


export const quizList = createAsyncThunk(
    "quiz/quizList",
    async () => {
    
        const { data } = await axios.get(
            "https://atme-quiz.onrender.com/api/contests"
          );

          return data ;
    
    
    }
)
// export const favouritelist =  createAsyncThunk (
//   "quiz/favouritelist",
//   async () => {
   
  
//   }
// )

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {

      removeFromQuiz(state, action) {
        const { productId } = action.payload;
        state.favouriteProductList.favouriteProduct = state.favouriteProductList.favouriteProduct.filter(
          (x) => x.product._id !== productId
        );
      },
    },
    
    extraReducers: (builder) => {
    //   builder
    //   .addCase(favouritelist.pending, (state) => {
    //     state.favouriteProductList.loading = true;
    //     state.favouriteProductList.error = null;
    //   })
    //   .addCase(favouritelist.fulfilled, (state, action) => {
    //     state.favouriteProductList.loading = false;
    //     state.favouriteProductList.favouriteProduct = action.payload;
    //   })
    //   .addCase(favouritelist.rejected, (state, action) => {
    //     state.favouriteProductList.loading = false;
    //     state.favouriteProductList.error = action.error.message;
    //   });
    },
  });
  
  export const { removeFromQuiz } = quizSlice.actions;
  export default quizSlice.reducer;