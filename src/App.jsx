import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import "./App.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = (value) => {
    setImages([]);
    setQuery(value);
  };

  const handleLoadMoreButton = () => {
    setPage((prev) => prev + 1);
  };

  const handleModalWindow = (image) => {
    setCurrentImg(image);
  };

  useEffect(() => {
    setError(false);
    setLoading(true);

    if (query === "") {
      setLoading(false);
      return;
    }

    const getImages = async () => {
      try {
        const data = await fetchFotos(query, page);
        setImages((prev) => [...prev, ...data.results]);
      } catch (error) {
        console.log(" error:", error);
        setError(true);
      }
    };

    getImages();

    setLoading(false);
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
      <Loader />
      {error && <ErrorMessage />}
      {currentImg && (
        <ImageModal image={currentImg} handleCloseModal={handleModalWindow} />
      )}
    </>
  );
}
