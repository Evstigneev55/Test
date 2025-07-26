import { useState } from 'react';
import { placePlan as ininitNormaliseArr } from './places';
// сделать передачу 'массива' Всех мест
const DocReact = () => {
	const [places, setPlaces] = useState(ininitNormaliseArr);

	function deleteOnId(delId) {
		console.log('delId: ', delId);
		if (!places[delId]) {
			alert('unknow ID, bruh');
			return;
		}

		const delTitile = places[delId].title || 'no title';

		setPlaces((places) => {
			const newPlaces = { ...places };
			for (const place in places) {
				newPlaces[place].childIds = newPlaces[place].childIds.filter((id) => id !== delId);
			}
			delete newPlaces[delId];
			return newPlaces;
		});

		console.log(`You have succsesfull delete the entry about ${delTitile}`);
	}

	return (
		<>
			<h2>Places to visit</h2>
			<ol>
				<ChildPlace childPlacesIdsArr={places[0].childIds} places={places} deleteOnId={deleteOnId} />
			</ol>
		</>
	);
};

export default DocReact;

function ChildPlace({ childPlacesIdsArr, places, deleteOnId }) {
	return childPlacesIdsArr.map((childPlaceID) => {
		const childPlaceObj = places[childPlaceID];

		return childPlaceObj.childIds.length === 0 ? (
			<li key={childPlaceID}>
				<b>{childPlaceObj.title}</b>
				<button onClick={() => deleteOnId(childPlaceID)}>delete</button>
			</li>
		) : (
			<li key={childPlaceID}>
				Идите на {childPlaceObj.title}
				<button onClick={() => deleteOnId(childPlaceID)}>'skip'</button>
				<ol>
					<ChildPlace childPlacesIdsArr={childPlaceObj.childIds} places={places} deleteOnId={deleteOnId}/>
				</ol>
			</li>
		);
	});
}