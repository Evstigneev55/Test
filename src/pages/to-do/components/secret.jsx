import { useState } from 'react';

const NothingIntersting = () => {
	const [secret, setSecret] = useState(false);
	return secret ? (
		<>
			<iframe
				width="560"
				height="315"
				src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
				allow="autoplay"
				allowFullScreen
			/>
			<button onClick={() => setSecret(() => false)}>Yea, u got me</button>
		</>
	) : (
		<button onClick={() => setSecret(() => true)}>FREE 3D AI model!!!</button>
	);
};

export default NothingIntersting;