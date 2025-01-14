import { Screens } from '../types/navigation';
import { getPosts, getPostsProfile, addPost } from '../utils/firebase';

export const getPostsAction = async () => {
	//Ir al utils de firebase y ejecutar la función getPosts
	const posts = await getPosts();
	return {
		action: 'GETPOSTS',
		payload: posts,
	};
};

export const getPostsProfileAction = async (idUser: string) => {
	//Ir al utils de firebase y ejecutar la función getPostsProfile
	const postsProfile = await getPostsProfile(idUser);
	return {
		action: 'GETPOSTSPROFILE',
		payload: postsProfile,
	};
};

export const addPostAction = async (formData: any) => {
  const newPost = await addPost(formData);
  return {
      action: 'ADDPOST',
      payload: newPost,
  };
};

export const navigate = (screen: Screens) => {
	return {
		action: 'NAVIGATE',
		payload: screen,
	};
};

// export const setUserCredentials = (user: string) => {
// 	return {
// 		action: 'SETUSER',
// 		payload: user,
// 	};
// };
