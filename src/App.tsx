import { useCallback, useEffect, useMemo, useState } from "react";

import getRandomHexColor from "./utils/getRandomHexColor";
import useBreakpoints from "./hooks/useBreakpoints";

import styles from "./App.styles"

const multiplier = 100;
const offset = 30;

interface IItems {
  title: string;
  description: string;
  author: string;
  image: string;
}

const props: IItems[] = [
  {
    title: "Title 1",
    description: "test description",
    author: "Test Author",
    image: ""
  },
  {
    title: "Title 2",
    description: "test description",
    author: "Test Author",
    image: ""
  },
  {
    title: "Title 3",
    description: "test description",
    author: "Test Author",
    image: ""
  },
  {
    title: "Title 4",
    description: "test description",
    author: "Test Author",
    image: ""
  },
  {
    title: "Title 5",
    description: "test description",
    author: "Test Author",
    image: ""
  },
  {
    title: "Title 6",
    description: "test description",
    author: "Test Author",
    image: ""
  },
  {
    title: "Title 7",
    description: "test description",
    author: "Test Author",
    image: ""
  }
];

function App() {
  const [navigateCounter, setNavigateCounter] = useState(0);
  const breakpoints = useBreakpoints();

  const handleClick = useCallback((decrement?: boolean) => {
    if (decrement) {
      setNavigateCounter((prev) => prev !== 0 ? prev - 1 : prev);
    } else {
      setNavigateCounter((prev) => prev + 1);
    }
  }, []);

  const transformCss = useCallback((index: number) => {
    if (!index && navigateCounter) {
      return "scale3d(0.3, 0.3, 0.3)";
    }

    if (index + 1 >= navigateCounter) {
      const translatePercentage = index + 1 === navigateCounter ? index : navigateCounter;
      const translateXValue = `calc(-${translatePercentage * multiplier}% - ${navigateCounter * offset}px)`;

      return `translateX(${translateXValue}) ${index + 1 <= navigateCounter
        ? "scale3d(0.3, 0.3, 0.3)"
        : ""}`;
    }

    return "";
  }, [navigateCounter]);

  const carouselButtons = useMemo(() => {
    if (breakpoints.LG) {
      return (
        <div className={styles.navButtonsContainer}>
          <button
            disabled={!navigateCounter}
            className={`${!navigateCounter ? styles.disabledNavButton : ""} ${styles.carouselNavButton}`}
            onClick={() => handleClick(true)}
          >
            Prev
          </button>
          <button
            onClick={() => handleClick()}
            className={
              `${navigateCounter === props.length - 1 ? styles.disabledNavButton : ""} ${styles.carouselNavButton}`
            }
            disabled={navigateCounter === props.length - 1}
          >
            Next
          </button>
        </div>
      );
    }

    return <></>;
  }, [breakpoints.LG, handleClick, navigateCounter]);

  useEffect(() => {
    if (!breakpoints.LG) {
      setNavigateCounter(0);
    }
  }, [breakpoints.LG]);

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.textWhite}>Nav Buttons and card animation appear when screen size is less than 1024</h2>
      <div className={styles.carouselContainer}>
        {props.map((item, index) => {
          const color = getRandomHexColor();

          return (
            <div
              key={index}
              className={`${styles.carouselItem} ${index + 1 <= navigateCounter ? styles.prevCarouselItem : ""}`}
              style={{ transform: transformCss(index), backgroundColor: `${color}`, boxShadow: `5px 6px 6px white` }}
            >
              <div className={styles.imageContainer}>

              </div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.description}</p>
            </div>
          )
        })}
      </div>
      {carouselButtons}
    </div>
  )
}

export default App
