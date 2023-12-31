import * as React from "react";

const EndCallIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={21.361} {...props}>
    <defs>
      <style>{`.a{fill:${props.fill ? props.fill : "#fff"}}`}</style>
    </defs>
    <path
      className="a"
      d="M11.185 5.346a3.895 3.895 0 0 1 0-2.925ZM17.6 4.344a2.886 2.886 0 0 1-4.286 2.5 3.841 3.841 0 0 0 .056-5.09 2.887 2.887 0 0 1 4.23 2.59Z"
    />
    <path
      className="a"
      d="M9.062 7.767a3.884 3.884 0 1 0-3.884-3.884 3.867 3.867 0 0 0 3.884 3.884ZM15.029 12.479a10.535 10.535 0 0 0-3.236 5.644H1.3A1.3 1.3 0 0 1 0 16.829v-1.942c0-3.016 6.045-4.531 9.062-4.531a15.956 15.956 0 0 1 6.615 1.579c-.22.169-.44.35-.648.544ZM17.263 14.831a8.788 8.788 0 0 0-1.726 2.138l1.231 1.358a.594.594 0 0 1 .112.615 6.845 6.845 0 0 0-.432 1.865.588.588 0 0 1-.193.4.579.579 0 0 1-.425.151l-2.063-.1a.594.594 0 0 1-.411-.194.586.586 0 0 1-.152-.427 10.034 10.034 0 0 1 10.234-9.279.588.588 0 0 1 .561.618l-.1 2.063a.59.59 0 0 1-.191.409.6.6 0 0 1-.419.153 6.869 6.869 0 0 0-1.9.247.594.594 0 0 1-.6-.171l-1.231-1.358a8.882 8.882 0 0 0-2.295 1.512Z"
    />
  </svg>
);

export default EndCallIcon;
