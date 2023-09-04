import './Tasks.css'
import '../TasksForm.css'
import { useState, useEffect } from 'react';
import { FaRegTimesCircle, FaEllipsisV } from "react-icons/fa"
import axios from 'axios';
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode"



const Tasks = () => {
  const [formDisplay, setFormDisplay] = useState(false);
  const [sideBarDisplay, setSideBarDisplay] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [priority, setPriority] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [cookie, setCookies] = useCookies(["accessToken"]);
  const [fetchedData, setFetchedData] = useState([]);
  const [taskId, setTaskId] = useState("")
  // const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // setAccessToken(cookie.accessToken)
    // console.log(accessToken);
    refreshToken()
    fetchData();
  }, [])

  const refreshToken = async () => {

    try {
      const decodedAccessToken = jwt_decode(cookie.accessToken);
      if (decodedAccessToken.exp * 1000 <= Date.now()) {
        const response = await axios.get('http://localhost:3500/refresh');
        console.log(response);
        const newAccessToken = response.data.accessToken;

        // Update the access token in your cookie or state
        setCookies("accessToken",newAccessToken);
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }


  }


  //Delete Task
  const deleteTask = async () => {

    try {
      const delResponse = await axios.delete(`http://localhost:3500/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`
        }
      });
      console.log(delResponse.data);

    } catch (error) {
      console.error("Error", error);
    }
  }
  //Update Task`
  const updateTask = async () => {
    try {
      const updateRes = await axios.put(`http://localhost:3500/tasks/${taskId}`, {
        title,
        description,
        status,
        priority,
        dueDate,
      }, {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`
        }
      });
      console.log(updateRes.status);
      window.locaiton.reload();

    } catch (error) {
      console.error("Error", error);
    }
  }

  //get Api Request 
  const fetchData = async () => {
    try {
      // console.log(cookie.accessToken);
      const res = await axios.get("http://localhost:3500/tasks/", {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`,
        }
      }
      );
      setFetchedData(res.data)

      // console.log(res);
    } catch (error) {
      console.error(error);
    }

  }

  //Post Api Request
  const AddTask = async (e) => {
    e.preventDefault();
    try {

      await axios.post('http://localhost:3500/tasks/', {
        title,
        description,
        status,
        priority,
        dueDate,
      }, {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`,
        }
      }
      );
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  }

  return (<>

    <section >
      {/* Task Input form */}
      {formDisplay ? (
        <div className='formComponent'>
          <button className='CloseButton ' onClick={() => setFormDisplay(false)}><FaRegTimesCircle /></button>
          <div className="inputField">
            <label htmlFor="title">Title:</label><br />
            <input type="text"
              className='Title'
              placeholder='Title'
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="inputField">
            <label htmlFor="description">Description:</label><br />
            <input type="text"
              className='Title'
              placeholder='Description'
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="inputField">
            <label htmlFor="status">Status:</label><br />
            <select
              name="Status"
              id="status"
              className='Title'
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Start">Start</option>
              <option value="In progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="inputField">
            <label htmlFor="priority">Priority:</label><br />
            <select
              name="Priority"
              id="priority"
              className='Title'
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="inputField">
            <label htmlFor="date">Date:</label><br />
            <input type="date"
              className='Title'
              placeholder='Date'
              id="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="btn-container">
            <button className='submitBtn' onClick={AddTask}>Save</button>
            <button className='submitBtn' onClick={updateTask}>Update</button>
          </div>
        </div>) : (
        <section className="tasksContainerSection">

          {/* sideBar Display Section */}

          <div className='taskDiv'>
            <button className={`ellipsesV ${sideBarDisplay ? 'active' : ''}`} onClick={() => setSideBarDisplay(!sideBarDisplay)}>
              <FaEllipsisV />
            </button>
            <div className={`tasksByTimeDiv ${sideBarDisplay ? 'active' : ''}`}>
              <ul className="taskByTimeList">
                <button className='taskBtn' onClick={() => setFormDisplay(!formDisplay)}>
                  Add Task
                </button>
                <li className="listItem"><a href="">Today</a></li>
                <li className="listItem"><a href="">This week</a></li>
                <li className="listItem"><a href="">This Month</a></li>
                <li className="listItem"><a href="">This Year</a></li>
                <li className="listItem"><a href="">Before</a></li>
              </ul>
            </div>
          </div>
          {/* Display Tasks Section */}
          <div className="taskContainer">
            <div className="displayContainer">
              {fetchedData.map((item) => {
                return (<>
                  <div className="card" key={item._id}>
                    <h3 className='CardTitle'>
                      {item.title}
                    </h3>
                    <p ><span className='cardDescription'>Description:</span>{item.description}</p>
                    <p ><span className='cardStatus'>Status:</span> {item.status}</p>
                    <p ><span className='cardPriority'>Priority:</span>{item.priority}</p>
                    <p ><span className='cardDate'>Due-Date:</span>{new Date(item.dueDate).toLocaleDateString()}</p>
                    <div className="btn-container">
                      <button className='btn-dalete' type='button' onClick={() => { deleteTask(item._id) }}>
                        Delete
                      </button>
                      <button className='btn-update' type='button' onClick={() => {
                        setFormDisplay(!formDisplay);
                        setTaskId(item._id)
                      }}>
                        Update
                      </button>

                    </div>
                  </div>
                </>
                )
              })}

            </div>
          </div>
        </section>
      )}

    </section>

  </>
  )
}

export default Tasks
