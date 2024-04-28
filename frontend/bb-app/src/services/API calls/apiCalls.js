export const registerUser = async (data) => {
    const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log(data)
    return response.json();
}