import { useEffect, useState } from "react";
import { Alert } from "react-native";



const appWriteFetch = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true)
        try {
            // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const resposne = await fn();
            setData(resposne)
        } catch (error) {
            Alert.alert('Error', error.message)
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, []);
    const refetchData = () => {
        fetchData();
    }
    return { data, isLoading, refetchData }
}

export default appWriteFetch;