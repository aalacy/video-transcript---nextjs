"use client";

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCallback, useEffect, useState } from "react";

import { FaqService } from "@/service/faq-service";
import { TabSkeleton } from "@/components/skeleton/tab-skeleton";

const faqService = new FaqService();

export default function Faq() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  const getData = useCallback(async () => {
    setLoading(true);
    const { data } = await faqService.all();
    setData(data.faqs);
    setLoading(false);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box
        id="faq"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 1,
          my: 10,
        }}
      >
        <Box maxWidth="md" sx={{ width: 1 }}>
          <Typography variant="h5" sx={{ mb: 5, textAlign: "center" }}>
            FAQ
          </Typography>
          <TabSkeleton loading={loading} />

          <div sx={{ display: loading ? "none" : "inherit" }}>
            {data.map((faq) => (
              <Accordion key={faq.title}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={faq.title}
                >
                  <Typography variant="h6" fontWeight="medium">
                    {faq.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="GrayText">{faq.content}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </Box>
      </Box>
    </>
  );
}
