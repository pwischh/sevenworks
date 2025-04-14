"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BusinessTemplate from "./business_template";
import Image from "next/image";

export default function DownloadButton({ formData }: { formData: any }) {
  return (
    <PDFDownloadLink
      document={<BusinessTemplate formData={formData} />}
      fileName="exported_form.pdf"
      className="hover:opacity-65 transition-opacity duration-200"
    >
      <Image src="/download.svg" alt="download" width={24} height={24} className="hover:scale-110 transition-transform duration-200" />
    </PDFDownloadLink>
  );
}
