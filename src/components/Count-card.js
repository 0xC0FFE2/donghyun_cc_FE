import React from 'react';

function PeopleCount({ count }) {
    return (
        <div className="mt-2 p-2 border rounded-lg mb-2 bg-gray-300">
            <h3 className="text-ml text-gray-900 text-center mb-1">
                📖 지금까지 총 {count}명이 사이트를 방문하여 더 나은 성장을 위한 지식을 얻어가셨습니다
            </h3>
        </div>
    );
}

export default PeopleCount;
