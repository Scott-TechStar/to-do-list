import classNames from 'classnames';
import { Component} from 'react';

export default class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = { todos: [], newId: 0};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickTodo = this.handleClickTodo.bind(this);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            id: this.state.newId,
            done: false,
            label: e.target[0].value,
        };
        if(!newTodo.label) return;
        this.setState((state) =>({
            todos: [...state.todos, newTodo],
            newId: state.newId + 1,
        }));
        //clear input value
        e.target[0].value="";
    }
    handleClickTodo  =(index) =>{
        const updatedTodos = JSON.parse(JSON.stringfy(this.state.todos));
        updatedTodos[index].done = !updatedTodos[index].done;
        this.setState((state) => ({
            ...state,
            todos: updatedTodos,
        }));
    }
    render(){
        return (
                <>
                    <div>
                        <h2>
                            Todo List
                        </h2>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="todo"/>
                            <button type="submit">Add</button>
                        </form>
                        {this.state.todos.map((todo, idx) => (
                            <div 
                                key={todo.id} 
                                onClick={() => this.handleClickTodo(idx)}
                                className={classNames({ done: todo.done})}>
                                {todo.label}
                            </div>    
                        ))}
                    </div>
                    <style>{`
                        .done {
                            text-decoration: line-through;
                        }
                    `}</style>
                    
                </>
            );

    }

}



