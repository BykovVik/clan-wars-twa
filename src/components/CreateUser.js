import React from "react";
import axios from 'axios';

const CreateUser = async(data) => {
    return (
        <div>
            {data}
        </div>
    )
    /**try {
        const response = await axios.post('http://127.0.0.1:8000/users/', {
        name: 'John Doe',
        email: 'john.doe@example.com'
        });

        console.log('User created:', response.data);
    } catch (error) {
        console.error('Error creating user:', error);
    }**/
}

export default CreateUser