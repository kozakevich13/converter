
import { configureStore } from '@reduxjs/toolkit';

import ExchangeRatesReducer from './ExchangeRatesSlice';

export default configureStore({
	reducer: {
		exchangeRates: ExchangeRatesReducer,
	},
});
