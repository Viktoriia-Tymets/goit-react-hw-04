import MoonLoader from "react-spinners/MoonLoader";

export default function Loader({ loading }) {
  return (
    <MoonLoader
      color="blue"
      cssOverride={{
        margin: "30px auto",
        color: "blue",
      }}
      loading={loading}
      size={60}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
