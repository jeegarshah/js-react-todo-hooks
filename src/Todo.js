import React, {useState} from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBox from '@material-ui/icons/CheckBox';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeColor from '@material-ui/core/colors/amber';
const theme = createMuiTheme({
    palette: {
      primary: themeColor,
    },
  });
  
  const styles = theme => ({
      appBar: {
          flexGrow: 1,
      },
      paper: {
          ...theme.mixins.gutters(),
          paddingTop: theme.spacing.unit * 2,
          paddingBottom: theme.spacing.unit * 2,
          flexGrow: 1,
          width: '100%',
          maxWidth: 800,
          // backgroundColor: theme.palette.background.paper,
          margin: '0 auto',
          marginTop: '24px',
      },
      grow: {
          flexGrow: 1,
      },
      menuButton: {
          marginLeft: -12,
          marginRight: 20,
      },
      container: {
          // display: 'flex',
          flexWrap: 'wrap',
      },
      textField: {
          marginLeft: theme.spacing.unit,
          marginRight: theme.spacing.unit,
          width: 200,
      },
      dense: {
          marginTop: 19,
      },
      menu: {
          width: 200,
      },
      appBarBottom: {
          top: 'auto',
          bottom: 0,
        },
  });

const TodoApp = ({classes}) => {
    const [counter, updateCounter] = useState(1);
    const [todos, updateTodos] = useState({});

    const addTodo = (newTodo) => {
        updateTodos({
            ...todos,
            [counter]: {
                id: counter,
                value: newTodo,
                complete: false
            }
        })

        updateCounter(counter + 1);
    }

    const toggleTodoState = (id) => {
        updateTodos({
            ...todos,
            [id]: {
                ...todos[id],
                complete: !todos[id].complete
            },
        })
    }
    return (
        <MuiThemeProvider theme={theme}>
            <div>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            TODOs
                        </Typography>
                    </Toolbar>
                </AppBar>
                <TodoAppUI classes={classes} todos={todos} toggleTodoState={toggleTodoState} addTodo={addTodo} />
                <AppBar position="fixed" color="primary" className={classes.appBarBottom}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Total : {Object.keys(todos).length} Done: {R.filter(x => x.complete, R.values(todos)).length}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        </MuiThemeProvider>
    )
}

const TodoAppUI = ({classes, todos, addTodo, toggleTodoState }) => (
    <>
        <Paper className={classes.paper} elevation={1}>
            <TodoForm classes={classes} addTodo={addTodo} />
        </Paper>

        <Paper className={classes.paper} elevation={1}>
            <TodoList todos={todos} toggleTodoState={toggleTodoState}/>
        </Paper>
    </>
)

const TodoForm = ({addTodo, classes }) => { 
    const [todo, updateForm] = useState("");
    return (
        <div>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    className={classes}
                    id="todo"
                    label="Enter a new Todo"
                    value={todo}
                    onChange={ e => updateForm(e.target.value) } />
                <Button variant="contained" color="primary" className={classes} 
                onClick={() => {
                    if(todo.length > 0){
                        addTodo(todo); 
                        updateForm("");
                    }}}>
                    Add
                </Button>
            </form> 
        </div>
)};

const TodoList = ({ todos, toggleTodoState }) => (
    <List>
        {Object.keys(todos).map((id, i) => <TodoItem key={i} todo={todos[id]} toggleTodoState={toggleTodoState} />)}
    </List>
);

const TodoItem = ({ todo, toggleTodoState }) => (
    <ListItem onClick={() => toggleTodoState(todo.id)}>
        <ListItemIcon>{todo.complete ? <CheckBox /> : <CheckBoxOutlineBlank />}</ListItemIcon>
        <ListItemText primary={todo.value} />
    </ListItem>
);

export default withTheme()(withStyles(styles)(TodoApp));
