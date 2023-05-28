import React from "react";
import StepperContainer from "@/components/StepperContainer";
import { ToastContainer } from 'react-toastify';



export default function Home({role}) {
  console.log("Role is :",role)

  return (
    <>
    <ToastContainer />
      <main className="grid grid-cols-1 bg-[#1E2125] text-white w-full h-auto justify-items-start md:flex mb-[5vh]">
        <div className=" md:w-full h-auto">
          <StepperContainer />
        </div>
      </main>
    </>
  );
}
