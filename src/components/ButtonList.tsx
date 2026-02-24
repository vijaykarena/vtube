import Button from "./button";

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
    <div className="flex">
      {btnList.map((name) => {
        return <Button key={name} name={name} />;
      })}
    </div>
  );
};

export default ButtonList;
