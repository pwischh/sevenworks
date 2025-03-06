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

        //Check if ref properly retrieved html
        if (!componentRef.current) {
            console.error("Component reference is null");
            return;
        }

        //temporarily update styles to render entire resume -- even overflow
        componentRef.current.style.height = "auto";
        const div = componentRef.current.querySelector(".scroll-div") as HTMLDivElement | null;
        if (div) div.style.overflow = "visible"
        else{
            console.error("No div retrieved");
            return;
        }

        //Begin pdf export process
        try {
            //Create canvas capturing entire template
            const canvas = await html2canvas(componentRef.current, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: true,
            });
            
            //page dimensions in inches
            const pageWidth = 8.5;
            const pageHeight = 11;

            //Get scale factor -- needed because canvas dimensions are in pixels
            const scale = pageWidth/canvas.width;
            //Get scaled height of ONE page
            const pageCanvasHeight = pageHeight/scale;

            //Calc total number of pages needed
            const totalPages = Math.ceil(canvas.height/pageCanvasHeight);
            
            //Create jsPDF instance
            const pdf = new jsPDF("portrait", "in", [pageWidth, pageHeight]);

            for (let page = 0; page < totalPages; page++) {
                // Create a temp canvas with a fixed height equal to one page in canvas pixels.
                const pageCanvas = document.createElement("canvas");
                pageCanvas.width = canvas.width;
                pageCanvas.height = pageCanvasHeight; // fixed height for uniformity
          
                const ctx = pageCanvas.getContext("2d");
                if (!ctx) {
                  console.error("2D context not available");
                  return;
                }
          
                // Calculate the source Y offset for this page slice.
                const srcY = page * pageCanvasHeight;
                // For the last page, if the remaining content is less than a full page, get that remainder.
                let srcHeight = pageCanvasHeight;
                if (page === totalPages - 1 && canvas.height - srcY < pageCanvasHeight) {
                  srcHeight = canvas.height - srcY;
                }

                if (srcHeight < 10) break;
          
                // Draw the corresponding slice from the full canvas onto the temporary canvas.
                // If this is the last page and srcHeight is smaller, only that part will be drawn.
                ctx.drawImage(
                  canvas,
                  0, srcY,              // source x, y
                  canvas.width, srcHeight,  // source width, height
                  0, 0,                 // destination x, y
                  canvas.width, srcHeight   // destination width, height
                );
                
                // If this is the last page fill the rest with white.
                if (srcHeight < pageCanvasHeight) {
                  ctx.fillStyle = "#FFFFFF";
                  ctx.fillRect(0, srcHeight, canvas.width, pageCanvasHeight - srcHeight);
                }
          
                // Convert the temporary canvas slice to an image.
                const img = pageCanvas.toDataURL("image/png");
                if (page > 0) {
                  pdf.addPage();
                }
                
                pdf.addImage(img, "PNG", 0, 0, pageWidth, pageHeight);
              }

            console.log("Canvas Height:", canvas.height);
            console.log("Page Height in Pixels:", pageCanvasHeight);
            console.log("Total Pages:", totalPages);
            //Save pdf
            pdf.save("test.pdf")
        } catch(error) {
            console.error("Error generating PDF: ", error)
        } finally {
            //reset styles
            componentRef.current.style.height = "";
            div.style.overflow = "scroll";
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
                    className="px-4 py-2 border-2 border-gray-400 text-gray-700 rounded-md">
                    Export as PDF
                </button>
            </form>
            <div className="flex justify-center items-center w-full h-screen bg-offWhite">
                <BusinessTemplate values={form} ref={componentRef}/>
            </div>
        </div>
    )
}