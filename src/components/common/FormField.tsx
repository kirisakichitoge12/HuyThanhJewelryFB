import { IconType } from "react-icons"; 

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    type?: 'text' | 'password' | 'email' | 'number' | "phone";
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean;
    error?: string;
    icon?: IconType;
    onSubmit?: VoidFunction;
    disabled?: boolean;
    title?: string;
}

const FormField: React.FC<FormFieldProps> = ({
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    required = false,
    className = '',
    error,
    icon: Icon, 
    onSubmit,
    title,
    disabled = false
}) => {
    const iconClasses = Icon 
        ? "rounded-full focus:shadow-md border-gray-100 border-[1px]" 
        : "rounded-lg focus:ring-[1px] focus:ring-blue-500 focus:border-blue-500"
    const baseClasses = "w-full shadow px-4 outline-none py-2 focus:ring-blue-500 focus:border-blue-500 bg-[#fdfdfd]";
    const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "";
    
    return (
        <div className={`w-full relative ${className}`}>
            {
                Icon && <button onClick={onSubmit} className="absolute top-[5px] right-[5px] rounded-full bg-gray-100 p-2 text-gray-400">
                        <Icon/>
                    </button>
            } 
            { title && <label className="text-sm font-medium">{title}</label> }
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`${baseClasses} ${errorClasses} ${iconClasses}`}
                name={name}
                required={required}
                disabled={disabled}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};

export default FormField;