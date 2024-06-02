import { useEffect, useState } from "react";
import Header from "../Header/Header";
import PomoContent from "./PomoContent/PomoContent";
import axios from "axios";

const baseUrl = "http://localhost:8000";

const PomoPage = () => {
  return (
    <>
      <Header />
      <div className="bg-notes min-h-screen flex justify-center items-center">
        <div className="w-full max-w-screen-lg mx-auto">
          <PomoContent />
        </div>
      </div>
    </>
  );
};

export default PomoPage;
