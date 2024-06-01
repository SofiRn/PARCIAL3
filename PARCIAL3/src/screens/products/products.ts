import { addObserver, appState, dispatch } from '../../store';
import { getPostsAction } from '../../store/actions';
import { addPost } from '../../utils/firebase';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/navigation';

const formData = {
	artistName: '',
	price: 0,
	idUser: '',
    album:'',
      img: '',
      stock:0,
};

class Products extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);

		// Bind methods to the instance
		this.changeName = this.changeName.bind(this);
        this.changeAlbum = this.changeAlbum.bind(this);
		this.changePrice = this.changePrice.bind(this);
        this.changeStock = this.changeStock.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	async connectedCallback() {
		if (appState.posts.length === 0 && !appState.postsLoaded) {
			// Agregar postsLoaded
			const action = await getPostsAction();
			dispatch(action);
		} else {
			this.render();
		}
	}
	// 	if (appState.posts.length === 0) {
	// 		const action = await getPostsAction();
	// 		dispatch(action);
	// 	}
	// 	this.render();
	// }

	async submitForm() {
		formData.idUser = appState.user;
		addPost(formData);
		// dispatch(navigate(Screens.PROFILE));
	} //aqui sucede que al darle click a save cambia a la pantalla profile

	//CAMBIO DE PANTALLA
  async submitChange() {
		formData.idUser = appState.user;
		addPost(formData);
		dispatch(navigate(Screens.HOME));
	}

	changeName(e: any) {
		formData.artistName = e?.target?.value;
	}

    changeAlbum(e: any) {
		formData.album = e?.target?.value;
	}

	changePrice(e: any) {
		formData.price = Number(e?.target?.value);
	}

    changeStock(e: any) {
		formData.stock = Number(e?.target?.value);
	}

	render() {
		// Clear the current content
		this.shadowRoot!.innerHTML = '';

		const title = this.ownerDocument.createElement('h1');
		title.innerText = 'Add Product';
		this.shadowRoot?.appendChild(title);

        const pAlbum = this.ownerDocument.createElement('input');
		pAlbum.placeholder = 'Album Name';
		pAlbum.addEventListener('change', this.changeAlbum);
		this.shadowRoot?.appendChild(pAlbum);

		const pName = this.ownerDocument.createElement('input');
		pName.placeholder = 'Artist Name';
		pName.addEventListener('change', this.changeName);
		this.shadowRoot?.appendChild(pName);

		const pPrice = this.ownerDocument.createElement('input');
		pPrice.placeholder = 'Price';
		pPrice.addEventListener('change', this.changePrice);
		this.shadowRoot?.appendChild(pPrice);

        const pStock = this.ownerDocument.createElement('input');
		pStock.placeholder = 'Stock';
		pStock.addEventListener('change', this.changePrice);
		this.shadowRoot?.appendChild(pStock);

		const save = this.ownerDocument.createElement('button');
		save.innerText = 'Save';
		save.addEventListener('click', this.submitForm);
		this.shadowRoot?.appendChild(save);

		appState.posts.forEach((post: any) => {

            const albumName = this.ownerDocument.createElement('p');
			albumName.innerText = post.albumName;
			this.shadowRoot?.appendChild(albumName);

			const artistName = this.ownerDocument.createElement('p');
			artistName.innerText = post.artistName;
			this.shadowRoot?.appendChild(artistName);

			const price = this.ownerDocument.createElement('p');
			price.innerText = post.price;
			this.shadowRoot?.appendChild(price);

            const stock = this.ownerDocument.createElement('p');
			stock.innerText = post.stock;
			this.shadowRoot?.appendChild(stock);

			const change = this.ownerDocument.createElement('button');
			change.innerText = 'ver en Home';
			change.addEventListener('click', this.submitChange);
			this.shadowRoot?.appendChild(change);
		});
	}
}

customElements.define('app-products', Products);
export default Products;
