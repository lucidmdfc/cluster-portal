"use client";

import { SignIn } from "@clerk/nextjs";
import bg from "public/assets/images/cluster/cluster01.jpg";
import Box from "@mui/material/Box";
import Image from "next/image";

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
        <SignIn
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
