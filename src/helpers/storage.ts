export const setToLocalStorage = (key: string, value: any) => {
	try {
		const stringValue = getStringValue(value);
		localStorage.setItem(key, stringValue);
	} catch (e) {
		console.error(e);
	}
};

export const setToSessionStorage = (key: string, value: any) => {
	try {
		const stringValue = getStringValue(value);
		sessionStorage.setItem(key, stringValue);
	} catch (e) {
		console.error(e);
	}
};

export function getFromLocalStorage<T = string>(key: string): T | null;
export function getFromLocalStorage<T = string>(key: string, defaultValue: T): T;
export function getFromLocalStorage<T = string>(key: string, defaultValue?: T): T | null {
	const raw = localStorage.getItem(key);
	if (raw === null) return defaultValue ?? null;

	try {
		return JSON.parse(raw) as T;
	} catch (e) {
		return defaultValue ?? null;
	}
}

export const getFromSessionStorage = <T = string>(key: string): T | null => {
	const value = sessionStorage.getItem(key);

	if (!value) return null;

	try {
		return JSON.parse(value) as T;
	} catch (e) {
		return value as T;
	}
};

function getStringValue(value: any) {
	if (typeof value === 'string') return value;
	if (isSerializable(value)) return JSON.stringify(value);

	return '';
}

function isSerializable(object: any) {
	if (object instanceof Error) return false;
	if (typeof object === 'function' || typeof object === 'undefined') return false;

	try {
		JSON.stringify(object);
		return true;
	} catch (error) {
		return false;
	}
}
