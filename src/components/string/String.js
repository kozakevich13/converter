
import React, { useState, useEffect } from 'react';

import './String.css';

import { useSelector } from 'react-redux';
import { getExchangeRates } from '../../redux/ExchangeRatesSlice';

const String = ({
	value,
	setValue,
	charCode,
	setCharCode,
	recalculate,
}) => {
	const exchangeRates = useSelector(getExchangeRates);
	const [allCharCode, setAllCharCode] = useState(Object.keys(exchangeRates));

	useEffect(() => {
		setAllCharCode(Object.keys(exchangeRates));
	}, [exchangeRates]);

	const getInput = () => {
		return (e) => {
			if (e.target.value > 0) {
				setValue(+e.target.value);
			} else {
				setValue(+e.target.value * -1);
			}

			if (!e.target.value) {
				setValue(e.target.value);
			}
			recalculate(e.target.value, charCode);
		};
	};

	const getCharCode = () => {
		return (e) => {
			setCharCode(e.target.value);
			recalculate(value, e.target.value);
		};
	};

	return (
		<div className='CurrencyString'>
			<input
				className='input'
				type={'number'}
				value={value}
				onChange={getInput()}></input>
			<select
				className='select'
				name='select'
				value={charCode}
				onChange={getCharCode()}>
				{allCharCode.map((item, i) => {
					return <option value={item} key={item}>{item}</option>;
				})}
			</select>
		</div>
	);
};

export default String;
