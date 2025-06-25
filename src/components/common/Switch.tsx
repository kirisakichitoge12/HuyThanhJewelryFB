import React from 'react'

interface SwitchProps{
    checked: boolean;
    onToggle: () => void;
}

const Switch: React.FC<SwitchProps> = ({
    checked,
    onToggle
}) => {
    return (
        <label className="relative inline-flex cursor-pointer">
        <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={onToggle}
        />
        <div className={`w-11 h-6 rounded-full transition-all duration-200 
          ${checked ? 'bg-yellow-400' : 'bg-gray-200'}`}>
          <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 
            ${checked ? 'translate-x-6' : 'translate-x-1'} translate-y-0.5`} />
        </div>
      </label>
    )
}

export default Switch