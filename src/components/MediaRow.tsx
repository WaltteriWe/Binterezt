import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Link} from 'react-router';
import { useUserContext } from '../Hooks/ContextHooks';

type MediaItemProps = {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
};

const MediaRow = (props: MediaItemProps) => {
  const {user} = useUserContext();
  const {item} = props;
  return (
    <article className="w-full rounded-md bg-stone-600">
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
        <p className="max-w-full overflow-clip font-bold text-nowrap text-ellipsis text-stone-300">
          {item.description}
        </p>
        <div className="my-2 rounded-md border-1 border-stone-400 p-2">
          <p>
            Created at: <br />{' '}
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </p>
          <p>Filesize: {(item.filesize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Mime-type: {item.media_type}</p>
          <p>Owner: {item.username}</p>
        </div>
        <p>
          <Link
            className="w-full block bg-stone-500 p-2 text-center transition-all duration-500 ease-in-out hover:bg-stone-700 "
            to="/single"
            state={{item}}
          >
            Show
          </Link>
          {user && (user.user_id === item.user_id || user.level_name === 'Admin')&& (
            <>
            <Link
              className="w-full block bg-purple-800 p-2 text-center transition-all duration-500 ease-in-out hover:bg-stone-700 "
              to="/modify"
              state={{item}}
              >
              Modify
            </Link>
                <button onClick={() => {
                  console.log('Delete', item);
                }} className="w-full block bg-red-800 p-2 text-center transition-all duration-500 ease-in-out hover:bg-stone-700  justify-center cursor-pointer">Delete</button>
              </>
          )}

        </p>
      </div>
    </article>
  );
};

export default MediaRow;