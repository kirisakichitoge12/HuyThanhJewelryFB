import React, { createContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho user
interface User {
    id: number;
    name: string;
    email: string;
    phone:string;
    isadmin: number | null;
    weddingDate:string | null;
}

// Định nghĩa kiểu dữ liệu cho context
interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Khởi tạo context với kiểu dữ liệu
export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});

// Định nghĩa kiểu dữ liệu cho props của Provider
interface UserProviderProps {
    children: ReactNode;
}

// Tạo Provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const data = localStorage.getItem('user')
    let datauser=null;
    if(data)
    {
        datauser=JSON.parse(data);
    } 
    const [user, setUser] = useState<any | null>( datauser); // Lưu trữ user data

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
