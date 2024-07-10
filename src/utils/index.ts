import * as textUtils from "./text";
import * as classNameUtils from "./classnames";

const utils = Object.freeze({
  ...textUtils,
  ...classNameUtils,
});

export { textUtils, classNameUtils };
export default utils;
