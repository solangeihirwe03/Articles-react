
const localStorageUtil = {
    setItem(key:string, value: any) {
        try{
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue)

        }catch(error){
            console.error(`Error setting item in local storage: ${error}`)
        }
    },
    getItem(key: string){
        try{
            const serializedValue = localStorage.getItem(key);
            return serializedValue ? JSON.parse(serializedValue) : null
        }catch(error){
            console.error(`Error getting item frm localStorage: ${error}`)
        }
    },
    remoteItem(key: string){
        try{
            localStorage.removeItem(key)
        }catch(error){
            console.error(`Error removing item from localStorage: ${error}`);
        }
    }
}

export default localStorageUtil