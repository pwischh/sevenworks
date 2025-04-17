"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function TermsOfService() {
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
        <h1 className="text-3xl font-extrabold text-navy mb-4">Terms of Service</h1>
        <p className="text-gray-700 mb-4">
          Welcome to SevenWorks. By using our app, you agree to the following terms.
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>You must be at least 13 years old to use SevenWorks.</li>
          <li>You are responsible for your account and activity.</li>
          <li>You agree not to misuse or abuse the services provided.</li>
          <li>We may suspend accounts for behavior that violates these terms.</li>
        </ul>
        <p className="text-gray-700">
          For any questions or concerns, please contact{" "}
          <a href="mailto:support@sevenworks.com" className="text-sky-600 underline">
            support@sevenworks.com
          </a>.
        </p>
      </div>
    </div>
  );
}
  