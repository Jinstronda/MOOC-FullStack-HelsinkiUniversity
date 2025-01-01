const Course = ({ courses }) =>{ 
   
    return (
    <div>
      {courses.map(course => (
      <div>
        <h1>{course.name}</h1>
        <ul>
          {console.log(course)}
          {course.parts.map(course => <li key = {course.id}>{course.name}: {course.exercises} </li> )} 
          <p>NUMBER OF TOTAL EXERCISES : {course.parts.reduce((sum,course) => sum + course.exercises, 0)}</p>
        </ul> 
        

      </div>
    ))}
    </div> )
  }




export default Course 