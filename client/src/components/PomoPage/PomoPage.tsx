import { useEffect, useState } from "react";
import Header from "../Header/Header";
import PomoContent from "./PomoContent/PomoContent";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:8000";

const PomoPage = () => {
  const [pomodoroDuration, setPomodoroDuration] = useState<number>(25 * 60);

  useEffect(() => {
    const fetchPomodoroStatus = async () => {
      try {
        const response = await axios.get(`${baseUrl}/pomodoro/get-duration`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          const { duration, status, startTime } = response.data;
          if (status === "running" && startTime) {
            const elapsedTime =
              (Date.now() - new Date(startTime).getTime()) / 1000;
            setPomodoroDuration(duration - elapsedTime);
          } else {
            setPomodoroDuration(duration);
          }
        }
      } catch (error) {
        toast.error(`Failed to fetch pomodoro duration: ${error}`, {
          theme: "dark",
          autoClose: 3000,
        });
      }
    };

    fetchPomodoroStatus();
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
