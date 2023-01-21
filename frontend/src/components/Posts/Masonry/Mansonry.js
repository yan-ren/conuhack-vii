import React, { useRef, useEffect } from "react";
import Macy from "macy";

export const useMacy = (containerRef, options, childCount) => {
  //const containerRef = useRef();
  const macyRef = useRef();

  useEffect(() => {
    const macyOptions = {
      container: containerRef.current,
      // options passed here
      ...options,
    };
    macyRef.current = Macy(macyOptions);
    return () => {
      macyRef.current.remove();
    };
  }, [options, containerRef]);

  useEffect(() => {
    macyRef.current.reInit();
  }, [childCount]);

  return { macy: macyRef.current };
};

// Masonro and Masonry both work
// Masonro use custom hook useMacy

export const Masonro = ({ children, options = {} }) => {
  const containerRef = useRef();
  const childCount = React.Children.count(children);
  // eslint-disable-next-line no-unused-vars
  const { macy } = useMacy(containerRef, options, childCount);

  return (
    <div ref={containerRef} className={"container"}>
      {children}
    </div>
  );
};

export const Masonry = ({ children, options = {} }) => {
  const containerRef = useRef();
  const macyRef = useRef();
  const count = React.Children.count(children);
  useEffect(() => {
    // console.log("rerender")
    const macyOptions = {
      container: containerRef.current,
      // options passed here
      ...options,
    };
    macyRef.current = Macy(macyOptions);
    return () => {
      // console.log("removed", macyRef);
      macyRef.current.remove();
    };
  }, [options]);
  useEffect(() => {
    // console.log("cokcoss", macyRef);
    macyRef.current.reInit();
  }, [count]);
  return (
    <div ref={containerRef} className={"container"}>
      {children}
    </div>
  );
};
