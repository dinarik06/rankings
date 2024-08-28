import { getTracks } from "@/app/actions";
import MyApp from "@/components/MyApp";

export default async function Home() {
  const tracks = await getTracks();
  return (
    <div>
      <MyApp initialTracks={tracks} />
    </div>
  );
}
