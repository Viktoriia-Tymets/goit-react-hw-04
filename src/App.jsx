import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import "./App.css";

const fetchFotos = async (query, page) => {
  const accessKey = "g6x5jfFmrf3J9lUeV9Bn7WlzbP0DBCpbG4wUIF0BCQ4";
  const perPage = 16;

  const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${query}&client_id=${accessKey}`;

  try {
    const responce = await fetch(url);
    if (!responce.ok) {
      throw new Error("Please try again...");
    }

    const data = await responce.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = (value) => {
    setImages([]);
    setQuery(value);
    setPage(1);
  };

  const handleLoadMoreButton = () => {
    setPage((prev) => prev + 1);
  };

  const handleModalWindow = (image) => {
    setCurrentImg(image);
  };

  useEffect(() => {
    if (query === "") return;

    setError(false);
    setLoading(true);

    const getImages = async () => {
      try {
        const data = await fetchFotos(query, page);
        setImages((prev) => [...prev, ...data.results]);
        setLoading(false);
      } catch (error) {
        console.log(" error:", error);
        setError(true);
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          handleLoadMore={handleLoadMoreButton}
          handleOpenModal={handleModalWindow}
        />
      )}
      <Loader loading={loading} />
      {error && <ErrorMessage />}
      {currentImg && (
        <ImageModal
          image={currentImg}
          handleCloseModal={() => setCurrentImg(null)}
        />
      )}
    </>
  );
}
