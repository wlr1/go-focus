import { useEffect, useState } from "react";
import Header from "../Header/Header";
import PomoContent from "./PomoContent/PomoContent";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:8000";

const PomoPage = () => {
  const [pomodoroDuration, setPomodoroDuration] = useState<number>(25 * 60);

  useEffect(() => {
    axios
      .get(`${baseUrl}/pomodoro/get-duration`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setPomodoroDuration(response.data.duration);
        }
      })
      .catch((error) => {
        toast.error(`Failed to fetch pomodoro duration: ${error.message}`, {
          theme: "dark",
          autoClose: 3000,
        });
      });
  }, []);

  return (
    <>
      <Header
        initialDuration={pomodoroDuration / 60}
        onSave={(newDuration) => setPomodoroDuration(newDuration * 60)}
      />
      <div className="bg-notes min-h-screen flex justify-center items-center">
        <div className="w-full max-w-screen-lg mx-auto">
          <PomoContent duration={pomodoroDuration} />
        </div>
      </div>
    </>
  );
};

export default PomoPage;
