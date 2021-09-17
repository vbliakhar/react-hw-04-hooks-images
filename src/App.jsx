import { useState, useEffect, useCallback } from "react";
import Loader from "react-loader-spinner";
import "./App.scss";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal";
import imagesAPI from "./components/services/images-api";
import ImagesErrorView from "./components/ImagesErrorView";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const App = () => {
  const [myImage, setMyImage] = useState("");
  const [error, setError] = useState(null);
  const [largeImg, setLargeImg] = useState(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const [currentName, setHelper] = useState("");

  const myScroll = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);
  const fetchImages = useCallback(() => {
    imagesAPI
      .fetchImages(currentName, page)
      .then((response) => {
        setMyImage("");
        setStatus(Status.RESOLVED);
        setImages((images) => [...images, ...response]);
        setPage((page) => page + 1);

        if (!response.length) {
          setError(`${myImage}`);
          setStatus(Status.REJECTED);
        } else {
          setError(null);
        }
      })
      .catch((error) => {
        setError(`${myImage}`);
        setStatus(Status.REJECTED);
      })
      .finally(() => {
        myScroll();
      });
  }, [currentName, myImage, myScroll, page]);

  useEffect(() => {
    if (!myImage) {
      return;
    }
    setStatus(Status.PENDING);
    setHelper(myImage);
    if (currentName === myImage) {
      fetchImages();
    }
  }, [myImage, fetchImages, currentName]);

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
          <h1 style={{ color: "red", textAlign: "center" }}>
            <ImagesErrorView message={error} />
          </h1>
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
