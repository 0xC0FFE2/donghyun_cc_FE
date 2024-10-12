import React, { useEffect, useState } from 'react';

function PeopleCount() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const currentTime = new Date().getTime();
        const cachedData = localStorage.getItem('blogData');
        const cachedTime = localStorage.getItem('lastUpdated');

        const twelveHours = 12 * 60 * 60 * 1000;

        if (cachedData && cachedTime) {
            if (currentTime - cachedTime < twelveHours) {
                const data = JSON.parse(cachedData);
                setCount(data.blog_total_views);
                return;
            }
        }

        fetch('http://localhost:5500/blog/info')
            .then(response => response.json())
            .then(data => {
                setCount(data.blog_total_views);
                localStorage.setItem('blogData', JSON.stringify(data));
                localStorage.setItem('lastUpdated', currentTime);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="mt-2 p-2 border rounded-lg mb-2 bg-gray-300">
            <h3 className="text-ml text-gray-900 text-center mb-1">
                📖 지금까지 총 {count}명이 사이트를 방문하여 더 나은 성장을 위한 지식을 얻어가셨습니다.
            </h3>
        </div>
    );
}

export default PeopleCount;
