import errorImg from "./123.png";

export default function imagesErrorView({ message }) {
  return (
    <div
      role="alert"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <img src={errorImg} width="240" alt="error" />
      <h3>This text does not exist: {message}</h3>
    </div>
  );
}
