import { useState, useEffect } from "react";

export interface LocalStorage {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

export default function useLocalStorage(initialValue: any, key: string){
    const getValue = () => {
        const storage = localStorage.getItem(key); // string || null
    
        if (storage) {
          return JSON.parse(storage); // '[]', '{}', ''
        }
    
        return initialValue;
      };
    
      const [value, setValue] = useState(getValue);
    
      useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
      }, [value]);
    
      return [value, setValue];
}

