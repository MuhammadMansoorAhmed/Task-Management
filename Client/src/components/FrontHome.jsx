import './Pages/Home.css'
import { useNavigate } from 'react-router-dom'

const FrontHome = () => {
    const navigate = useNavigate();
    return (<>
        <section className="homeSection">
            <div className="leftdiv">
                <h1 className='headLine'>Improve your Discipline with Task Management</h1>
                <button className="manageTask" onClick={()=> navigate('/tasks')}>Manage Task</button>
            </div>
            <div className="rightdiv">
                <img src="../../../public/Task.png" alt="Image" />
            </div>
        </section>
        <section className='infoSection'>
            <div className='infoLeftDiv'>
                <h2 className='headIntro'>A Simple Task Manager That Will Help You and Your Business</h2>
                <p className='headPara'>Create a ToDo list as simple or detailed as you prefer, every thing in this app starts with creating task. This app will allow you to create your tasks and engage on them to manage your daily routine efficiently!.</p>
            </div>
            <div className='infoRightDiv'>
                <h2 className='headIntro'>A Simple Task Manager That Will Help You and Your Business</h2>
                <p className='headPara'>Create a ToDo list as simple or detailed as you prefer, every thing in this app starts with creating task. This app will allow you to create your tasks and engage on them to manage your daily routine efficiently!.</p>
            </div>

        </section>
    </>

    )
}

export default FrontHome
