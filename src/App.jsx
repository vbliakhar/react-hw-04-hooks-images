import { useState, useEffect, useCallback } from "react";
import Loader from "react-loader-spinner";
import "./App.scss";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal";

const myKey = "22042086-a7502aa63bbf9b5978b2310";
const App = () => {
  const [myImage, setMyImage] = useState("");
  const [error, setError] = useState(null);
  const [largeImg, setLargeImg] = useState(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const [helper, setHelper] = useState("");

  const myScroll = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);
  const fetchImages = useCallback(() => {
    if (!helper) {
      return;
    }
    fetch(
      `https://pixabay.com/api/?q=${helper}&page=${page}&key=${myKey}de&image_type=photo&orientation=horizontal&per_page=4`
    )
      .then((res) => {
        setMyImage("");

        if (res.ok) {
          return res.json().then((data) => data.hits);
        }
        // return Promise.reject(throw new Error(` No image:  ${myImage}`));
      })
      .then((response) => {
        setStatus("resolved");
        setImages((images) => [...images, ...response]);
        setPage((page) => page + 1);

        if (!response.length) {
          setError(` No image:  ${myImage}`);
          setStatus("rejected");
        } else {
          setError(null);
        }
      })
      .catch((error) => {
        setError(` No image:  ${myImage}`);
        setStatus("rejected");
      })
      .finally(() => {
        myScroll();
      });
  }, [
    helper,
    setStatus,
    setError,
    setImages,
    setPage,
    myScroll,
    setMyImage,
    myImage,
    page,
  ]);

  useEffect(() => {
    if (!myImage) {
      return;
    }
    setHelper(myImage);
    setStatus("pending");
    if (helper === myImage) {
      fetchImages();
    }
  }, [myImage, fetchImages, helper]);

  const handleFormSubmit = (newMyImage) => {
    if (newMyImage !== myImage) {
      setMyImage(newMyImage);
      setImages([]);
      setPage(1);
    } else {
      alert("This text has already been found");
    }
  };

  const setLargeImage = (url) => {
    setLargeImg(url);
  };

  switch (status) {
    case "idle":
      return (
        <div className="App">
          <Searchbar onSubmit={handleFormSubmit} />
          <h1 style={{ textAlign: "center" }}>
            Enter a name for the image search
          </h1>
        </div>
      );

    case "pending":
      return (
        <div className="App">
          <Searchbar onSubmit={handleFormSubmit} />
          <Loader
            type="Circles"
            color="red"
            height={80}
            width={80}
            style={{ textAlign: "center" }}
          />
        </div>
      );
    case "rejected":
      return (
        <div className="App">
          <Searchbar onSubmit={handleFormSubmit} />
          <h1 style={{ color: "red", textAlign: "center" }}>{error}</h1>
        </div>
      );

    case "resolved":
      return (
        <div className="App">
          <Searchbar onSubmit={handleFormSubmit} />
          <ImageGallery images={images} largeImg={setLargeImage} />
          <Button onClick={fetchImages} style={{ textAlign: "center" }} />
          {largeImg && (
            <Modal
              onClose={() => {
                // this.setState({ largeImg: null });
                setLargeImg(null);
              }}
            >
              <img src={largeImg} alt="" />
            </Modal>
          )}
        </div>
      );

    default:
      console.log("Error");
  }
};

export default App;
