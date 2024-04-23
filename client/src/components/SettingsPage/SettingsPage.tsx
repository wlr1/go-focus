import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import Header from "../Header/Header";
import SettingsContent from "./SettingsContent/SettingsContent";

const SettingsPage = () => {
  return (
    <>
      <Header />
      <div className="bg-notes h-screen flex justify-center items-center">
        <div className="">
          <SettingsContent />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
