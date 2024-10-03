// src/components/Column.tsx
import React from 'react';
import { Text } from '@mantine/core';
import { useDrop } from 'react-dnd';
import { DraggableCard } from './DraggableCard';
import { CardItem } from '../types';
import { updateTask } from '../api';

interface ColumnProps {
    title: string;
    cards: CardItem[];
    onDropCard: (card: CardItem) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, updatedTask: CardItem) => void;
}

const ItemTypes = {
    CARD: 'card',
};

export const Column: React.FC<ColumnProps> = ({
    title,
    cards,
    onDropCard,
    onDelete,
    onUpdate,
}) => {
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: async (item: CardItem) => {
            console.log("Dropped item before update:", item); 
    
            const updatedCard = { ...item, status: title };
            console.log("Updated card:", updatedCard); 
    
            try {
                await updateTask(item.id, updatedCard);

                onDropCard(updatedCard); 
            } catch (err) {
                console.error("Update task error:", err);
            }
        },
    });

    return (
        <div
            ref={drop}
            style={{
                padding: '20px',
                backgroundColor: '#7E8CE0',
                minHeight: '300px',
                borderRadius: '30px'
            }}
        >
            <Text style={{ marginBottom: '10px', textAlign: "center", fontWeight: "bold", color: "white" }}>{title}</Text>
            {cards.map((card) => (
                <DraggableCard
                    key={card.id}
                    card={card}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
};
