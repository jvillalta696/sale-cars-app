import { useState, useEffect } from 'react';

function useCurrentDate() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        //const date = new Date().toLocaleDateString('es-CR').split('/').reverse().join('-');
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');

        const date = `${year}-${month}-${day}`;
        setCurrentDate(date);
    }, []);

    return currentDate;
}

export default useCurrentDate;