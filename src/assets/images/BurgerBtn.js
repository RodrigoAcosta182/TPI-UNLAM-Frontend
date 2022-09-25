const BurgerBtn = ({color}) => {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="23.9996" height="3.42851" rx="1.71426" fill={color} />
      <rect
        y="8.22827"
        width="23.9996"
        height="3.42851"
        rx="1.71426"
        fill={color}
      />
      <rect
        y="16.457"
        width="23.9996"
        height="3.42851"
        rx="1.71426"
        fill={color}
      />
    </svg>
  );
};

export default BurgerBtn;

