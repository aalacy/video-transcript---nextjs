import Image from "next/image";
import { Button, Box } from "@mui/material";

export default function Successful() {
  return (
    <div className="px-4 py-4 md:px-[128px] md:py-[75px]  flex flex-col justify-between items-center gap-4 md:gap-8 ">
      <div className="flex flex-col justify-between md:mx-[200px] gap-[16px]">
        <h1 className="text-center font-poppins text-[20px] md:text-[40px]  font-semibold text-black">
          Successful Creators Always Caption Their Videos!{" "}
        </h1>
        <p className="text-center font-poppins text-[10px] md:text-[20px] text-[#031220]   md:line-clamp-3">
          When did you see a video from a big creator without captions, probably
          never! That's because captions make their videos engaging and go viral
        </p>
      </div>
      <div className="flex flex-row justify-between gap-2 md:gap-0">
        <div className="card-bg min-h-[200px] md:min-h-[653px]">
          <Image
            src="/assets/poster.png"
            alt="poster"
            width={1100}
            height={653}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <Box maxWidth="sm" sx={{ width: 1 }}>
        <Button
          variant="contained"
          href="/auth/signup"
          color="warning"
          sx={{ width: 1 }}
        >
          Sign up
        </Button>
      </Box>
    </div>
  );
}
