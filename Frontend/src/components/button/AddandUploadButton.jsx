import "./button.css";

const HoverButton = ({ label }) => {
  return (
    <div className="middle">
      <button className="Btn Btn1">{label}</button>
    </div>
  );
};

export default HoverButton;
