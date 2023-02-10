type Props = {
  label: string;
};

const Sent = ({ label }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-green-500">
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-40 w-40"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h1 className="text-center text-2xl">{label}</h1>
    </div>
  );
};
export default Sent;
