"use client"

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../authContext";
import Link from "next/link";
import Image from "next/image";
import { 
    LuFiles, 
    LuBriefcaseBusiness,
    LuAtom,
    LuHospital,
    LuGavel,
    LuPaintbrush,
    LuEarth,
    LuLandmark,
    LuChevronUp } from "react-icons/lu";
import { collection, doc, setDoc, getDocs, getDoc, addDoc } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { useFormContext } from "../editor/formcontext";
import Navbar from "../landing/components/navbar";

export interface Resume {
    id: string;
    title: string;
    description: string;
    image: string;
}

const ResumeCard = ({ resume }: { resume: Resume }) => {
    const [hoveredResume, setHoveredResume] = useState<string | null>(null);
    const [setResumeLoading] = useState(false);
    const { formData, setFormData } = useFormContext();
    const router = useRouter();
    const {user, loading} = useAuth();

    const categories = (category: string) => {
        switch(category){
            case "Business": return (
                <LuBriefcaseBusiness className="w-[28px] h-[28px]"/>
            );
            case "STEM": return (
                <LuAtom className="w-[28px] h-[28px]"/>
            );
            case "Health & Human Services": return (
                <LuHospital className="w-[28px] h-[28px]"/>
            );
            case "Law": return (
                <LuGavel className="w-[28px] h-[28px]"/>
            );
            case "Creative": return (
                <LuPaintbrush className="w-[28px] h-[28px]"/>
            );
            case "Environmental & Sustainability": return (
                <LuEarth className="w-[28px] h-[28px]"/>
            );
            case "Policy, Government & International Affairs": return (
                <LuLandmark className="w-[28px] h-[28px]"/>
            )
        }

        return;
    }

    async function handleResumeClick() {
        setResumeLoading(true);

        //reset session formData state
        setFormData("RESET", "");
        const templateID = resume.title;

        try {
            const user = auth.currentUser
            if (!user) {
                throw new Error("User not authenticated");
            }

            const userDocsRef = doc(db, "user_resumes", user.uid);
            const userDocsSnap = await getDoc(userDocsRef);

            //If this is user's first resume, create a new doc in db
            if (!userDocsSnap.exists()) {
                const date = new Date();
                const currentTime = date.toLocaleDateString();
                await setDoc(userDocsRef, {createdAt: currentTime});
            }

            const userResumesRef = collection(userDocsRef, "resumes");

            //Define data for in-progress resume to be stored in db
            const inProgressResume = {
                templateID,
                formData,
                name: "Untitled Resume",
                image: resume.image,
            }

            //Add in-progress resume to db, making sure to save the DocumentReference to a variable
            const newResume = await addDoc(userResumesRef, inProgressResume);
            console.log("New resume stored successfully");

            //Get the ID and fields of the newly created resume 
            const userSessionRef = doc(db, "sessions", user.uid);
            const userResumeID = newResume.id;
            const userResumeData = (await getDoc(doc(db, "user_resumes", user.uid, "resumes", userResumeID))).data();

            if (!userResumeData) {
                throw new Error("Error retrieving resume data");
            }

            //Get name of the template being used
            const userTemplateID = userResumeData.templateID;

            //Set session data to the correct resumeID and templateID
            await setDoc(userSessionRef, {resumeID: userResumeID, templateID: userTemplateID}, {merge: true});
            console.log("Session data updated successfully");
        } catch (error) {
            console.error("Error adding resume: ", error);
        } finally {
            setResumeLoading(false)
            router.push("/editor");
        }

    }

    return(
        <div className="relative z-0 flex flex-col items-center w-full p-4 bg-gray-100 rounded-lg border-[1px] border-gray-200 cursor-pointer hover:shadow-md"
            onMouseEnter={() => {setHoveredResume(resume.title)}}
            onMouseLeave={() => {setHoveredResume(null)}}>
            {/* Triangle */}
            <div className="flex absolute top-0 right-0 z-9 rounded-tr-lg inline-block w-0 h-0 border-solid border-t-0 border-r-[80px] border-l-0 border-b-[80px] border-l-transparent border-r-navy border-t-transparent border-b-transparent">
                <div className="absolute left-[42px] top-[9px] z-11 text-offWhite">
                    {categories(resume.description)}
                </div>
            </div>
            {/* Document Thumbnail */}
            <div className="relative z-[-1] w-full aspect-[8.5/11] bg-white rounded-md border border-gray-200 overflow-hidden">
                {resume.image && (
                    <Image
                        src={resume.image}
                        alt={resume.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                )}
                {/* Hover Overlay */}
                <div 
                    className={`flex flex-col gap-2 justify-center items-center absolute top-0 rounded-md w-full h-full bg-black/40 
                        font-medium text-offWhite text-[16px] transition duration-200
                        ${hoveredResume === resume.title ? "opacity-100" : "opacity-0"}`}
                >
                    {(!user || loading) ? (
                        <Link href="/register/login" className="px-3 py-2 bg-slate-600 rounded-xl" >
                            Log in to use
                        </Link>
                    ) : (
                        <button className="px-3 py-2 bg-lightRed rounded-xl hover:bg-darkRed" 
                            onClick={handleResumeClick}
                        >
                            Use Template
                        </button>
                    )}
                </div>
            </div>
            {/* Title & Description */}
            <div className="mt-2 text-center">
                <h3 className={`text-md font-semibold transition duration-200 ${hoveredResume === resume.title ? "text-lightRed" : "text-navy"}`}>{resume.title}</h3>
                <p className={`text-sm font-medium transition duration-200 ${hoveredResume === resume.title ? "text-lightRed" : "text-gray-600"}`}>{resume.description}</p>
            </div>
        </div>
    );
};

export default function Templates() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [resumeList, setResumeList] = useState<Resume[]>([]);
    const [buttonVisible, setButtonVisible] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchTemplateResumes = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "resume_templates"));
            const templatesData = querySnapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                title: data.name,
                description: data.category,
                image: data.image,
              };
            });
            setResumeList(templatesData);
          } catch (error) {
            console.error("Error fetching resume templates:", error);
          }
        };
    
        fetchTemplateResumes();
      }, []);


      useEffect(() => {
        const container = scrollRef.current
        if (!container) return;

        const handleScroll = () => {
          if (container.scrollTop > 300) {
            setButtonVisible(true);
          } else {
            setButtonVisible(false);
          }
        };
    
        container.addEventListener('scroll', handleScroll);
        return () => {
          container.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <div ref={scrollRef} className="flex flex-col w-screen h-screen justify-start items-center bg-white gap-2 overflow-scroll">
            <Navbar />
            <div className="flex flex-col w-screen h-fit justify-start items-center gap-2 bg-gradient-to-b from-navy to-darkRed">
                {/* Back to top button */}
                <div 
                    className={`group z-10 flex justify-center items-center absolute bottom-3 right-3 p-2 text-offWhite bg-lightRed rounded-full shadow-md 
                    ${buttonVisible ? "opacity-100 cursor-pointer" : "opacity-0"} transition duration-500`}
                    onClick={() => {
                        if (buttonVisible) scrollRef.current?.scrollTo({top: 0, behavior: "smooth"})
                    }}
                >
                    <span className="overflow-hidden whitespace-nowrap transition-all duration-300 max-w-0 group-hover:max-w-[150px] group-hover:px-2 font-medium">
                        Back to top
                    </span>
                    <LuChevronUp className="w-[38px] h-[38px]"/>
                </div>
                {/* Heading Text */}
                <div className="flex flex-col w-screen h-fit gap-2 items-center py-2 text-offWhite px-20">
                    <h1 className="color-offWhite text-[36px] font-bold text-center pt-20">Resume Templates</h1>
                    <h2 className="color-offWhite text-[22px] font-medium italic text-center">Choose from our list of curated resume templates, designed for your success.</h2>
                </div>
                {/* Categories */}
                <div className="flex flex-col justify-center items-center w-screen h-fit g-2 pt-6 pb-4 px-20">
                    <div className="flex flex-row justify-center items-center w-[100%] h-fit mb-1 gap-5 text-[14px] font-medium text-nowrap">
                        <div 
                            className={`flex items-center justify-center p-1 px-2 gap-2 w-fit h-fit rounded-3xl cursor-pointer hover:text-offWhite transition duration-200
                                ${activeCategory === "all" ? "text-offWhite bg-white/10 scale-105" : "text-[#b59a9a]"}`}
                            onClick={()=>setActiveCategory("all")}
                        >
                            <LuFiles className="w-[22px] h-[22px]"/>
                            <p>All Templates</p>
                        </div>
                        <div 
                            className={`flex items-center justify-center p-1 px-2 gap-2 w-fit h-fit rounded-3xl cursor-pointer hover:text-offWhite transition duration-200
                                ${activeCategory === "Business" ? "text-offWhite bg-white/10 scale-105" : "text-[#b59a9a]"}`}
                            onClick={()=>setActiveCategory("Business")}
                        >
                            <LuBriefcaseBusiness className="w-[22px] h-[22px]"/>
                            <p>Business</p>
                        </div>
                        <div 
                            className={`flex items-center justify-center p-1 px-2 gap-2 w-fit h-fit rounded-3xl cursor-pointer hover:text-offWhite transition duration-200
                                ${activeCategory === "STEM" ? "text-offWhite bg-white/10 scale-105" : "text-[#b59a9a]"}`}
                            onClick={()=>setActiveCategory("STEM")}
                        >
                            <LuAtom className="w-[22px] h-[22px]"/>
                            <p>STEM</p>
                        </div>
                        <div 
                            className={`flex items-center justify-center p-1 px-2 gap-2 w-fit h-fit rounded-3xl cursor-pointer hover:text-offWhite transition duration-200
                                ${activeCategory === "Health & Human Services" ? "text-offWhite bg-white/10 scale-105" : "text-[#b59a9a]"}`}
                            onClick={()=>setActiveCategory("Health & Human Services")}
                        >
                            <LuHospital className="w-[22px] h-[22px]"/>
                            <p>Health & Human Services</p>
                        </div>
                        <div 
                            className={`flex items-center justify-center p-1 px-2 gap-2 w-fit h-fit rounded-3xl cursor-pointer hover:text-offWhite transition duration-200
                                ${activeCategory === "Law" ? "text-offWhite bg-white/10 scale-105" : "text-[#b59a9a]"}`}
                            onClick={()=>setActiveCategory("Law")}
                        >
                            <LuGavel className="w-[22px] h-[22px]"/>
                            <p>Law</p>
                        </div>
                        <div 
                            className={`flex items-center justify-center p-1 px-2 gap-2 w-fit h-fit rounded-3xl cursor-pointer hover:text-offWhite transition duration-200
                                ${activeCategory === "Policy, Government & International Affairs" ? "text-offWhite bg-white/10 scale-105" : "text-[#b59a9a]"}`}
                            onClick={()=>setActiveCategory("Policy, Government & International Affairs")}
                        >
                            <LuLandmark className="w-[22px] h-[22px]"/>
                            <p>Government & Policy</p>
                        </div>
                        <div 
                            className={`flex items-center justify-center p-1 px-2 gap-2 w-fit h-fit rounded-3xl cursor-pointer hover:text-offWhite transition duration-200
                                ${activeCategory === "Environmental & Sustainability" ? "text-offWhite bg-white/10 scale-105" : "text-[#b59a9a]"}`}
                            onClick={()=>setActiveCategory("Environmental & Sustainability")}
                        >
                            <LuEarth className="w-[22px] h-[22px]"/>
                            <p>Environmental & Sustainability</p>
                        </div>
                        <div 
                            className={`flex items-center justify-center p-1 px-2 gap-2 w-fit h-fit rounded-3xl cursor-pointer hover:text-offWhite transition duration-200
                                ${activeCategory === "Creative" ? "text-offWhite bg-white/10 scale-105" : "text-[#b59a9a]"}`}
                            onClick={()=>setActiveCategory("Creative")}
                        >
                            <LuPaintbrush className="w-[22px] h-[22px]"/>
                            <p>Creative</p>
                        </div>
                    </div>
                    <div className="w-full h-px bg-offWhite"></div>
                </div>
            </div>
            {/* Resumes */}
            <div className="grid grid-cols-3 gap-6 pb-4 w-full justify-items-center mt-2 px-20">
                {resumeList.map((resume) => {
                    if (!(activeCategory === "all") && (resume.description !== activeCategory)){
                        return;
                    }

                    return(
                        <div key={resume.id} className="flex w-full max-w-md">
                            <ResumeCard resume={resume} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}