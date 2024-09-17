import React, { useState, useEffect } from 'react';
import './styles.css';
import String from '../string/String';
import { useSelector, useDispatch } from 'react-redux';
import {
	getExchangeRates,
	fetchExchangeRates,
} from '../../redux/ExchangeRatesSlice';

const Converter = () => {
	const dispatch = useDispatch();
	const exchangeRates = useSelector(getExchangeRates);
	const [leftValue, setLeftValue] = useState(0);
	const [rightValue, setRightValue] = useState(0);
	const [leftCharCode, setLeftCharCode] = useState('UAH');
	const [rightCharCode, setRightCharCode] = useState('USD');

	useEffect(() => {
		dispatch(fetchExchangeRates());
	}, [dispatch]);

	const recalculateRight = (value, charCode) => {
		if (!exchangeRates || !exchangeRates[charCode] || !exchangeRates[rightCharCode]) {
			return;
		}
		let nextValue = (
			(value * exchangeRates[rightCharCode]) /
			exchangeRates[charCode]
		).toFixed(2);
		setRightValue(nextValue);
	};

	const recalculateLeft = (value, charCode) => {
		if (!exchangeRates || !exchangeRates[charCode] || !exchangeRates[leftCharCode]) {
			return;
		}
		let nextValue = (
			(value * exchangeRates[leftCharCode]) /
			exchangeRates[charCode]
		).toFixed(2);
		setLeftValue(nextValue);
	};

	if (!exchangeRates) {
		return <div>Loading...</div>;
	}

	return (
		<div className='Converter'>
			<String
				value={leftValue}
				setValue={setLeftValue}
				charCode={leftCharCode}
				setCharCode={setLeftCharCode}
				recalculate={recalculateRight}
			/>
			<String
				value={rightValue}
				setValue={setRightValue}
				charCode={rightCharCode}
				setCharCode={setRightCharCode}
				recalculate={recalculateLeft}
			/>
		</div>
	);
};

export default Converter;
