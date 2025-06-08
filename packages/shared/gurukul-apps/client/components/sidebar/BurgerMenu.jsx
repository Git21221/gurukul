export const BurgerMenu = ({ color }) => {
  return (
    <svg
      width="27"
      height="19"
      viewBox="0 0 27 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0V2.71429H27V0H0ZM0 8.14286V10.8571H27V8.14286H0ZM0 16.2857V19H27V16.2857H0Z"
        fill={color || '#1E1E1E'}
      />
    </svg>
  );
};
