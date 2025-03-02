"use client";
import { useState } from "react";

export default function Demo() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        content: "",
    })

    const [html, setHtml] = useState("")

    fetch("/test_template.html").then((response) => response.text()).then((html) => setHtml(html))

    return(
        <div className="flex flex-row w-screen h-screen justify-between bg-white">
            <form className="flex flex-col gap-2 p-6">
                <input
                    className="border-[2px] border-gray-400 px-2 rounded-md text-gray-700"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="first name"
                />
                <input
                    className="border-[2px] border-gray-400 px-2 rounded-md text-gray-700"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="last name"
                />
                <textarea
                    className="border-[2px] border-gray-400 px-2 rounded-md resize-none text-gray-700"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="content"
                />
            </form>
            <div className="flex w-full justify-center items-center">
                <div dangerouslySetInnerHTML={{__html: html}} 
                className="w-[40%] h-[80%] shadow-xl rounded-lg bg-offWhite text-black overflow-scroll">
                    
                </div>
            </div>
        </div>
    )
}