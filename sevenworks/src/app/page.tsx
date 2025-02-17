import Navbar from "./home/navbar";
import Landing from "./home/landing";

export default function Home() {
  return (
    <div className = "flex flex-col w-full h-fit justify-start bg-navy">
      <Navbar />
      <div className = "flex flex-col w-full h-fit justify-start pt-[75px]">
        <Landing />
      </div>
    </div>
  );
}
