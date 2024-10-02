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
                todo: tasks.filter((task: CardItem) => task.status === 'To Do'),
                inProcess: tasks.filter(
                    (task: CardItem) => task.status === 'In Process'
                ),
                done: tasks.filter((task: CardItem) => task.status === 'Done'),
            });
        });
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const handleDrop =
        (columnKey: keyof typeof columns) => (card: CardItem) => {
            const newColumns = { ...columns };

            // Update task status in new column
            const updatedCard = { ...card, status: columnKey };
            
            // Remove from old column
            for (const key in newColumns) {
                newColumns[key as keyof typeof columns] = newColumns[key as keyof typeof columns].filter(c => c.id !== card.id);
            }
            newColumns[columnKey].push(updatedCard);
            setColumns(newColumns);
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
                <Text pb={16}>KANBAN</Text>
                <TextInput
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    style={{ marginBottom: '10px', width: '300px' }}
                />
                <Textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    style={{ marginBottom: '10px', width: '300px' }}
                />
                <Button onClick={addTask} h={32} mb={48}>
                    Add Task
                </Button>

                <Grid w="90vw" h={'100vh'}>
                    <Grid.Col span={isMobileScreen ? 12 : 4}>
                        <Column
                            title="To Do"
                            cards={columns.todo}
                            onDropCard={handleDrop('todo')}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
   
                        />
                    </Grid.Col>
                    <Grid.Col span={isMobileScreen ? 12 : 4}>
                        <Column
                            title="In Process"
                            cards={columns.inProcess}
                            onDropCard={handleDrop('inProcess')}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}

                        />
                    </Grid.Col>
                    <Grid.Col span={isMobileScreen ? 12 : 4}>
                        <Column
                            title="Done"
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
