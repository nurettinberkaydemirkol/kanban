import React, { useState, useEffect } from 'react';
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

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);

    // card güncellendiğinde title ve description'u senkronize et
    useEffect(() => {
        setTitle(card.title);
        setDescription(card.description);
    }, [card]);

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
        const status = card.status;
        const updatedTask = { ...card, title, description, status };
        updateTask(card.id, updatedTask)
            .then((response) => {
                const updatedData = response.data;

                // Bileşen içinde title ve description güncelleniyor
                setTitle(updatedData.title);
                setDescription(updatedData.description);

                // Üst bileşene güncellenmiş veriyi gönder
                onUpdate(card.id, updatedData); 
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
                style={{ opacity: isDragging ? 0.5 : 1, marginBottom: 10, cursor: "grab" }}
            >
                <Container mb={24} w={"50%"} h={10} style={{borderRadius: "10px"}} bg={card.status === "todo" ? "red" : card.status !== "done" ? "yellow" : "green"}/>
                <Text style={{fontSize: "18", fontWeight: "bold", color: "#111111", textAlign: "center"}}>{title}</Text>
                <Text mt={8} style={{textAlign: "center"}} size="sm">{description}</Text>
                <Container mt={32} w={"100%"} style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <Button
                        radius={10}
                        onClick={() => setIsEditing(true)}
                        style={{ marginTop: 10 }}
                        w={"40%"}
                        m={4}
                        color="#4acfac"
                    >
                        Edit
                    </Button>
                    <Button
                        radius={10}
                        color="#ffa48e"
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
                <Button color='#4acfac' onClick={handleEdit} style={{ marginTop: 10 }}>
                    Save
                </Button>
            </Modal>
        </>
    );
};
