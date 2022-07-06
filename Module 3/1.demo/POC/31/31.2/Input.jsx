let Input = (props) => {
  return (
    <input
      className="input-box"
      type="text"
      onChange={(e) => {
        this.setState({ currInput: e.currentTarget.value });
      }}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          this.setState({
            tasks: [...this.state.tasks, this.state.currInput],
            currInput: "",
          });
        }
      }}
      value={props.currInput} // dhyan rkh ki this is the value(ye input tag ke attribute me hai) of input box that will be set equal to currInput.
    />
  );
};

export default Input;
