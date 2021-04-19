"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useNow;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _zustand = _interopRequireDefault(require("zustand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const nowStore = (0, _zustand.default)(() => (0, _dayjs.default)());
setInterval(() => {
  nowStore.setState((0, _dayjs.default)(), true);
}, 1000);

function useNow() {
  return nowStore();
}