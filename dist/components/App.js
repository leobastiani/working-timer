"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _ink = require("ink");

var _useNow = _interopRequireDefault(require("../hooks/useNow"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let states = [];
let state;

function Block({
  start,
  end
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ink.Box, {
    flexDirection: "column",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_ink.Text, {
      children: ["In\xEDcio: ", start.format("DD/MM HH:mm:ss")]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ink.Text, {
      children: ["Agora: ", end.format("DD/MM HH:mm:ss")]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ink.Text, {
      children: ["Trabalhado: ", end.diff(start, "minutes"), "m"]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ink.Text, {
      children: " "
    })]
  });
}

class EmptyState {
  update(now) {
    state = new WorkingState(now);
  }

  render() {
    return null;
  }

}

class Worked {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Block, {
      start: this.start,
      end: this.end
    }, this.start.toJSON() + this.end.toJSON());
  }

}

class WorkingState {
  constructor(start) {
    this.start = start;
    this.now = start;
    this.prevNow = start;
  }

  update(now) {
    if (now.diff(this.prevNow, "seconds") >= 5) {
      states = [...states, new Worked(this.start, this.prevNow)];
      state = new WorkingState(now);
      return;
    }

    this.prevNow = now;
    this.now = now;
  }

  render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Block, {
      start: this.start,
      end: this.now
    }, this.start.toJSON() + this.now.toJSON());
  }

}

state = new EmptyState();

function App() {
  const now = (0, _useNow.default)();
  state.update(now);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [states.map(state => state.render()), state.render()]
  });
}