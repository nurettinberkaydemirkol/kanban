/* eslint-disable react/react-in-jsx-scope */
// src/App.tsx
import { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Button,
    TextInput,
    Textarea,
    Text,
} from '@mantine/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Column } from './components/Column';
import { fetchTasks, createTask } from './api';
import { CardItem } from './types';
import { useMediaQuery } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';

type ColumnKeys = 'todo' | 'inProcess' | 'done';

const isMobile = () => {
    return (
        typeof window !== 'undefined' &&
        /Mobi|Android/i.test(navigator.userAgent)
    );
};

function App() {
   
    const isMobileScreen = useMediaQuery('(max-width: 768px)');
    const [columns, setColumns] = useState<{
        todo: CardItem[];
        inProcess: CardItem[];
        done: CardItem[];
    }>({
        todo: [],
        inProcess: [],
        done: [],
    });

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const fetchAllTasks = () => {
        fetchTasks().then((response) => {
            const tasks = response.data;
            setColumns({
                todo: tasks.filter((task: CardItem) => task.status === 'todo'),
                inProcess: tasks.filter(
                    (task: CardItem) => task.status === 'inProcess'
                ),
                done: tasks.filter((task: CardItem) => task.status === 'done'),
            });
        });
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const handleDrop = (columnKey: keyof typeof columns) => (card: CardItem) => {
        const updatedCard = { ...card, status: columnKey };

        setColumns((prev) => {
            const newColumns = { ...prev };

            // Kartı önceki kolondan sil
            Object.keys(newColumns).forEach((key) => {
                newColumns[key as keyof typeof columns] = newColumns[key as keyof typeof columns].filter(
                    (c) => c.id !== card.id
                );
            });

            // Kartı yeni kolona ekle
            newColumns[columnKey].push(updatedCard);

            return newColumns;
        });
    };

    const addTask = () => {
        createTask({ title, description })
            .then((response) => {
                const newTask = { ...response.data };
                setColumns((prev) => ({
                    ...prev,
                    todo: [...prev.todo, newTask],
                }));
            })
            .catch((err) => console.error(err));
        setTitle('');
        setDescription('');
    };

    const handleDelete = (id: number) => {
        setColumns((prev) => ({
            todo: prev.todo.filter((task) => task.id !== id),
            inProcess: prev.inProcess.filter((task) => task.id !== id),
            done: prev.done.filter((task) => task.id !== id),
        }));
    };

    const handleUpdate = (id: number, updatedTask: CardItem) => {
        setColumns((prev) => {
            const updatedColumns = { ...prev };
            for (const key in updatedColumns) {
                const columnKey = key as ColumnKeys;
                updatedColumns[columnKey] = updatedColumns[columnKey].map(
                    (task) => (task.id === id ? updatedTask : task)
                );
            }
            return updatedColumns;
        });
    };

    return (
        <DndProvider backend={isMobile() ? TouchBackend : HTML5Backend}>

            <header  style={{width: "100%", padding: 8, backgroundColor: "#262833"}}>
                <Container  mb={8} size="md" className={classes.inner} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Text color='white' style={{fontWeight: "bold", fontSize: "32px", textAlign: "center"}}>KANBAN</Text>
                </Container>
            </header>

            <Container
                pt={32}
                w="100vw"
                h="100vh"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                
                <Container w={"100%"} mb={24} style={{display: "flex", flexDirection: "column", alignItems: "center"}}> 
                    <TextInput
                        placeholder="Task Title"
                        bg={"#262833"}
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                        style={{ marginBottom: '10px', width: '90%'}}
                    />
                    <Textarea
                        placeholder="Task Description"
                        color='#262833'
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        style={{ marginBottom: '10px', width: '90%' }}
                    />
                    <Button color='#36c7d0' onClick={addTask} w={"90%"} mb={48}>
                       <Text color='#262833' style={{fontWeight: "bold"}}>Add Task</Text> 
                    </Button>
                </Container>

                <Grid w="90vw" h={'100vh'}>
                    <Grid.Col span={isMobileScreen ? 12 : 4}>
                        <Column
                            title="todo"
                            cards={columns.todo}
                            onDropCard={handleDrop('todo')}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
   
                        />
                    </Grid.Col>
                    <Grid.Col span={isMobileScreen ? 12 : 4}>
                        <Column
                            title="inProcess"
                            cards={columns.inProcess}
                            onDropCard={handleDrop('inProcess')}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}

                        />
                    </Grid.Col>
                    <Grid.Col span={isMobileScreen ? 12 : 4}>
                        <Column
                            title="done"
                            cards={columns.done}
                            onDropCard={handleDrop('done')}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}

                        />
                    </Grid.Col>
                </Grid>
            </Container>
        </DndProvider>
    );
}

export default App;
