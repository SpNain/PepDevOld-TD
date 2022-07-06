let List = (props) => {  // jo props parents se hum bhejte hai unhe hum child(functional) components me function arguments me catch krte hai taki use fxn me use kr ske.
  return (
    <ul>
      {props.tasks.map((el) => {
        return (
          <li>
            {el}{" "}
            {/* <button
              onClick={() => {
                let currTaskArr = this.state.tasks;

                let filteredArr = currTaskArr.filter((element) => {
                  return element != el;
                });

                this.setState({ tasks: filteredArr });
              }}
            >
              Delete
            </button> */}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
