const MyComponent = (props) => {
  return (
    <div>
      {props.name} {props.children}
    </div>
  );
};

export default MyComponent;
