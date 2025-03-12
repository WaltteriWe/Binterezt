import { MediaItemWithOwner } from "hybrid-types/DBTypes";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import Comments from "../components/Comments";
import Likes from "../components/Likes";

const Single = () => {
  const navigate: NavigateFunction = useNavigate();
  const { state } = useLocation();
  const item: MediaItemWithOwner = state.item;
  return (
    <>
      <h2 className="neon-text font-bold">Incredible post!</h2>
      <h3>{item.title}</h3>
      <p>{new Date(item.created_at).toLocaleString("fi-FI")}</p>
      {item.media_type.includes("image") ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video src={item.filename} controls />
      )}
      {<Likes item={item} />}
      <p>{item.description}</p>
      <p>Owner: {item.username}</p>
      <p>Type: {item.media_type}</p>
      <p>Size: {Math.round(item.filesize / 1024)} kB</p>
      {<Comments item={item} />}
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="block w-full bg-indigo-400 p-2 text-center transition-all duration-500 ease-in-out rounded-2xl hover:bg-red-600"
      >
        go back
      </button>
    </>
  );
};

export default Single;
