"use client";

import { useEffect } from "react";

import Faq from "@/components/home/faq";
import { useAuth } from "@/hooks/use-auth";

export default function FaqPage() {
  const { setTitleInfo } = useAuth();

  useEffect(() => {
    setTitleInfo({ title: "Help Center" });
  }, []);
  return (
    <>
      <title>Help Center</title>
      <Faq />
    </>
  );
}
