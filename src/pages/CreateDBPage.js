

const CreateDBPage = () =>{

    return <div>
        <h1>Please select the year and semester</h1>
        <div>make sure to run the local server to create the schedule</div>
        <form method="post" action="http://localhost:8000/create_db">
        <label> 
            Year:
        <input type="number"  min="2020" max="2050" name="year" />
        </label>
        
        <label>
            Semester:
        <select name="semester">
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
        </select>
        </label>

        <button type="submit">Submit</button>
        </form>

 
    </div>
}

export default CreateDBPage;