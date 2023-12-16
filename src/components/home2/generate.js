"use client";

import { Button } from "@mui/material";
import Image from "next/image";

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
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                width={300}
                height={100}
              />
            </div>
            <p className="text-sm md:text-[24px] text-left font-poppins text-gray-400 line-clamp-3">
              Save TIME and EFFORT and MONEY with our easy-to-use tool.
            </p>
            <Button variant="contained" href="/auth/signup" color="warning">
              Sign up
            </Button>
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <Image
              src="/assets/first.png"
              alt="first"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={560}
              height={454}
            />
          </div>
        </div>
      </div>
      <div className="mx-[-20px]">
        <Image
          src="/assets/bg.jpg"
          alt="background"
          className="w-full "
          width={800}
          height={80}
          style={{
            height: "auto",
          }}
          priority
        />
      </div>
    </>
  );
}
