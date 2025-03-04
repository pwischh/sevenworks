"use client";
import { useState } from "react";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import BusinessTemplate from "../TEST-TEMPLATES/business-template";

export default function Demo() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        content: "",
    })

    const componentRef = useRef<HTMLDivElement>(null);

    async function exportToPDF(){
      if (!componentRef.current) {
        console.error("Component reference is null");
        return;
      }
      
      console.log("Component html: ", componentRef.current)
      console.log("Component width: ", componentRef.current.offsetWidth)

      try {
        componentRef.current.style.background = "white";
        console.log("Creating canvas")
        const canvas = await html2canvas(componentRef.current, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: true,
        });
        console.log("Canvas created")
        const img = canvas.toDataURL("image/png")

        const pdf = new jsPDF("portrait", "in", [8.5, 11]);
        pdf.addImage(img, "PNG", 0, 0, 8.5, 11);

        pdf.save("test-pdf.pdf")
      } catch(error) {
        console.error("Error generating PDF: ", error)
      }
    }

    return(
        <div className="flex flex-row w-screen h-screen justify-between bg-white">
            <form className="flex flex-col gap-2 p-6" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="border-[2px] border-gray-400 px-2 rounded-md text-gray-700"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="first name"
                    name="firstName"
                />
                <input
                    className="border-[2px] border-gray-400 px-2 rounded-md text-gray-700"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="last name"
                    name="lastName"
                />
                <textarea
                    className="border-[2px] border-gray-400 px-2 rounded-md resize-none text-gray-700"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="content"
                    name="content"
                />
                <button
                    onClick={exportToPDF}
                    className="px-4 py-2 border-2 border-gray-400 text-gray-700 rounded-md"
                >
                    Export as PDF
                </button>
            </form>
            <div className="flex justify-center items-center w-full h-screen">
                <BusinessTemplate values={form} ref={componentRef}/>
            </div>
        </div>
    )
}