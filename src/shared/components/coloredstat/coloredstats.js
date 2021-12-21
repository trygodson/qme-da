const ColoredStatCard = props => {
  return (
    <div className={props.class}>
      <h1>{props.amount}</h1>
      <p>{props.title}</p>
    </div>
  );
};

export default ColoredStatCard;
