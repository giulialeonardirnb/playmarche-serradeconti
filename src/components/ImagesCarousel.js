import { React, useEffect, useRef, useState } from "react";
import i18next from "i18next";
import { getBucketObject } from "../util/bucketUtils";

function getLanguage(label) {
  switch (label) {
    case "italiano":
      return "it";
    case "english":
      return "en";
    default:
      return "it";
  }
}

async function load(labs, setIsLoading, setImagesSrcConfig) {
  let url = getLanguage(i18next.language) + "/img/";
  let imagesMap = await labs.reduce(async (accPromise, choice) => {
    let acc = await accPromise;
    let imageBucketData = await getBucketObject(
      getLanguage(i18next.language) + "/img/" + choice
    );
    const imageElement = document.createElement("img");
    imageElement.src = `data:image/png;base64,${imageBucketData.toString(
      "base64"
    )}`;
    return Object.assign(acc, { [url + choice]: imageElement.src });
  }, Promise.resolve({}));

  cacheImages(Object.values(imagesMap), setIsLoading);
  let newImageConfig = { ...imagesMap };
  setImagesSrcConfig(newImageConfig);
}

async function cacheImages(srcArray, setIsLoading) {
  const promises = await srcArray.map((src) => {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.src = src;
      img.onload = resolve();
      img.onerror = reject();
    });
  });
  await Promise.all(promises);
  setIsLoading(false);
}

const Carousel = (props) => {
  const slider = useRef(null);
  let isDown = useRef(false);
  let startX = useRef(null);
  let scrollLeft = useRef(null);

  useEffect(() => {
    if (slider && slider.current) {
      let sliderRef = slider.current;
      sliderRef.addEventListener("mousedown", one);
      sliderRef.addEventListener("mousedown", two);
      sliderRef.addEventListener("mouseleave", three);
      sliderRef.addEventListener("mouseup", four);
      sliderRef.addEventListener("mousemove", five);

      return () => {
        sliderRef.removeEventListener("mousedown", one);
        sliderRef.removeEventListener("mousedown", two);
        sliderRef.removeEventListener("mouseleave", three);
        sliderRef.removeEventListener("mouseup", four);
        sliderRef.removeEventListener("mousemove", five);
      };
    }
  }, []);

  function one(e) {
    isDown.current = true;
    startX.current = e.pageX - slider.current.offsetLeft;
    scrollLeft.current = slider.current.scrollLeft;
  }

  function two(e) {
    isDown.current = true;
    startX.current = e.pageX - slider.current.offsetLeft;
    scrollLeft.current = slider.current.scrollLeft;
  }

  function three() {
    isDown.current = false;
  }

  function four() {
    isDown.current = false;
  }

  function five(e) {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = x - startX.current;
    slider.current.scrollLeft = scrollLeft.current - walk;
  }

  return (
    <div id="items" ref={slider}>
      {props.children}
    </div>
  );
};

const ImageCarousel = (props) => {
  const [imagesSrcConfig, setImagesSrcConfig] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showImages, setShowImages] = useState(false);
  const [manyImages, setManyImages] = useState(false);

  const styles = {
    blockContainer: {
      width: "85%",
      marginBottom: 20,
    },
    imagesContainer: {
      display: "flex",
      justifyContent: manyImages ? "left" : "center",
      alignItems: "center",
      transition: "opacity 1.5s",
      opacity: !showImages ? 0 : 1,
    },
    singleImage: {
      marginLeft: 5,
      marginRight: 5,
      height: 250,
      maxWidth: "70%",
      borderRadius: "30px",
    },
  };

  let imageUrl = getLanguage(i18next.language) + "/img/";

  useEffect(() => {
    if (isLoading === false) {
      setTimeout(() => {
        setShowImages(true);
      }, 50);
      if (
        document.getElementById("imgs").scrollWidth >
        document.getElementById("imgs").offsetWidth
      ) {
        setManyImages(true);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (!!i18next.language) {
      let funct = async () => {
        await load(props.imagesList, setIsLoading, setImagesSrcConfig);
      };
      funct();
    }
  }, [props.imagesList]);

  return (
    <div style={styles.blockContainer}>
      <Carousel>
        <div id="imgs" style={styles.imagesContainer}>
          {props.imagesList?.map((item, key) => {
            return (
              <img
                key={key}
                alt="img"
                style={styles.singleImage}
                src={imagesSrcConfig[imageUrl + item]}
              ></img>
            );
          })}
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
