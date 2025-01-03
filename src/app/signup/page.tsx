"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import bg from "public/assets/images/cluster/cluster01.jpg";
import Box from "@mui/material/Box";

export default function SignInPage() {
  return (
    <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <Image
        src={bg.src}
        alt="Cluster Background"
        layout="fill"
        objectFit="cover"
        quality={80}
        priority
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <SignUp
          appearance={{
            elements: {
              footerActionLink: {
                color: "Blue",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
