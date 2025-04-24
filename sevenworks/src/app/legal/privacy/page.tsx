"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-navy to-darkRed px-4 relative">
      <button
        onClick={() => router.back()}
        className="absolute left-4 top-4 text-offWhite hover:text-neutral-400"
      >
        <IoIosArrowBack className="text-[36px]" />
      </button>

      <div className="bg-offWhite p-8 rounded-xl max-w-2xl w-full shadow-2xl border-b-4 border-lightGray">
        <h1 className="text-3xl font-extrabold text-navy mb-4">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          At SevenWorks, we take your privacy seriously.
        </p>
        <p className="text-gray-700 mb-4">
          We collect and store your email, display name, and optionally, profile preferences.
          This data is only used to personalize your experience and is never sold or shared
          with third parties.
        </p>
        <p className="text-gray-700 mb-4">
          All data is secured via Firebase Authentication. You can request account deletion at
          any time.
        </p>
        <p className="text-gray-700">
          Questions? Contact{" "}
          <a href="mailto:support@sevenworks.com" className="text-sky-600 underline">
            support@sevenworks.com
          </a>.
        </p>
      </div>
    </div>
  );
}

  