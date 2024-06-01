import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; //Importar los modulos
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, setDoc, getDoc, where, query } from 'firebase/firestore'; //Importar funciones para agregar info a la db
import { Product } from '../types/products';

const firebaseConfig = {
	apiKey: 'AIzaSyCcFoSO5nOmytm-BxzkMozOPS2byGpPjrM',
	authDomain: 'other-dca.firebaseapp.com',
	projectId: 'other-dca',
	storageBucket: 'other-dca.appspot.com',
	messagingSenderId: '1020413285821',
	appId: '1:1020413285821:web:cfabca1abb3e65e0c4eed4',
	measurementId: 'G-SZMD2XD1MX',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// export const auth = getAuth(app);



//Funciones para agregar y obtener productos
export const addPost = async (formData: Omit<Product, 'id'>) => {
	try {
		const docRef = await addDoc(collection(db, 'posts'), formData);
    const newPost = { id: docRef.id, ...formData };
		console.log('Document written with ID: ', docRef.id);
		return newPost;
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

export const getPosts = async () => {
	const querySnapshot = await getDocs(collection(db, 'posts'));
	const arrayProducts: Array<Product> = [];

	querySnapshot.forEach((doc) => {
		const data = doc.data() as any;
		arrayProducts.push({ id: doc.id, ...data });
	});

	return arrayProducts;
};

export const getPostsProfile = async (idUser: string) => {
	const q = query(collection(db, 'posts'), where('idUser', '==', idUser));
	const querySnapshot = await getDocs(q);
	const arrayProducts: Array<Product> = [];

	querySnapshot.forEach((doc) => {
		const data = doc.data() as any;
		arrayProducts.push({ id: doc.id, ...data });
	});

	return arrayProducts;
};

//Función para obtener especificamente un solo documento
export const getDetailDoc = async (id: string) => {
	const docRef = doc(db, 'movies', id);
	const docSnap = await getDoc(docRef);
	return docSnap.data();
};

export default {
	getPosts,
	addPost,
};

// // EDITAR/ACTUALIZAR INFORMACION Firebase
// export const updateFavoriteSong = async (newPost:any) =>{
// 	const userRef = doc(db, "posts", "GQ0x1uwg83vR2OJtm0KL");

// 	await updateDoc(userRef, {
// 		favoriteSong: newPost
// 	});
// }

// // //Donde esté el boton para cambiar la canción
// button.addEventListener('click', async ()=>{
// 	updateFavoriteSong("Quevedo - blabla")
// })


//BORRAR INFORMACION
// const res = await db.collection('cities').doc('DC').delete();