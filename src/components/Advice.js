import { useEffect, useState } from "react";
import classes from "./Advice.module.css";
import Card from "./UI/Card";
import LoadingSpinner from "./UI/LoadingSpinner";
const Advice = () => {
  const [currentCounter, setCurrentCounter] = useState(1);
  const [currAdvice, setCurrAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  
  const adviceText = `A d v i c e  # ${currentCounter}`;
  const clickAdviceHandler = () => {
    setCurrentCounter((prevCounter) => prevCounter + 1);

    fetchAdvice();
  };
  const fetchAdvice = async () => {
    setIsLoading(true);
    const response = await fetch("https://api.adviceslip.com/advice");

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    setIsLoading(false);
    setCurrAdvice(data.slip.advice);
  };
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    fetchAdvice().catch((err) => {
      setIsLoading(false);
      setHasError(err.message);
      console.log(err.message);
    });
  }, []);

  // window.addEventListener("resize", setWidth(window.innerWidth));
  const isMobile = width < 700;
  console.log(isMobile);

  return (
    <Card>
      <div className={classes.title}>{adviceText}</div>
      {hasError && <div className={classes.error}>{hasError}</div>}
      {!isLoading && !hasError && (
        <div className={classes.content}>{currAdvice}</div>
      )}
      {isLoading && <LoadingSpinner />}
      {!isMobile && (
        <div className={classes.svg}>
          <svg width="444" height="16" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
              <g transform="translate(212)" fill="#CEE3E9">
                <rect width="6" height="16" rx="3" />
                <rect x="14" width="6" height="16" rx="3" />
              </g>
            </g>
          </svg>
        </div>
      )}
      {isMobile && (
        <div className={classes.svg}>
          <svg width="280" height="16" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
              <g transform="translate(138)" fill="#CEE3E9">
                <rect width="6" height="16" rx="3" />
                <rect x="14" width="6" height="16" rx="3" />
              </g>
            </g>
          </svg>
        </div>
      )}

      <button
        className={classes.button}
        onClick={clickAdviceHandler}
        disabled={isLoading}
      >
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
            fill="#202733"
          />
        </svg>
      </button>
    </Card>
  );
};

export default Advice;
