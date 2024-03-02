import { useState } from "react";
import phoneService from "../services/phone.service";

function checkAlreadyExist(data) {
  const { newName, newNumber, persons } = data;
  const foundName = persons.find((e) => e.name === newName);
  if (foundName !== undefined) {
    return true;
  }
  const foundNumber = persons.find((e) => e.number === newNumber);
  if (foundNumber !== undefined) {
    return true;
  }
  return false;
}

const PersonForm = ({ props, setPersons, setMessage }) => {
  const persons = props;
  console.log("PersonForm data:", persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const AddPhone = (event) => {
    // Prevent default behavior when submit.
    event.preventDefault();
    const data = { newName, newNumber, persons };
    if (checkAlreadyExist(data)) {
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        //console.log("Update request aborted.");
        return;
      }
      const foundObj = persons.find((e) => e.name === newName);
      const foundID = foundObj.id;
      const updateObject = {
        name: newName,
        number: newNumber,
      };
      phoneService
        .update(foundID, updateObject)
        .then((data) => {
          setPersons(persons.map((e) => (e.id !== foundID ? e : data)));
          setMessage(`Data: ${newName} updated.`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {
          if (error instanceof Error) {
            setMessage("Error occurs when update phone book.");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          }
          setPersons(persons.filter((e) => e.id !== foundID));
        });
      return;
    }

    const phoneObject = {
      name: newName,
      number: newNumber,
    };

    phoneService
      .create(phoneObject)
      .then((newPhone) => {
        // Adding new object to array persons
        setPersons(persons.concat(newPhone));
        setMessage(`Data: ${newName} created.`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        // Clear input value
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleInputChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={AddPhone}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
