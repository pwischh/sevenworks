"use client";

export default function Navbar() {
    return (
        <div className="bg-white">
            <div className="pt-18 pb-18 pl-90 pr-90">
                <nav className="text-black flex flex-row gap-10 p-3 w-fit text-nowrap font-semibold mx-auto bg-[#E6E6E6] rounded-full p-4">
                    <a href="#">Zoom</a>
                    <a href="#">Font</a>
                    <a href="#">Font Size</a>
                    <a href="#">Bullet</a>
                    <a href="#">Link</a>
                    <a href="#">Save</a>
                    <a href="#">Bullet</a>
                    <a href="#">Reload</a>
                    <a href="#">Download</a>
                    <a href="#">Settings</a>
                    <a href="#">Logout</a>
                </nav>
            </div>
        </div>
    );
}
