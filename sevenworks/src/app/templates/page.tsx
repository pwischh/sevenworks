"use client"

import { useState, useEffect, useRef } from "react";
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
import { collection, getDocs, doc, getDoc, addDoc, setDoc, Timestamp, query, where } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import Navbar from "../landing/components/navbar";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

interface Resume {
    id: string;
    title: string;
    description: string;
    image?: string;
}

const ResumeCard = ({ resume }: { resume: Resume }) => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [hasExistingResume, setHasExistingResume] = useState(false);
    const [existingResumeId, setExistingResumeId] = useState<string | null>(null);
    
    // Check if user already has this resume template
    useEffect(() => {
        const checkExistingResume = async () => {
            if (!user) return;
            
            try {
                const userResumesRef = collection(db, "user_resumes", user.uid, "resumes");
                const querySnapshot = await getDocs(userResumesRef);
                
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.templateID === resume.id || data.name === resume.title) {
                        setHasExistingResume(true);
                        setExistingResumeId(doc.id);
                    }
                });
            } catch (error) {
                console.error("Error checking existing resume:", error);
            }
        };
        
        checkExistingResume();
    }, [user, resume.id, resume.title]);

    const categories = (category: string) => {
        switch(category){
            case "Business": 
                return (<LuBriefcaseBusiness />);
            case "STEM": 
                return (<LuAtom />);
            case "Health & Human Services": 
                return (<LuHospital />);
            case "Law": 
                return (<LuGavel />);
            case "Environmental & Sustainability": 
                return (<LuEarth />);
            case "Policy, Government & International Affairs": 
                return (<LuLandmark />);
            case "Creative": 
                return (<LuPaintbrush />);
            default: 
                return (<LuFiles />);
        }
    };

    async function handleTemplateClick() {
        if (!user) {
            console.error("User not authenticated");
            router.push("/register/login");
            return;
        }

        try {
            console.log("Template clicked:", resume.id, resume.title);
            
            // Check if the user already has a resume with this template
            // We need to be more flexible about how we check for existing templates
            const userResumesRef = collection(db, "user_resumes", user.uid, "resumes");
            const querySnapshot = await getDocs(userResumesRef);
            
            // Check all user resumes to find one with matching template
            let existingResume: { id: string; templateID: string; formData: any } | null = null;

            for (const docSnapshot of querySnapshot.docs) { // Use for...of loop
                const data = docSnapshot.data();
                const templateMatches =
                    data.templateID === resume.id ||
                    data.name === resume.title;

                if (templateMatches) {
                    existingResume = {
                        id: docSnapshot.id,
                        templateID: data.templateID,
                        formData: data.formData || {}
                    };
                    console.log("Found existing resume:", existingResume);
                    break; // Exit loop once found
                }
            }
            
            // If user already has this resume, edit it instead of creating a new one
            if (existingResume) {
                console.log("Editing existing resume:", existingResume.id);
                
                // Update session with this resume's data
                await setDoc(doc(db, "sessions", user.uid), {
                    resumeID: existingResume.id,
                    templateID: existingResume.templateID,
                    formData: existingResume.formData || {},
                }, { merge: false });
                
                // Store resumeID in localStorage for persistence
                localStorage.setItem('currentResumeID', existingResume.id);
                
                // Navigate to editor
                router.push("/editor");
                return;
            }
            
            // If no existing resume found, create a new one
            console.log("Creating new resume from template:", resume.id);
            
            // 1. Get the selected template data from resume_templates
            const templateRef = doc(db, "resume_templates", resume.id);
            const templateSnap = await getDoc(templateRef);

            if (!templateSnap.exists()) {
                throw new Error("Template not found!");
            }
            const templateData = templateSnap.data();

            // 2. Create a new resume document in user_resumes collection
            const newResumeRef = await addDoc(collection(db, "user_resumes", user.uid, "resumes"), {
                templateID: resume.id, // Reference to the original template
                name: resume.title, // Use the title from the UI component for consistency
                formData: templateData.formData || {}, // Copy initial form data
                image: templateData.image || "/sample-business-resume.png", // Use template image or default
                category: templateData.category || "Business",
                createdAt: Timestamp.now(),
                lastModified: Timestamp.now(),
            });

            const newResumeID = newResumeRef.id;

            // 3. Update the user's session data
            await setDoc(doc(db, "sessions", user.uid), {
                resumeID: newResumeID,
                templateID: resume.id,
                formData: templateData.formData || {},
            }, { merge: false }); // Overwrite existing session

            // Store resumeID in localStorage to persist through refreshes
            localStorage.setItem('currentResumeID', newResumeID);

            // 4. Redirect to the editor page
            router.push("/editor");

        } catch (error) {
            console.error("Error handling resume template:", error);
        }
    }

    return(
        <div 
            className="relative z-0 flex flex-col items-center w-full p-4 bg-gray-100 rounded-lg border-[1px] border-gray-200 cursor-pointer group hover:shadow-lg transition-shadow duration-200"
            onClick={handleTemplateClick}
        >
            {/* Triangle */}
            <div className="flex absolute top-0 right-0 z-9 rounded-tr-lg w-0 h-0 border-solid border-t-0 border-r-[80px] border-l-0 border-b-[80px] border-l-transparent border-r-navy border-t-transparent border-b-transparent">
                <div className="absolute left-[42px] top-[9px] z-11 text-offWhite">
                    {categories(resume.description)}
                </div>
            </div>
            {/* Document Thumbnail */}
            <div className="relative z-[-1] w-full aspect-[8.5/11] bg-white rounded-md shadow overflow-hidden">
            {resume.image && (
                <Image
                    src={resume.image}
                    alt={resume.title}
                    fill
                    className="object-cover"
                />
            )}
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <span className="text-white text-lg font-semibold bg-navy/70 px-4 py-2 rounded">Use Template</span>
            </div>
      
            {/* Title & Description */}
            <div className="mt-2 text-center">
                <h3 className=" text-navy text-md font-semibold">{resume.title}</h3>
                <p className="text-sm font-medium text-gray-600">{resume.description}</p>
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
                    ${buttonVisible ? "opacity-100 cursor-pointer" : "opacity-0"} transition duration-400`}
                    onClick={() => {
                        if (buttonVisible) scrollRef.current?.scrollTo({top: 0, behavior: "smooth"})
                    }}
                >
                    <span className="overflow-hidden whitespace-nowrap transition-all duration-400 max-w-0 group-hover:max-w-[150px] group-hover:px-2 font-medium">
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
