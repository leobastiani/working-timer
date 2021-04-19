import { Box, Text } from "ink";
import useNow from "../hooks/useNow";

let states = [];
let state;

function Block({ start, end }) {
  return (
    <Box flexDirection="column">
      <Text>Início: {start.format("DD/MM HH:mm:ss")}</Text>
      <Text>Agora: {end.format("DD/MM HH:mm:ss")}</Text>
      <Text>Trabalhado: {end.diff(start, "minutes")}m</Text>
      <Text> </Text>
    </Box>
  );
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
    return (
      <Block
        key={this.start.toJSON() + this.end.toJSON()}
        start={this.start}
        end={this.end}
      />
    );
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
    return (
      <Block
        key={this.start.toJSON() + this.now.toJSON()}
        start={this.start}
        end={this.now}
      />
    );
  }
}

state = new EmptyState();
export default function App() {
  const now = useNow();
  state.update(now);
  return (
    <>
      {states.map((state) => state.render())}
      {state.render()}
    </>
  );
}
