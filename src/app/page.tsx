"use client";

import { useState } from "react";

type MusicTrack = {
  id: string;
  name: string;
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
  const tracks: Array<MusicTrack> = [
    { id: "1", name: "Music1" },
    { id: "2", name: "Music2" },
    { id: "3", name: "Music3" },
    { id: "4", name: "Music4" },
    { id: "5", name: "Music5" },
    { id: "6", name: "Music6" },
    { id: "7", name: "Music7" },
    { id: "8", name: "Music8" },
    { id: "9", name: "Music9" },
    { id: "10", name: "Music10" },
  ];
  const randomNum = Math.trunc(Math.random() * tracks.length);
  const randomTrack = tracks.at(randomNum);
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
    setPlaces(newValue);
  }

  return (
    <main>
      <div className="header">Ranking</div>
      <div className="music-player">{randomTrack.name}</div>
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
    </main>
  );
}
