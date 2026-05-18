import { useState, useEffect } from 'react';

const roles = ['role_1', 'role_2', 'role_3', 'role_4', 'role_5'];

export const useRotatingRole = (interval: number = 2000) => {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [roleKey, setRoleKey] = useState(roles[0]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentRoleIndex((prev) => {
                const next = (prev + 1) % roles.length;
                setRoleKey(roles[next]);
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [interval]);

    return roleKey;
};
