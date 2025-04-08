import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

export default function ImageGallery({
  images,
  handleLoadMoreButton,
  handleOpenModalWindow,
}) {
  return (
    <>
      <ul>
        {images.map((el) => (
          <li key={el.id} onClick={() => handleOpenModalWindow(el)}>
            <ImageCard src={el.urls.small} />
          </li>
        ))}
      </ul>
      <LoadMoreBtn handleClick={handleLoadMoreButton} />
    </>
  );
}
