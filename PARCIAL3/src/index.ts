import './screens/exports';
// import Login from './screens/login/login';
// import Register from './screens/register/register';
import Products from './screens/products/products';

import Home from './screens/home/home';
import { addObserver } from './store';
import { appState } from './store';
import { Screens } from './types/navigation';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = '';
		switch (appState.screen) {
			case Screens.PRODUCTS:
				const products = this.ownerDocument.createElement('app-products');
				this.shadowRoot?.appendChild(products);
				break;

			// case Screens.LOGIN:
			// 	const login = this.ownerDocument.createElement('app-login');
			// 	this.shadowRoot?.appendChild(login);
			// 	break;

			// case Screens.REGISTER:
			// 	const register = this.ownerDocument.createElement('app-register');
			// 	this.shadowRoot?.appendChild(register);
			// 	break;

			case Screens.HOME:
				const home = this.ownerDocument.createElement('app-home');
				this.shadowRoot?.appendChild(home);
				break;

			default:
				break;
		}
	}
}

customElements.define('app-container', AppContainer);
