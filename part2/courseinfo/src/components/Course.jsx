const PartCourse = ({ props }) => {
  return (
    <li key={props.id}>
      {props.name} {props.exercises}
    </li>
  );
};

function CalcTotalCount(array) {
  return array.reduce((a, b) => (a += b.exercises), 0);
}

function GetFilteredArray(objArray) {
  return objArray.filter((e) => e.exercises);
}

const Course = ({ courses }) => {
  const array1 = GetFilteredArray(courses[0].parts);
  const array2 = GetFilteredArray(courses[1].parts);

  return (
    <div>
      <h1>Web development curriculum</h1>
      <h2>{courses[0].name}</h2>
      {array1.map((e) => (
        <PartCourse key={e.id} props={e} />
      ))}
      <p>
        <strong>Total of {CalcTotalCount(array1)} exercises</strong>
      </p>
      <h2>{courses[1].name}</h2>
      {array2.map((e) => (
        <PartCourse key={e.id} props={e} />
      ))}
      <p>
        <strong>Total of {CalcTotalCount(array2)} exercises</strong>
      </p>
    </div>
  );
};

export default Course;
