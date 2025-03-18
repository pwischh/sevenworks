"use client";

import { useState } from "react";
import Navbar from "./navbar";
import IconBar from "./iconbar";
import InputFields from "./inputfields";
import EditorWindow from "./editorwindow";
import RightView from "./rightview";
import { useEffect } from "react";
import { useAuth } from "../authContext";
import { useRouter } from "next/navigation";

export default function Editor() {
<<<<<<< HEAD
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        content: "",
    });
=======

    const { user, loading } = useAuth();
    const router = useRouter();

    //redirect if user isn't logged in
    useEffect(() => {
      if (!loading && !user) {
        router.push("/register/login");
      }
    }, [user, loading, router]);
>>>>>>> 60db2736f7db906da6a256e7f6ee56717fa6f2e7

    return (
    <div className="bg-white h-screen p-3 flex flex-col">
      <Navbar />
      <div className="flex-1 flex w-full pt-5 gap-2">
        <IconBar />
        <InputFields form={form} setForm={setForm} />
        <EditorWindow form={form} />
        <RightView />
      </div>
    </div>
    );
}