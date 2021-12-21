import { useState } from "react";
import { useCookies } from 'react-cookie'

function useCookie(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
 
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        let expires = new Date()
        expires.setTime(expires.getTime() + (response.data.expires_in * 1000))
        setStoredValue(value);
        setCookie(key, value, { path: '/',  expires})
      } catch (error) {
        console.log(error);
      }
    };

    return [storedValue, setValue];
  }

  export {
     useCookie
  }