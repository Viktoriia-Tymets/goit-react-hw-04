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
      {loading && <Loader />}
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
