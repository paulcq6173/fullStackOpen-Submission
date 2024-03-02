import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import phoneService from "./services/phone.service";
import "./styles/main.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState("No Message");
  const PersonsToShow = showAll
    ? persons
    : persons.filter((e) => e.name.includes(searchText));

  useEffect(() => {
    console.log("useEffect actived");
    phoneService.getAll().then((phonebook) => {
      console.log("promise fulfilled");
      setPersons(phonebook);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        searchText={searchText}
        setSearchText={setSearchText}
        setShowAll={setShowAll}
      />
      <h3>Add a new</h3>
      <PersonForm
        props={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      <h3>Numbers</h3>
      <Person
        props={PersonsToShow}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
