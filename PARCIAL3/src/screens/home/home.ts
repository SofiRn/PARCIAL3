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

class Home extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		if (appState.posts.length === 0) {
			const action = await getPostsAction();
			dispatch(action);
		} else {
			this.render();
		}
    }

    async submitChange() {
      formData.idUser = appState.user;
      addPost(formData);
      dispatch(navigate(Screens.PRODUCTS));
	}



	render() {
		const title = this.ownerDocument.createElement('h1');
		title.innerText = 'Home';
		this.shadowRoot?.appendChild(title);

		appState.posts.forEach((post: any) => {
            console.log(post);

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
			stock .innerText = post.stock ;
			this.shadowRoot?.appendChild(stock);

      const change = this.ownerDocument.createElement('button');
			change.innerText = 've a añadir producto';
			change.addEventListener('click', this.submitChange);
			this.shadowRoot?.appendChild(change);
		});
	}
}

customElements.define('app-home', Home);
export default Home;
