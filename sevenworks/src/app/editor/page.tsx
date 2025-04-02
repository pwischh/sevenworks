"use client";

import Navbar from "./navbar";
import IconBar from "./iconbar";
import InputFields from "./inputfields";
import RightView from "./rightview";
import { useEffect, Suspense } from "react";
import { useAuth } from "../authContext";
import { useRouter } from "next/navigation";
import { FormProvider } from "./formcontext";

export default function Editor() {

    const { user, loading } = useAuth();
    const router = useRouter();

    // Redirect if user isn't logged in
    useEffect(() => {
      if (!loading && !user) {
        router.push("/register/login");
      }
    }, [user, loading, router]);

    return (
      <FormProvider>
        <div className="bg-white h-screen flex flex-col overflow-hidden pb-2">
        <Navbar />
        <div className="flex-1 flex w-full gap-2 min-h-0">
          <IconBar />
          <Suspense fallback={<div>Loading Input Fields...</div>}>
            <InputFields />
          </Suspense>
          <Suspense fallback={<div>Loading Editor...</div>}>
            {/* <EditorWindow /> */}
          </Suspense>
          <RightView />
        </div>
      </div>
      </FormProvider>
    );
}