let NameAge = 18;

const Lesson_8 = () => {
    const ExampName = "Alex";


    function checkAge(age) {
        if (age < 18) {
            return (
                <h1> Age less 18 </h1>
            );
        } else {
            return (
                <>
                <h2> Age more then 17 </h2>
                <div> LoL11! </div>
                </>
            );
        }
    }
    return (
        <div>
            <span>
                <h1>
                    {ExampName}
                </h1>
                {checkAge(NameAge)}
            </span>
        </div>
    )
}

export default Lesson_8;