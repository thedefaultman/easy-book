"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import ReviewModal from "@/components/ReviewModal";
import BookingModal from "@/components/BookingModal";
import HistoryModal from "@/components/HistoryModal";

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
      <HistoryModal />
    </>
  );
};

export default ModalProvider;
