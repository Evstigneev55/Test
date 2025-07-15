let NameAge = 18;

const Lesson_9 = () => {
  const ExampName = "Alex";

  const arrayElements = [{
    name: 'John',
    age: 30
  }, {
    name: 'Lean',
    age: 24
  }];
  const arrayReactElemets = [];

  console.log(arrayElements.length);

  for(let i = 0; i < arrayElements.length ;i++) {
    arrayReactElemets.push(
      <div> {arrayElements[i].age} </div>
    );
  }

  console.log(arrayReactElemets);
    
  return (
    arrayReactElemets
  );
};

export default Lesson_9;