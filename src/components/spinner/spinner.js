const Spinner = () => {
    return (
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      version="1"
      viewBox="0 0 128 128"
      style={{margin: "auto auto", display: "block"}}
    >
      <rect width="100%" height="100%" fill="#FFF"></rect>
      <g>
        <linearGradient id="linear-gradient">
          <stop offset="0%" stopColor="#9f0013"></stop>
          <stop offset="100%" stopColor="#ca717c"></stop>
        </linearGradient>
        <linearGradient id="linear-gradient2">
          <stop offset="0%" stopColor="#9f0013"></stop>
          <stop offset="100%" stopColor="#edcfd3"></stop>
        </linearGradient>
        <path
          fill="url(#linear-gradient)"
          fillRule="evenodd"
          d="M64 .98A63.02 63.02 0 11.98 64 63.02 63.02 0 0164 .98zm0 15.76A47.26 47.26 0 1116.74 64 47.26 47.26 0 0164 16.74z"
        ></path>
        <path
          fill="url(#linear-gradient2)"
          fillRule="evenodd"
          d="M64.12 125.54A61.54 61.54 0 11125.66 64a61.54 61.54 0 01-61.54 61.54zm0-121.1A59.57 59.57 0 10123.7 64 59.57 59.57 0 0064.1 4.43zM64 115.56a51.7 51.7 0 1151.7-51.7 51.7 51.7 0 01-51.7 51.7zM64 14.4a49.48 49.48 0 1049.48 49.48A49.48 49.48 0 0064 14.4z"
        ></path>
        <animateTransform
          attributeName="transform"
          dur="1800ms"
          from="0 64 64"
          repeatCount="indefinite"
          to="360 64 64"
          type="rotate"
        ></animateTransform>
      </g>
    </svg>
    )

}

export default Spinner;