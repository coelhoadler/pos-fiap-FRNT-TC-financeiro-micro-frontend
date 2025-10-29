import React from 'react';

export const Button: React.FC = () => {
    return (
        <button style={{ border: '1px solid red' }} className={`font-family-base text-md px-4 py-2 rounded-[8px] font-semibold cursor-pointer transition-all ${'border border-link text-link hover:bg-link hover:text-white'

            }  `}>Financeiro UI Button</button>
    );
};

export default Button;
