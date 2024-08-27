"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "/home/dinar/myprojects/rankings/src/app/VideoPlayer.js";

type MusicTrack = {
  id: number;
  name: string;
  link: string;
};
type PlaceProps = {
  musicTrack: MusicTrack | null;
  placeHere: (index: number) => void;
  index: number;
};

function Place(props: PlaceProps) {
  const musicTrack = props.musicTrack;
  let place;
  function clickHandler() {
    return props.placeHere(props.index);
  }
  if (musicTrack === null) {
    place = <button onClick={clickHandler}>Here</button>;
  } else {
    place = musicTrack.name;
  }
  return <div className="top-place">{place}</div>;
}

export default function Home() {
  const reloadPage = () => {
    window.location.reload();
  };

  const [tracks, deleteTrack] = useState<Array<MusicTrack>>(
    require("./data.json")
  );
  console.log(tracks);
  let randomNum = Math.trunc(Math.random() * tracks.length);

  let randomTrack = tracks.at(randomNum);
  while (randomTrack === undefined) {
    randomNum = Math.trunc(Math.random() * tracks.length);
    randomTrack = tracks.at(randomNum);
  }

  if (randomTrack === undefined) {
    throw new Error("Its cant be possible");
  }
  const [places, setPlaces] = useState<Array<MusicTrack | null>>([
    null,
    null,
    null,
    null,
    null,
  ]);

  function placeHere(index: number) {
    if (randomTrack === undefined) {
      return;
    }
    const newValue = [...places];
    newValue[index] = randomTrack;
    const newTracks = [...tracks];
    delete newTracks[randomNum];
    setPlaces(newValue);
    deleteTrack(newTracks);
  }

  return (
    <main>
      <div className="header">Ranking</div>
      <div className="music-player">
        {places.includes(null) ? (
          <VideoPlayer videoUrl={randomTrack.link} />
        ) : (
          <p>That's all</p>
        )}
      </div>
      <div style={{ paddingTop: "1rem" }}></div>
      <div className="places">
        {places.map((place, index) => {
          return (
            <Place
              index={index}
              placeHere={placeHere}
              musicTrack={place}
              key={index}
            ></Place>
          );
        })}
      </div>
      <div className="refresh-button">
        <button onClick={reloadPage}>Refresh</button>
      </div>
    </main>
  );
}
