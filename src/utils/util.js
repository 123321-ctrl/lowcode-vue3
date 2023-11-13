export const generateId = function () {
  return Math.floor(
    Math.random() * 100000 + Math.random() * 20000 + Math.random() * 5000
  );
};

export const addWindowResizeHandler = function (handler) {
  let oldHandler = window.onresize
  if (typeof window.onresize != 'function') {
    window.onresize = handler
  } else {
    window.onresize = function () {
      oldHandler()
      handler()
    }
  }
}