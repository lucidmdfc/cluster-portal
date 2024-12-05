import { SignIn } from "@clerk/nextjs";
import bg from "public/assets/images/cluster/cluster01.jpg"

export default function SignInPage ()  {
  return (
    <div style={{ background: `url(${bg.src}) no-repeat center center/cover`, height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <SignIn />
    </div>
  );
};

