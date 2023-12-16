import Image from "next/image";

export default function HowItWorks2() {
  return (
    <div className="px-8 py-4 md:px-[128px] md:py-[75px]   flex flex-col justify-around gap-4 md:gap-16 items-center ">
      <div className="flex justify-center">
        <h1 className="text-center font-poppins text-[20px] md:text-[40px]  font-semibold text-black ">
          How it works
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 w-full">
        <div className="flex flex-col justify-around items-center gap-4 w-full">
          <Image
            src="/assets/step1.png"
            alt="logo"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={314}
            height={100}
          />
          <p className="text-center font-poppins text-base md:text-[20px]  font-semibold text-black ">
            Step 1
          </p>
          <p className="text-center font-poppins text-[10px] md:text-[20px] text-black max-w-[378px]  md:line-clamp-3">
            Upload your video, by default language is english, you can choose
            from 97 different languages.{" "}
          </p>
        </div>
        <div className="flex flex-col justify-around items-center gap-4 w-full">
          <Image
            src="/assets/step2.png"
            alt="logo"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={314}
            height={100}
          />
          <p className="text-center font-poppins text-base md:text-[20px]  font-semibold text-black ">
            Step 2
          </p>
          <p className="text-center font-poppins text-[10px] md:text-[20px] text-black max-w-[378px] md:line-clamp-3">
            Wait for upload & transcription, once done you will see the download
            button.{" "}
          </p>
        </div>
        <div className="flex flex-col justify-around items-center gap-4 w-full">
          <Image
            src="/assets/step3.png"
            alt="logo"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={314}
            height={100}
          />
          <p className="text-center font-poppins text-base md:text-[20px]  font-semibold text-black ">
            Step 3
          </p>
          <p className="text-center font-poppins text-[10px] md:text-[20px] text-black max-w-[378px] md:line-clamp-3">
            Download your captioned video and share it with the world, without
            any watermarks!{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
