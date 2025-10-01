import { useRef } from "react";

const MyForm = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  console.log(emailInputRef);
  console.log(passwordInputRef);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", emailInputRef.current.value);
    console.log("Password:", passwordInputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter your email" ref={emailInputRef} />
      <input
        type="password"
        placeholder="Enter your password"
        ref={passwordInputRef}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
