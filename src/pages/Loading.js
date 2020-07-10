import React from 'react';

export default function Loading(props) {

	return (
		<div className='siteLoading' id="siteLoading">
			<div className="siteLoading-frame">
				<img className='siteLoading-image' src='images/loader.gif' alt="loader" />
			</div>
		</div>
	)
}