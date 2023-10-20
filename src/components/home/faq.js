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
      <TabSkeleton loading={loading} />
      <Box
        id="faq"
        sx={{
          justifyContent: "center",
          width: 1,
          mt: 5,
        }}
      >
        <Box maxWidth="md" sx={{ width: 1 }}>
          <Typography variant="h4" sx={{ mb: 5, textAlign: "center" }}>
            FAQ
          </Typography>

          <Box sx={{ display: loading ? "none" : "inherit" }}>
            {data.map((faq) => (
              <Accordion key={faq.title}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={faq.title}
                >
                  <Typography variant="h6">{faq.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.content}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
