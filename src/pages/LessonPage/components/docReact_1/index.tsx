import { useState } from 'react';

export default function DocReact_1() {
	const [nestedObj, setNestedObj] = useState({ id: 2, newObj: { name: 'Nicolas', age: 23, num: {2: {lol: 3}} } });
	const newObj = { ...nestedObj, id: 52};
	
	const ha=()=>{
		setNestedObj(o => {return {...o, id:33}})
	}

	return <h1><button onClick={ha}> click </button> {JSON.stringify(nestedObj)}</h1>;
}
