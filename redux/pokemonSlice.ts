import { BASE_URL } from '@/constans/url';
import { Pokemon, PokemonListItem, PokemonListResponse } from '@/types/pokemon';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface PokemonState {
  list: PokemonListItem[];
  loadingList: boolean;
  errorList: string | null;
  selected: Pokemon | null;
  loadingSelected: boolean;
  errorSelected: string | null;
}

const initialState: PokemonState = {
  list: [],
  loadingList: false,
  errorList: null,
  selected: null,
  loadingSelected: false,
  errorSelected: null,
};

export const fetchPokemonList = createAsyncThunk<
  PokemonListItem[],
  void,
  { rejectValue: string }
>('pokemon/fetchList', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(BASE_URL);
    const data: PokemonListResponse = await res.json();
    return data.results;
  } catch (error) {
    return rejectWithValue('Error');
  }
});

export const fetchPokemonByUrl = createAsyncThunk<
  Pokemon,
  string,
  { rejectValue: string }
>('pokemon/fetchByUrl', async (url, { rejectWithValue }) => {
  try {
    const res = await fetch(url);
    const data: Pokemon = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue('Error');
  }
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loadingList = false;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload || 'Error';
      })
      .addCase(fetchPokemonByUrl.pending, (state) => {
        state.loadingSelected = true;
        state.errorSelected = null;
      })
      .addCase(fetchPokemonByUrl.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.loadingSelected = false;
      })
      .addCase(fetchPokemonByUrl.rejected, (state, action) => {
        state.loadingSelected = false;
        state.errorSelected = action.payload || 'Error';
      });
  },
});

export default pokemonSlice.reducer;
