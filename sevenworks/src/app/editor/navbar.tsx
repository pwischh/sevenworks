"use client";

export default function Navbar() {
    return (
        <div className="bg-white">
            <div className="pt-18 pb-18 pl-90 pr-90">
                <nav className="text-black flex flex-row gap-10 p-3 w-fit text-nowrap font-semibold mx-auto bg-[#E6E6E6] rounded-full p-4">
                    <span className="flex items-center gap-2">
                        <span>SevenWorks</span>
                    </span>
                    <span className="flex items-center gap-2">
                        <img src="/zoom-out.svg" alt="zoom out" className="w-6 h-6" />
                        <span>Zoom</span>
                        <img src="/zoom-in.svg" alt="zoom in" className="w-6 h-6" />
                    </span>
                    <span className="self-center h-6 border-r border-black"></span>
                    <span className="flex items-center gap-2">
                        <span>Font</span>
                        <img src="/chevron-down.svg" alt="chevron down" className="w-6 h-6" />
                    </span>
                    <span className="flex items-center gap-2">
                        <span>Font Size</span>
                        <img src="/chevron-down.svg" alt="chevron down" className="w-6 h-6" />
                    </span>
                    <span className="flex items-center gap-2">
                        <img src="/list.svg" alt="list" className="w-6 h-6" />
                    </span>
                    <span className="flex items-center gap-2">
                        <img src="/link.svg" alt="link" className="w-6 h-6" />
                    </span>
                    <span className="self-center h-6 border-r border-black"></span>
                    <span className="flex items-center gap-2">
                        <img src="/save.svg" alt="save" className="w-6 h-6" />
                    </span>
                    <span className="flex items-center gap-2">
                        <img src="/refresh-cw.svg" alt="refresh-cw" className="w-6 h-6" />
                    </span>
                    <span className="flex items-center gap-2">
                        <img src="/download.svg" alt="download" className="w-6 h-6" />
                    </span>
                    <span className="flex items-center gap-2">
                        <img src="/settings.svg" alt="settings" className="w-6 h-6" />
                    </span>
                    <span className="flex items-center gap-2 text-red-500">
                        <img src="/log-out.svg" alt="logout" className="w-6 h-6" />
                    </span>
                </nav>
            </div>
        </div>
    );
}
