export const BASE_URL= "https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT"


export async function checkLogin() {
 if (localStorage.getItem('loginToken')) {
    return JSON.parse(localStorage.getItem('loginToken'));
  }

}


export async function fetchPosts() {

  const url = `${ BASE_URL }/posts`;

  try {
    const response = await fetch(url);
    const obj = await response.json();
    const posts = obj.data.posts;
    return posts;
  } catch (error) {
    throw error;
  }
}

export async function fetchUserData() {
   
  const url = `${ BASE_URL }/users/me`;
  const headers = { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${LoginToken}` 
  }}
  try {
    const response = await fetch(url, headers);
    const obj = await response.json();
    return posts;
  } catch (error) {
    throw error;
  }
}

