import Button from "./Button"

const btnList = [
  "All",
  "Music",
  "Gaming",
  "Sports",
  "Movies",
  "Live",
  "News",
  "Cooking",
  "Tra",
];

const ButtonList = () => {
  return (
    <div className="flex overflow-x-auto whitespace-nowrap p-3 gap-3 no-scrollbar border-b border-gray-200">
      {btnList.map((name, index) => {
        return <Button key={name} name={name} active={index === 0} />;
      })}
    </div>
  );
};

export default ButtonList;
