import { notStrictEqual } from "assert";

const earliestDate = (pre, cur) => (Date.parse(pre) < Date.parse(cur) ? pre : cur);

export default { earliestDate };
