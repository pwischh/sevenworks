"use client";

import Navbar from "./navbar";
import IconBar from "./iconbar";
import InputFields from "./inputfields";
import EditorWindow from "./editorwindow";
import RightView from "./rightview";
import { useEffect } from "react";
import { useAuth } from "../authContext";
import { useRouter } from "next/navigation";
import { FormProvider } from "./formcontext";

export default function Editor() {

    const { user, loading } = useAuth();
    const router = useRouter();

    //redirect if user isn't logged in
    useEffect(() => {
      if (!loading && !user) {
        router.push("/register/login");
      }
    }, [user, loading, router]);

    return (
      <FormProvider>
        <div className="bg-white h-screen p-3 flex flex-col">
          <Navbar />
          <div className="flex-1 flex w-full pt-5 gap-2">
            <IconBar />
            <InputFields />
            <EditorWindow />
            <RightView />
          </div>
        </div>
      </FormProvider>
    );
}