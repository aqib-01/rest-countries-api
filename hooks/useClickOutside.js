export function clickOutside(callback, ref, ref2 = null) {
  document.addEventListener("click", (e) => {
    if (ref2 === null) {
      if (ref && ref.current && !ref.current.contains(e.target)) {
        return callback(e);
      }
    } else if (ref2) {
      if (
        ref.current &&
        ref2.current &&
        !ref2.current.contains(e.target) &&
        !ref.current.contains(e.target)
      ) {
        return callback(e);
      }
    }
    
  });
}
