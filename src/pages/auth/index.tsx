import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        await router.push("/");
      } else {
        await router.push("/auth");
      }
      setPageLoading(false);
    };
    checkAuth();
  }, [router]);

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-600 to-black">
        <div className="spinner-border animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
        <div className="max-w-7xl mx-auto">
          <Navbar />
          <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
            <Image src={"/hero.png"} width={800} height={800} alt="Hero img" />
          </div>
          <AuthModal />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
