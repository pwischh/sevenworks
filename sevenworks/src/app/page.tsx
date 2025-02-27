import Navbar from "./landing/navbar";
import Landing from "./landing/landing";
import TemplatePreview from "./landing/templatePrev";
import Head from "next/head";

export default function Home() {
  return (
    <div className = "flex flex-col w-full h-fit justify-start">
      <Navbar />
      <Head>
        <title>Sevenworks</title>
      </Head>
      <div className = "flex flex-col w-full h-fit justify-start pt-[75px]">
        <Landing />
        <TemplatePreview />
      </div>
    </div>
  );
}
