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
        drop: (item: CardItem) => {
            
            item.status = title;

            updateTask(item.id, item)
                .then(() => {
                    onDropCard(item);
                })
                .catch((err) => console.error(err));
        },
    });

    return (
        <div
            ref={drop}
            style={{
                padding: '20px',
                backgroundColor: '#f0f0f0',
                minHeight: '300px',
                borderRadius: '30px'
            }}
        >
            <Text style={{ marginBottom: '10px', textAlign: "center", fontWeight: "bold" }}>{title}</Text>
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
