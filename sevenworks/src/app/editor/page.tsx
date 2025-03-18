"use client";

import Navbar from "./navbar";
import IconBar from "./iconbar";
import InputFields from "./inputfields";
import EditorWindow from "./editorwindow";
import RightView from "./rightview";

export default function Editor() {
    return (
    <div className="bg-white h-screen p-3 flex flex-col">
      <Navbar />
      <div className="flex-1 flex w-full pt-5 gap-2">
        <IconBar />
        <InputFields />
        <EditorWindow />
        <RightView />
        </div>
    </div>
    );
}