export const TOOLTIP_DIRECTION = [
  {
    key: 1,
    direction: "top",
    classname: "bottom-[calc(100%+5px)] left-1/2 -translate-x-1/2",
  },
  {
    key: 2,
    direction: "bottom",
    classname: "left-1/2 top-[calc(100%+5px)] -translate-x-1/2",
  },
  {
    key: 3,
    direction: "left",
    classname: "right-[calc(100%+5px)] top-1/2 -translate-y-1/2",
  },
  {
    key: 4,
    direction: "right",
    classname: "left-[calc(100%+5px)] top-1/2 -translate-y-1/2",
  },
];

export const TOOLTIP_ARROW = [
  {
    key: 1,
    direction: "top",
    classname:
      "bottom-full left-1/2 -translate-x-1/2 border-b-0 border-l-transparent border-r-transparent",
  },
  {
    key: 2,
    direction: "bottom",
    classname:
      "left-1/2 top-full -translate-x-1/2 border-t-0 border-l-transparent border-r-transparent",
  },
  {
    key: 3,
    direction: "left",
    classname:
      "right-full top-1/2 -translate-y-1/2 border-r-0 border-b-transparent border-t-transparent",
  },
  {
    key: 4,
    direction: "right",
    classname:
      "left-full top-1/2 -translate-y-1/2 border-l-0 border-b-transparent border-t-transparent",
  },
];

export const TOOLTIP_COLOR = {
  "chart-1": {
    top: {
      bg: "bg-chart-1 text-white",
      arrow: "border-t-chart-1",
    },
    bottom: {
      bg: "bg-chart-1 text-white",
      arrow: "border-b-chart-1",
    },
    left: {
      bg: "bg-chart-1 text-white",
      arrow: "border-l-chart-1",
    },
    right: {
      bg: "bg-chart-1 text-white",
      arrow: "border-r-chart-1",
    },
  },
  "chart-2": {
    top: {
      bg: "bg-chart-2 text-black/50",
      arrow: "border-t-chart-2",
    },
    bottom: {
      bg: "bg-chart-2 text-black/50",
      arrow: "border-b-chart-2",
    },
    left: {
      bg: "bg-chart-2 text-black/50",
      arrow: "border-l-chart-2",
    },
    right: {
      bg: "bg-chart-2 text-black/50",
      arrow: "border-r-chart-2",
    },
  },
};
