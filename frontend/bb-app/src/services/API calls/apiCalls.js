export const registerUser = async (data) => {
    const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export const createTeam = async (data) => {
    return fetch('http://localhost:3000/api/v1/teams', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())  // Convierte la respuesta en JSON
        .then(data => {
            return data;  // Retorna los datos para ser usados en otro lugar
        })
        .catch(error => {
            console.error('Error al crear el equipo:', error);
        });
}

export const loginUser = async (data) => {
    return fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())  // Convierte la respuesta en JSON
        .then(data => {
            return data;  // Retorna los datos para ser usados en otro lugar
        })
        .catch(error => {
            console.error('Error en el login:', error);
        });
}

export const getAllPlayers = async () => {
    return fetch('http://localhost:3000/api/v1/entrenador/jugadores', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())  // Convierte la respuesta en JSON
        .then(data => {
            return data;  // Retorna los datos para ser usados en otro lugar
        })
        .catch(error => {
            console.error('Error al obtener los jugadores:', error);
        });
}

export const getAllTeams = async () => {
    return fetch('http://localhost:3000/api/v1/entrenador/equipos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())  // Convierte la respuesta en JSON
        .then(data => {
            return data;  // Retorna los datos para ser usados en otro lugar
        })
        .catch(error => {
            console.error('Error al obtener los equipos:', error);
        });
}

export const getEntrenador = async (userid) => {
    return fetch(`http://localhost:3000/api/v1/entrenador/entrenador/equipo/${userid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())  // Convierte la respuesta en JSON
        .then(data => {
            return data;  // Retorna los datos para ser usados en otro lugar
        })
        .catch(error => {
            console.error('Error al obtener el entrenador:', error);
        });
}




