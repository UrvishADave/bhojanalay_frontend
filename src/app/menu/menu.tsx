'use client';

import React, { useEffect, useState } from 'react';

interface MenuItem {
    id: number;
    name: string;
    price: number;
}

const Menu: React.FC = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/menu/');
                const data = await response.json();
                setMenuItems(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching menu:', error);
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Menu</h1>
            <ul style={{ listStyleType: 'none' }}>
                {menuItems.map((item) => (
                    <li key={item.id} style={{ marginBottom: '10px' }}>
                        <strong>{item.name}</strong> - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;
