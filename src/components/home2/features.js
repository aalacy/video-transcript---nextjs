import Image from "next/image";

export default function Features() {
  return (
    <>
      <div className="px-8 py-4 md:px-[128px] md:py-[75px]  flex flex-col gap-[30px] md:gap-[60px] items-center">
        <div className="flex justify-center">
          <h1 className="text-center font-poppins text-[20px] md:text-[40px]  font-semibold text-black ">
            CapHacker Unmatched Features
          </h1>
        </div>
        <div className="flex flex-col gap-[50px] md:gap-[150px]">
          <div className="flex flex-col items-center  gap-[30px] md:gap-[54px]">
            <Image
              src="/assets/f1.png"
              alt="feature"
              className=" max-w-[530px] w-[200px] md:w-[530px]"
              width={530}
              height={410}
              style={{
                height: "auto",
              }}
            />
            <div className="">
              <p className="text-center text-[12px] md:text-[24px] font-bold">
                Super Duper Accurate
              </p>
              <p className="text-center text-[12px] md:text-[24px] font-poppins text-gray-400 md:line-clamp-3 max-w-[778px] max-h-[108px]">
                CapHacker is using the latest tech to convert your speech into
                text. Our AI is the most accurate when it comes to transcribing
                content.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-[30px] md:gap-[54px]">
            <Image
              src="/assets/f2.png"
              alt="feature"
              className="max-w-[530px] w-[200px] md:w-[530px]"
              width={530}
              height={410}
              style={{
                height: "auto",
              }}
            />
            <div className="">
              <p className="text-center text-[12px] md:text-[24px] font-bold">
                Pre-made templates
              </p>
              <p className="text-center text-[12px] md:text-[24px] font-poppins text-gray-400 md:line-clamp-3 max-w-[778px] max-h-[108px]">
                Explore our collection of 5 unique templates, each designed to
                give your videos a special touch. Just pick the one that fits
                your style!{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[30px] md:gap-[54px]">
            <Image
              src="/assets/f3.png"
              alt="feature"
              className="max-w-[894px] w-[200px] md:w-[894px]"
              width={894}
              height={410}
              style={{
                height: "auto",
              }}
            />
            <div className="">
              <p className="text-center text-[12px] md:text-[24px] font-bold">
                Customize As you like{" "}
              </p>
              <p className="text-center text-[12px] md:text-[24px] font-poppins text-gray-400 md:line-clamp-3 max-w-[778px] max-h-[108px]">
                Take control of your captions! Change the font style, color, and
                background. Add an outline or shadow to your text. Adjust their
                size and where they appear on your video.{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[30px] md:gap-[54px]">
            <Image
              src="/assets/f4.png"
              alt="feature"
              className="max-w-[530px] w-[200px] md:w-[530px]"
              width={530}
              height={410}
              style={{
                height: "auto",
              }}
            />
            <div className="">
              <p className="text-center text-[12px] md:text-[24px] font-bold">
                Download Captions as File or Video{" "}
              </p>
              <p className="text-center text-[12px] md:text-[24px] font-poppins text-gray-400 md:line-clamp-3 max-w-[778px] max-h-[108px]">
                As a registered user, get your captions as a separate file or
                with the video. We store them, so download anytime you want.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[30px] md:gap-[54px]">
            <Image
              src="/assets/f5.png"
              alt="feature"
              className="max-w-[530px] w-[200px] md:w-[530px]"
              width={530}
              height={410}
              style={{
                height: "auto",
              }}
            />
            <div className="">
              <p className="text-center text-[12px] md:text-[24px] font-bold">
                Save and Resume Your Work{" "}
              </p>
              <p className="text-center text-[12px] md:text-[24px] font-poppins text-gray-400 md:line-clamp-3 max-w-[778px] max-h-[108px]">
                Save your progress and return whenever you like. You'll start
                exactly where you left off, making it super easy.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
