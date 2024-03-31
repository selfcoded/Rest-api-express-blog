import pino from "pino";
import dayjs from "dayjs";
import PinoPretty from "pino-pretty";

const logger = pino(
  PinoPretty({
    colorize: true,
    customPrettifiers: {
      time: () => `🕰 :${dayjs().format()}`,
    },
  })
);

export default logger;
