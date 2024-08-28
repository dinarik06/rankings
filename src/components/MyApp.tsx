"use client";

import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";

export type MusicTrack = {
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

type MyAppProps = {
  initialTracks: Array<MusicTrack>;
};

export default function MyApp(props: MyAppProps) {
  const reloadPage = () => {
    window.location.reload();
  };

  const [tracks, setTracks] = useState<Array<MusicTrack>>(props.initialTracks);
  let randomNum = Math.trunc(Math.random() * tracks.length);

  let randomTrack = tracks.at(randomNum);

  if (randomTrack === undefined) {
    throw new Error("No tracks left");
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
    setTracks(newTracks);
  }

  return (
    <main>
      <div className="header">Ranking</div>
      <div className="music-player">
        {places.includes(null) ? (
          <VideoPlayer videoUrl={randomTrack.link} />
        ) : (
          <p>That&apos;s all</p>
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
