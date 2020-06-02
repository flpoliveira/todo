import React, { Component} from 'react';
import { FaPlus, FaSpinner, FaRegTrashAlt, FaCheck, FaTimes} from 'react-icons/fa';
import './App.css';

import {Container, Form, SubmitButton, List} from './styles';

interface TaskList {
  task: string,
  checked: boolean,
}

export default class App extends Component {

  state = {
    newTask: '' as string,
    taskList: [] as TaskList[],
    loading: false as boolean
  }

  componentDidMount(){
    const taskList = localStorage.getItem('taskList');

    if(taskList){
      this.setState({taskList: JSON.parse(taskList)});
    }
  }

  componentDidUpdate(_: any, prevState: any){
    const { taskList } = this.state;

    if(prevState.taskList !== taskList){
      localStorage.setItem('taskList', JSON.stringify(taskList));
    }
  }

  handleInputChange = (e: any) => {
    this.setState({ newTask: e.target.value });
  }

  deleteTask = (e: string) => {
    const { taskList } = this.state;
    const newTaskList = taskList.filter(task => task.task !== e);
    this.setState({
      taskList: newTaskList
    });
    
  }
  checkTask = (e: string) =>{
    const { taskList} = this.state;
    const newTaskList = taskList.map(task => {
      if (task.task === e)
        task.checked = !task.checked
      return task;
    });
    this.setState({
      taskList: newTaskList
    });
  }
  handleSubmit = (e: any) =>{
    e.preventDefault();
    const { newTask, taskList} = this.state;
    if(newTask === '')
      return;
    this.setState({loading: true});

    
    
    
    const addTask = {
      task: newTask,
      checked: false,
    };
    this.setState({
      taskList: [...taskList, addTask],
      newTask: '',
      loading: false
    });
    
  }

  render (){
    const { newTask, taskList, loading } = this.state;

    return (
      <Container>
        <h1>Lista de Tarefas</h1>
        <Form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            placeholder="Adicione sua tarefa"
            value={newTask}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            { loading ?
              (<FaSpinner color="#FFF" size={14} />)
              :
              (<FaPlus color="#FFF" size={14} />)
            }
          </SubmitButton>
        </Form>
        <List>
          {taskList.map( task => (
            <li key={task.task} 
              className={task.checked ? "marked" : "unmarked"}
            >
              <span>{task.task}</span>
              <div>
                <button 
                  type="button" 
                  onClick={() => this.checkTask(task.task)}
                >
                  {task.checked ? (<FaTimes />) : (<FaCheck />)}
                </button>
                <button 
                  type="button" 
                  onClick={() => this.deleteTask(task.task)}
                >
                  <FaRegTrashAlt/>
                </button>
              </div>
          </li>
          ))}
        </List>
      </Container>
    );
  }
 
}

