import React from 'react';

const Box = ({ title, data }) => {
	return (
		<div className='d-flex planet-data-box'>
			<p className='box-title'>{title}</p>
			<p className='box-content text-white'>{data}</p>
		</div>
	);
};

export default Box;
