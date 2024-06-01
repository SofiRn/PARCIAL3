import { reducer } from './reducer';
import { Screens } from '../types/navigation';
import { Observer } from '../types/store';
// import {appState } from '../types/store';
// import { AppState, Observer } from "../types/store";
import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../utils/firebase';
import { navigate } from './actions';
//setUserCredentials  ->Era una accion
// import Storage from '../utils/storage';
// import { PersistanceKeys } from '../utils/storage';

// onAuthStateChanged(auth, (user) => {
// 	if (user) {
// 		user.uid !== null ? dispatch(setUserCredentials(user.uid)) : '';
// 		dispatch(navigate(Screens.DASHBOARD));
// 	} else {
// 		dispatch(navigate(Screens.LOGIN));
// 	}
// });

const emptyState = {
	screen: 'PRODUCTS', //Screens.DASHBOARD,
	posts: [],
	postsLoaded: false,
	user: '',
	postsProfile: [],
};

export let appState = emptyState;

console.log(appState);


let observers: Observer[] = [];

// export let appState = Storage.get({
// 	key: PersistanceKeys.STORE,
// 	defaultValue: emptyState,
// });

// const notifyObservers = () => observers.forEach((o) => o.render());

// const persistStore = (state: any) =>
//   Storage.set({ key: PersistanceKeys.STORE, value: state });

const notifyObservers = () => {
	observers.forEach((o) => {
		if (typeof o.render === 'function') {
			o.render();
		}
	});
};

export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;
	notifyObservers();
};

export const addObserver = (ref: Observer) => {
	observers = [...observers, ref];
};
