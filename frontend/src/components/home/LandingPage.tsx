import Image from "next/image";
import styles from "./home.module.css";
import { FCIcon } from "@/assets";
import { BiSolidRightArrow } from "react-icons/bi";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { GoArrowUpRight } from "react-icons/go";

export default function LandingPage() {
  return (
    <section
      className={`h-screen ${styles.TopBg} bg-cover bg-center bg-no-repeat  `}
    >
      <div className="text-center flex flex-col space-y-7 justify-center items-center h-full backdrop-blur-sm bg-black/20">
        <div className="px-5 py-2 ">
          <div className="rounded-full bg-white/10   border border-slate-200/10 text-white px-5 py-2 flex flex-row items-center justify-between space-x-4 ">
            <Image src={FCIcon} alt="" width={30} />
            <p>Unlock your arguments potentials</p>
            <BiSolidRightArrow className="animate-spin" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <h1 className="text-6xl text-white font-semibold">
            One-click for Fallacy Detection
          </h1>
          <h2 className="text-lg text-gray-300">
            Uncover flawed arguments instantly, where advanced AI meets critical
            thinking expertise.
          </h2>
        </div>

        {/* CTA Section */}
        <div className="pt-8">
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="flex flex-row text-lg  items-center text-white py-3 px-5 bg-white/10 rounded-full space-x-2 hover:scale-105 transition-all duration-100">
                <p>Get Started</p>
                <GoArrowUpRight />
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <button
              onClick={() => (window.location.href = "/app")}
              className="flex flex-row items-center text-white py-3 px-5 bg-white/10 rounded-full space-x-2 hover:scale-105 transition-all duration-100"
            >
              Go to Dashboard
            </button>
          </SignedIn>
        </div>
      </div>
    </section>
  );
}
