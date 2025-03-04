import { forwardRef } from "react";
import { formValues } from "@/app/types";

const BusinessTemplate = forwardRef<HTMLDivElement, { values: formValues }>(
  ({ values }, ref) => {
    return (
      <div ref={ref} className="w-fit h-fit">  {/* Make sure ref is applied to the outermost div */}
        <div className="bg-white text-black w-[95vw] max-w-[500px] border-2"
                style={{aspectRatio: "1 / 1.294"}}>
            {/* Resume content goes here */}
            <header className="border-b pb-4 px-4 pt-4">
              <h1 className="text-xl font-bold">{values.firstName}&nbsp;{values.lastName}</h1>
              <p className="text-sm text-gray-600">
                Email: john.doe@example.com | Phone: 123-456-7890
              </p>
            </header>
            <main className="px-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <section>
                  <h2 className="text-lg font-semibold mb-2">Profile</h2>
                  <p className="text-sm text-gray-700">
                    {values.content}
                  </p>
                  <h2 className="text-lg font-semibold mt-4 mb-2">Skills</h2>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    <li>Skill One</li>
                    <li>Skill Two</li>
                    <li>Skill Three</li>
                  </ul>
                </section>
                {/* Right Column */}
                <section>
                  <h2 className="text-lg font-semibold mb-2">Experience</h2>
                  <div className="mb-4">
                    <h3 className="font-medium">Job Title at Company</h3>
                    <p className="text-sm text-gray-600">Jan 2020 – Present</p>
                    <p className="text-sm">
                      Description of responsibilities and achievements.
                    </p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Education</h2>
                    <h3 className="font-medium">Degree, Institution</h3>
                    <p className="text-sm text-gray-600">Graduation Date</p>
                  </div>
                </section>
              </div>
            </main>
          </div>
      </div>      
    );
  }
);

BusinessTemplate.displayName = "BusinessTemplate";
export default BusinessTemplate;
