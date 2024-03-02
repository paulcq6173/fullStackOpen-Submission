import phoneService from "../services/phone.service";

const Person = ({ props, setPersons, setMessage }) => {
  const array = props;
  const handleDeleteClick = (event) => {
    const reqId = event.target.value;
    const foundPhone = array.find((e) => e.id === reqId);
    const name = foundPhone.name;
    if (!foundPhone) {
      setMessage(`Error: DataID ${reqId} not found.`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }
    if (!window.confirm(`Are you really want to delete ${name}?`)) {
      console.log("Delete process aborted.");
      return;
    }

    phoneService
      .deletePhoneById(reqId)
      .then((data) => {
        setPersons(array.filter((item) => item.id !== data.id));
        setMessage(`Data: ${name} deleted.`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setMessage(
            `Failed to delete dataID:${reqId}. It may already deleted from server.`
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        }
        setPersons(array.filter((item) => item.id !== reqId));
      });
  };

  return (
    <div>
      {array.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button value={person.id} onClick={handleDeleteClick}>
            delete
          </button>
        </li>
      ))}
    </div>
  );
};

export default Person;
