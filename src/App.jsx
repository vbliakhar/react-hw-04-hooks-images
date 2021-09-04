import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "./App.scss";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal";

const myKey = "22042086-a7502aa63bbf9b5978b2310";
class App extends Component {
  state = {
    myImage: "",
    images: [],
    error: null,
    page: 1,
    largeImg: null,
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.myImage;
    const nextName = this.state.myImage;
    if (prevName !== nextName) {
      this.setState({ status: "pending" });
      this.fetchImages();
    }
  }
  fetchImages = () => {
    fetch(
      `https://pixabay.com/api/?q=${this.state.myImage}&page=${this.state.page}&key=${myKey}de&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => data.hits);
        }
        return Promise.reject(new Error(` No image:  ${this.state.myImage}`));
      })
      .then((images) => {
        this.setState((state) => ({
          status: "resolved",
          images: [...state.images, ...images],
          page: state.page + 1,
        }));
        if (!images.length) {
          return Promise.reject(new Error(` No image:  ${this.state.myImage}`));
        } else {
          this.setState({ error: null });
        }
      })
      .catch((error) => this.setState({ error, status: "rejected" }))
      .finally(() => {
        this.myScroll();
      });
  };
  handleFormSubmit = (myImage) => {
    if (myImage !== this.state.myImage) {
      this.setState({ myImage: myImage, images: [], page: 1 });
    } else {
      alert("This text has already been found");
    }
  };

  setLargeImage = (url) => {
    this.setState({ largeImg: url });
  };
  myScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  render() {
    const { images, error, status } = this.state;
    switch (status) {
      case "idle":
        return (
          <div className="App">
            <Searchbar onSubmit={this.handleFormSubmit} />
            <h1 style={{ textAlign: "center" }}>
              Enter a name for the image search
            </h1>
          </div>
        );

      case "pending":
        return (
          <div className="App">
            <Searchbar onSubmit={this.handleFormSubmit} />
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
            <Searchbar onSubmit={this.handleFormSubmit} />
            <h1 style={{ color: "red", textAlign: "center" }}>
              {error.message}
            </h1>
          </div>
        );

      case "resolved":
        return (
          <div className="App">
            <Searchbar onSubmit={this.handleFormSubmit} />
            <ImageGallery images={images} largeImg={this.setLargeImage} />
            <Button
              onClick={this.fetchImages}
              style={{ textAlign: "center" }}
            />
            {this.state.largeImg && (
              <Modal
                onClose={() => {
                  this.setState({ largeImg: null });
                }}
              >
                <img src={this.state.largeImg} alt="" />
              </Modal>
            )}
          </div>
        );

      default:
        console.log("Error");
    }
  }
}

export default App;
