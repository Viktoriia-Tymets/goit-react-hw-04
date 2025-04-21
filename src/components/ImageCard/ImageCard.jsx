export default function ImageCard({ src, alt }) {
  return (
    <div>
      <img src={src} alt={alt} style={{ width: "100%", borderRadius: "8px" }} />
    </div>
  );
}
