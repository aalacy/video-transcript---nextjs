"use client";

import { useEffect } from "react";

import Faq from "@/components/home/faq";
import { useAuth } from "@/hooks/use-auth";
import { gtm } from "@/utils/gtm";

export default function FaqPage() {
  const { setTitleInfo } = useAuth();

  useEffect(() => {
    setTitleInfo({ title: "Help Center" });
    gtm.push({ event: "page_view" });
  }, []);
  return (
    <>
      <title>SubmagicPro - Help Center</title>
      <Faq />
    </>
  );
}
