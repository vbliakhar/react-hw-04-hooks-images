const myKey = "22042086-a7502aa63bbf9b5978b2310";

function fetchImages(currentName, page) {
  return fetch(
    `https://pixabay.com/api/?q=${currentName}&page=${page}&key=${myKey}de&image_type=photo&orientation=horizontal&per_page=4`
  ).then((res) => {
    if (res.ok) {
      return res.json().then((data) => data.hits);
    }
  });
}

const api = { fetchImages };

export default api;
