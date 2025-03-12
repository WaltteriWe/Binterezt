// Upload.tsx
import { useState } from "react";
import { MediaItem } from "hybrid-types/DBTypes";
import { useLocation } from "react-router";
import { useMedia } from "../Hooks/apiHooks";
import { useForm } from "../Hooks/formHooks";

const Modify = () => {
  const { state } = useLocation();
  const item: MediaItem = state.item;
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string>("");

  const { modifyMedia } = useMedia();

  const initValues = {
    title: item.title,
    description: item.description || "",
  };

  const doUpload = async () => {
    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No file selected");
      }
      await modifyMedia(item.media_id, inputs, token);
      setUploadResult("Upload successful");
    } catch (e) {
      console.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(
    doUpload,
    initValues
  );

  return (
    <>
      {uploadResult ? (
        <>
          <h1>{uploadResult}</h1>
        </>
      ) : (
        <div className="flex flex-col items-center p-4">
          {uploading ? (
            <h1>Uploading...</h1>
          ) : (
            <>
              <h1 className="neon-text font-bold">Modify</h1>
              <form onSubmit={handleSubmit}>
                <div className="my-2 flex flex-col neon-text">
                  <label htmlFor="title">Title</label>
                  <input
                    name="title"
                    type="text"
                    id="title"
                    onChange={handleInputChange}
                    value={inputs.title}
                    className="my-2 rounded-sm neon-shadow bg-pink-500 w-64"
                  />
                </div>
                <div className="my-2 flex flex-col neon-text">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    rows={5}
                    id="description"
                    onChange={handleInputChange}
                    value={inputs.description}
                    className="my-2 rounded-sm neon-shadow bg-pink-500 w-64"
                  ></textarea>
                </div>
                <button
                  className="cursor-pointer rounded-sm bg-teal-500 hover:bg-pink-500 ease-in-out duration-700 p-2 text-2xl"
                  type="submit"
                  onClick={doUpload}
                >
                  Upload
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Modify;
