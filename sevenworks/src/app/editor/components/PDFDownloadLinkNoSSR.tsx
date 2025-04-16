"use client";
import dynamic from "next/dynamic";

const PDFDownloadLinkNoSSR = dynamic(
  () => import("@react-pdf/renderer").then(mod => mod.PDFDownloadLink),
  { ssr: false }
);

export default PDFDownloadLinkNoSSR;