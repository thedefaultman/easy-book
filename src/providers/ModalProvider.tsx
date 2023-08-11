"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import ReviewModal from "@/components/ReviewModal";
import BookingModal from "@/components/BookingModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <ReviewModal />
      <BookingModal />
    </>
  );
};

export default ModalProvider;
