const Button = ({ name, active }: { name: string; active?: boolean }) => {
  return (
    <button
      className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition-colors ${active
        ? "bg-black text-white hover:bg-gray-800"
        : "bg-gray-100 text-black hover:bg-gray-200"
        }`}
    >
      {name}
    </button>
  );
};

export default Button;
