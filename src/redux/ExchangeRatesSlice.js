
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const fetchExchangeRates = createAsyncThunk(
	'ExchangeRates/fetchExchangeRates',
	async () => {
		const response = await axios.get(
			'https://www.cbr-xml-daily.ru/latest.js'
		);
		return response.data.rates;
	}
);

const ExchangeRatesSlice = createSlice({
	name: 'ExchangeRates',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchExchangeRates.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const getExchangeRates = (state) => state.exchangeRates;

export default ExchangeRatesSlice.reducer;
