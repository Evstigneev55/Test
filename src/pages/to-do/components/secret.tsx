import { useReducer } from 'react';

const NothingIntersting = () => {
	const [secret, toogleSecret] = useReducer((prevS) => !prevS, false);
	return secret ? (
		<>
			<iframe
				width="560"
				height="315"
				src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
				allow="autoplay"
				allowFullScreen
			/>
			<button onClick={toogleSecret}>Yea, u got me</button>
		</>
	) : (
		<button onClick={toogleSecret}>FREE 3D AI model!!!</button>
	);
};

export default NothingIntersting;
