export const BASE_URL= "https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT"


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