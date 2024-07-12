import * as textUtils from "./text";
import * as classNameUtils from "./classnames";
import * as objectUtils from "./objects";

const utils = Object.freeze({
  ...textUtils,
  ...classNameUtils,
  ...objectUtils,
});

export { textUtils, classNameUtils, objectUtils };
export default utils;
