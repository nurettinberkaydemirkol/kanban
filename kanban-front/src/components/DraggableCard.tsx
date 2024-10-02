import React, { useState } from 'react';
import { Card, Text, Button, Modal, TextInput, Textarea, Container } from '@mantine/core';
import { useDrag } from 'react-dnd';
import { updateTask, deleteTask } from '../api';
import { CardItem } from '../types';

const ItemTypes = {
    CARD: 'card',
};

export const DraggableCard: React.FC<{
    card: CardItem;
    onDelete: (id: number) => void;
    onUpdate: (id: number, updatedTask: CardItem) => void;
}> = ({ card, onDelete, onUpdate }) => {

    console.log(card);

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: {
            id: card.id,
            title: title,
            description: description,
            status: card.status,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));



    const handleEdit = () => {
        const updatedTask = { ...card, title, description };
        updateTask(card.id, updatedTask)
            .then((response) => {
                console.log("response", response.data);
                onUpdate(card.id, response.data);
                setDescription(response.data.description);
                setTitle(response.data.title);
                setIsEditing(false);
            })
            .catch((err) => console.error(err));
    };

    const handleDelete = () => {
        deleteTask(card.id)
            .then(() => onDelete(card.id))
            .catch((err) => console.error(err));
    };

    return (
        <>
            <Card
                radius={15}
                ref={drag}
                shadow="sm"
                p="lg"
                style={{ opacity: isDragging ? 0.5 : 1, marginBottom: 10 }}
            >
                <Text>{card.title}</Text>
                <Text size="sm">{card.description}</Text>
                <Container mt={32} w={"100%"} style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <Button
                        radius={10}
                        onClick={() => setIsEditing(true)}
                        style={{ marginTop: 10 }}
                        w={"40%"}
                        m={4}
                    >
                        Edit
                    </Button>
                    <Button
                        radius={10}
                        color="red"
                        onClick={handleDelete}
                        style={{ marginTop: 10 }}
                        w={"40%"}
                        m={4}
                    >
                        Delete
                    </Button>
                </Container>
            </Card>

            <Modal
                opened={isEditing}
                onClose={() => setIsEditing(false)}
                title="Edit Task"
            >
                <TextInput
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <Textarea
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                />
                <Button onClick={handleEdit} style={{ marginTop: 10 }}>
                    Save
                </Button>
            </Modal>
        </>
    );
};
