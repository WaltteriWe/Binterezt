import { MediaItemWithOwner } from "hybrid-types/DBTypes";
import { useState } from "react";
import { useMedia } from "../Hooks/apiHooks";
import MediaRow from "../components/MediaRow";
import SingleView from "../components/Singleview";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);

  const { mediaArray } = useMedia();

  console.log(mediaArray);

  return (
    <>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <h2 className="mb-4 neon-text font-bold">My Media</h2>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mediaArray.map((item) => (
          <MediaRow
            item={item}
            key={item.media_id}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </section>
    </>
  );
};
export default Home;
