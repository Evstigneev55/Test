

const USERS = [
    {name: 'Kon', surname: 'Kurosaki', age: 18},
    {name: 'Lina', surname: 'Maiden', age: 25},
    {name: 'io', surname: 'Ubutu', age: 210},
];


const Lesson_10 = () => {
    return (
        <div>
            {USERS.map( (user) => {
                const CustomKey = `${user.name}_${user.surname}_${user.age}`
               return (
                <div key={CustomKey}>
                    <h2> {user.name} </h2>
                </div>
               )
            })}
        </div>
    )
}

export default Lesson_10;