"use client";

import { Box, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";

import { YelloBottom } from "@/icons/yellow-bottom";
import { Pattern } from "@/icons/pattern";

export default function Generate() {
  return (
    <>
      <div className="px-8 py-4 md:px-[128px] md:py-[75px]  flex flex-col justify-between items-center">
        <div className="flex flex-col md:flex-row gap-[20px] md:gap-[74px]">
          <div className="flex flex-col md:w-1/2 justify-between gap-4 ">
            <div>
              <h2 className="text-[20px] md:text-[48px] text-left font-poppins font-bold line-clamp-3 ">
                AI Video Caption Generator Free Without Watermark
              </h2>
              <Image
                src="/assets/title.png"
                alt="title"
                className=""
                width={300}
                height={100}
              />
            </div>
            <p className="text-sm md:text-[24px] text-left font-poppins text-gray-400 line-clamp-3">
              Save TIME and EFFORT and MONEY with our easy-to-use tool.
            </p>
            <button className="bg-[#FFBF4C] px-2 md:px-[24px] py-1 md:py-[12px] font-semibold rounded-lg">
              Sign up
            </button>
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <Image
              src="/assets/first.png"
              alt="first"
              className="w-[560px]"
              width={560}
              height={454}
            />
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/assets/bg.jpg"
          alt="background"
          className="w-full "
          width={800}
          height={80}
        />
      </div>
    </>
  );
}
