import dayjs from "dayjs";
import create from "zustand";

const nowStore = create(() => dayjs());

setInterval(() => {
  nowStore.setState(dayjs(), true);
}, 1000);

export default function useNow() {
  return nowStore();
}
