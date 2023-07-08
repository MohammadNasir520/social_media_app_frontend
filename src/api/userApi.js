export const saveUerToDatabase = async (user) => {
    const response = await fetch(`http://localhost:5000/api/v1/auth/signup`, {
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
    const response = await fetch(`http://localhost:5000/api/v1/gmailAuth/signupWthGmail`, {
        method: "PUT",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)

    })
    const data = await response.json()
    return data
}
