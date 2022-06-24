export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}


export function gradeColor (grade) {
  // starting with green
  let color = {
      r: 54,
      g: 222,
      b: 54
  };

  const dist = 100-grade;
  if (grade < 99) {
      if (color.r + (dist * 14) <= 222) {
          color.r += (dist * 14);
      } else {
          color.r = 222;
          const diff = (dist * 14) - 168;
          color.g -= diff / 2.5;
      }
  }

  return ('rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1.0)');
}