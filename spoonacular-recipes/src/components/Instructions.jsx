import React from 'react';

export default function InstructionList({ instructions }) {

    const steps = instructions.split('.').filter(Boolean);

    return (
        <div className='instructionsContainer'>
            <h3>Instructions</h3>
            <ol className='numberedList'>
                {steps.map((step, index) => (
                    <li key={index}>{step.trim()}.</li>
                ))}
            </ol>
        </div>
    );
};