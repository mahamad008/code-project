// // deleteCategorySlice.ts

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Category {
//   id: string;
//   catName: string;
//   catDescription: string;
// }

// interface DeleteCategoryState {
//   categories: Category[];
// }

// const initialState: DeleteCategoryState = {
//   categories: [],
// };

// const deleteCategorySlice = createSlice({
//   name: 'deleteCategory',
//   initialState,
//   reducers: {
//     deleteCategory: (state, action: PayloadAction<string>) => {
//       state.categories = state.categories.filter(
//         (category) => category.id !== action.payload
//       );
//     },
//   },
// });

// export const { deleteCategory } = deleteCategorySlice.actions;

// export default deleteCategorySlice.reducer;