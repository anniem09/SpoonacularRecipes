import React from 'react';

export default function InstructionList({ instructions }) {

    const steps = instructions.split('.').filter(Boolean);

    return (
        <div>
            <h1>Instructions</h1>
            <ol>
                {steps.map((step, index) => (
                    <li key={index}>{step.trim()}.</li>
                ))}
            </ol>
        </div>
    );
};