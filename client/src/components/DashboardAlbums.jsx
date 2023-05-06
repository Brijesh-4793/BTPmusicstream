import React, { useEffect } from 'react'
import { useStateValue } from '../Context/StateProvider';
import { actionType } from '../Context/reducer';
import SongCard from './SongCard';
import { getAllAlbums } from '../api';

function DashboardAlbums() {
  const [{ allAlbums }, dispath] = useStateValue();
  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispath({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        });
      });
    }
  }, []);
  return (
    <div className="w-full my-8 p-4 py-16 flex items-center justify-center flex-col">
    <div className="relative w-full  my-4 p-4 py-12 border border-gray-300 rounded-md">



<AlbumContainer data={allAlbums} />


      </div>
      
    </div>
  )
}

export const AlbumContainer = ({ data }) => {
  return (
    <div className=" w-full  flex flex-wrap gap-3  items-center justify-evenly">
      {data &&
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} type="album" />
        ))}
    </div>
  );
};


export default DashboardAlbums
