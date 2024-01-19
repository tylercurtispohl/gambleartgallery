import Image from "next/image";
import { fetchPaintings } from "./lib/data";

export default async function Home() {
  const paintings = await fetchPaintings();

  return <main className="">Gallery</main>;
}
