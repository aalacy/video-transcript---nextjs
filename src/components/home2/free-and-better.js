export default function FreeAndBetter() {
  return (
    <>
      <div className="px-8 py-4 md:px-[128px] md:py-[75px] flex flex-col justify-around gap-4 md:gap-16 mt-10">
        <div className="flex flex-col justify-between md:mx-[170px] gap-[16px]">
          <h1 className="text-center font-poppins text-[20px] md:text-[40px]   font-semibold text-black ">
            CapHacker is Free and Better than Traditional Subtitle Tools{" "}
          </h1>
          <p className="text-center font-poppins text-[10px] md:text-[20px] text-black   md:line-clamp-3">
            Traditional Captioning tools are not friendly for short-form
            content. Moreover, they make mistakes while generating subtitles.
            Correcting them can be a time-consuming process.{" "}
          </p>
        </div>
        <div className="flex justify-center items-center border-2 border-collapse border-yellow-500 rounded-2xl">
          <table className="w-full table-auto border border-collapse border-yellow-500 rounded-2xl text-left overflow-hidden text-[10px] md:text-[20px] ">
            <thead>
              <tr className="">
                <th className="p-2 border border-gray-300">Feature</th>
                <th className="p-2 border border-gray-300">
                  Traditional Captioning Tools
                </th>
                <th className="p-2 border border-gray-300 bg-black text-white font-serif font-bold leading-3">
                  Cap <span className="text-[#FFBF4C]">Hacker</span>{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">Cost</td>
                <td className="p-2 border border-gray-300">
                  Usually Start at $16/month
                </td>
                <td className="p-2 border border-gray-300 bg-black text-white">
                  Free
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Accuracy</td>
                <td className="p-2 border border-gray-300">Limited</td>
                <td className="p-2 border border-gray-300 bg-black text-white">
                  Highly Accurate
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Free</td>
                <td className="p-2 border border-gray-300">
                  Watermarked Results & Limited
                </td>
                <td className="p-2 border border-gray-300 bg-black text-white">
                  Watermarked Results & Limited
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Customization</td>
                <td className="p-2 border border-gray-300">Limited</td>
                <td className="p-2 border border-gray-300 bg-black text-white">
                  Extensive
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">
                  Real-Time Editing
                </td>
                <td className="p-2 border border-gray-300">Rarely available</td>
                <td className="p-2 border border-gray-300 bg-black text-white">
                  Available
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">
                  Multi-Language Support
                </td>
                <td className="p-2 border border-gray-300">
                  Usually 56 languages
                </td>
                <td className="p-2 border border-gray-300 bg-black text-white">
                  99 Languages
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
