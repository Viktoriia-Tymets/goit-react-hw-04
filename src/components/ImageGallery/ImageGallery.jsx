import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./ImageGallery.module.css";

export default function ImageGallery({
  images,
  handleLoadMore,
  handleOpenModal,
}) {
  return (
    <>
      <ul className={css.gallery}>
        {images.map((el) => (
          <li key={el.id} onClick={() => handleOpenModal(el)}>
            <ImageCard src={el.urls.small} alt={el.alt_description} />
          </li>
        ))}
      </ul>
      <LoadMoreBtn handleClick={handleLoadMore} />
    </>
  );
}
