import Navbar from "./landing/components/navbar";
import Landing from "./landing/landing";
import TemplatePreview from "./landing/components/templatePrev";
import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-fit justify-start">
      <Navbar />
      <Head>
        <title>Sevenworks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full h-fit justify-start pt-[30px]">
        <Landing />
        <TemplatePreview />
      </div>
    </div>
  );
}