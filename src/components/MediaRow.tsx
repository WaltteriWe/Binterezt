import { MediaItemWithOwner } from "hybrid-types/DBTypes";
import { Link } from "react-router";
import { useUserContext } from "../Hooks/ContextHooks";
import { useMedia } from "../Hooks/apiHooks";

type MediaItemProps = {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
};

const MediaRow = (props: MediaItemProps) => {
  const { user } = useUserContext();
  const { item } = props;
  const { deleteMedia } = useMedia();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("TOKEN NOT FOUND");
        return;
      }
      const deleteResponse = await deleteMedia(item.media_id, token);
      console.log(deleteResponse);
      alert("Media deleted!, refresh the page to see the changes");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <article className="w-full rounded-2xl bg-pink-400 shadow-lg neon-shadow">
      <img
        className="h-72 w-full rounded-md object-cover"
        src={
          item.thumbnail ||
          (item.screenshots && item.screenshots[2]) ||
          undefined
        }
        alt={item.title}
      />
      <div className="p-4">
        <h3 className="text-center">{item.title}</h3>
        <p className="max-w-full overflow-clip font-bold text-nowrap text-ellipsis neon-text">
          {item.description}
        </p>
        <div className="my-2 rounded-md border-1 border-stone-400 p-2">
          <p>
            Created at: <br />{" "}
            {new Date(item.created_at).toLocaleString("fi-FI")}
          </p>
          <p>Filesize: {(item.filesize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Mime-type: {item.media_type}</p>
          <p>Owner: {item.username}</p>
        </div>
        <p>
          <Link
            className="w-full block bg-teal-500 p-2 text-center transition-all duration-500 ease-in-out hover:bg-black rounded-2xl "
            to="/single"
            state={{ item }}
          >
            View this incredible post!
          </Link>
          {user &&
            (user.user_id === item.user_id || user.level_name === "Admin") && (
              <>
                <Link
                  className="w-full block bg-purple-400 p-2 text-center transition-all duration-500 ease-in-out hover:bg-black rounded-2xl"
                  to="/modify"
                  state={{ item }}
                >
                  Modify
                </Link>
                <button
                  onClick={handleDelete}
                  className="w-full block bg-red-500 p-2 text-center transition-all duration-500 ease-in-out hover:bg-black  justify-center cursor-pointer rounded-2xl"
                >
                  Delete
                </button>
              </>
            )}
        </p>
      </div>
    </article>
  );
};

export default MediaRow;
