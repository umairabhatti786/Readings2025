import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export interface SearchObject {
  title: string;
  author: string;
  isbn: string;
  category: string;
  publisher: string;
  publication_year: string;
  Book_Language: string;
  PAK_PRICE: string;
  keyword: string;
  Bind_IND: string;
}
export interface FilterState {
  isBookAdvanceSearch: boolean;
  booksAdvanceSearch: SearchObject;
}

export const initialState: FilterState = {
  isBookAdvanceSearch: false,
  booksAdvanceSearch: {
    title: "",
    author: "",
    isbn: "",
    category: "",
    publisher: "",
    publication_year: "",
    Book_Language: "",
    PAK_PRICE: "",
    keyword: "",
    Bind_IND: "",
  },
};
const authSlice = createSlice({
  name: "advanceSearch",
  initialState,
  reducers: {
    setBooksAdvanceSearch: (state, { payload }: PayloadAction<any>) => {
      (state.booksAdvanceSearch.Bind_IND = payload?.Bind_IND),
        (state.booksAdvanceSearch.Book_Language = payload?.Book_Language),
        (state.booksAdvanceSearch.PAK_PRICE = payload?.PAK_PRICE),
        (state.booksAdvanceSearch.author = payload?.author),
        (state.booksAdvanceSearch.category = payload?.category),
        (state.booksAdvanceSearch.isbn = payload?.isbn),
        (state.booksAdvanceSearch.keyword = payload?.keyword),
        (state.booksAdvanceSearch.publication_year = payload?.publication_year),
        (state.booksAdvanceSearch.publisher = payload?.publisher),
        (state.booksAdvanceSearch.title = payload?.title);
    },
    setIsBooksAdvanceSearch: (state, { payload }: PayloadAction<any>) => {
      state.isBookAdvanceSearch = payload;
    },
  },
});

export const { setBooksAdvanceSearch, setIsBooksAdvanceSearch } =
  authSlice.actions;
export default authSlice.reducer;

export const getBooksAdvanceSearch = (state: RootState) =>
  state?.advanceSearch.booksAdvanceSearch;
export const getIsBooksAdvanceSearch = (state: RootState) =>
  state?.advanceSearch.isBookAdvanceSearch;
