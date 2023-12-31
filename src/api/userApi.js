export const saveUerToDatabase = async (user) => {
    const response = await fetch(`https://social-medea-app-server.vercel.app/api/v1/auth/signup`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)

    })
    const data = await response.json()
    return data
}
export const gmailSignupDataSaveToDB = async (user) => {
    const response = await fetch(`https://social-medea-app-server.vercel.app/api/v1/gmailAuth/signupWthGmail`, {
        method: "PUT",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)

    })
    const data = await response.json()
    return data
}

export const getUserByEmail = async (email) => {
    const response = await fetch(`https://social-medea-app-server.vercel.app/api/v1/users/${email}`)

    return await response.json()
}

export const updateSingleUser = async (id, user) => {
    const response = await fetch(`https://social-medea-app-server.vercel.app/api/v1/users/${id}`, {
        method: "PATCH",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)

    })
    const data = await response.json()
    return data
}