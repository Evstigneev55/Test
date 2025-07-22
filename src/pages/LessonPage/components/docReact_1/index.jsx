import { useEffect, useState } from 'react';

const DocReact_1 = () => {
	let [count, setCount] = useState(0);
	const onClickHandler = () => {
		++count;
		console.log(count);
		if (count === 10) setCount(count);
	};

	useEffect(() => {
		alert();
	}, [count]);
	return (
		<>
			<h1>
				Count is: <b>{count}</b>
			</h1>
			<button
				type="button"
				onClick={() => {
					onClickHandler(count);
				}}
			>
				{' '}
				+1{' '}
			</button>
		</>
	);
};

export default DocReact_1;
