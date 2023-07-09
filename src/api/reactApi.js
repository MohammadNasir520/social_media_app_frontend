export const createReact = async (react) => {
    console.log(react)
    const response = await fetch(`https://social-medea-app-server.vercel.app/api/v1/reacts/create-react`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(react)
    })

    return await response.json()
}


export const getAllReactsOfSinglePost = async (id) => {
    const response = await fetch(`https://social-medea-app-server.vercel.app/api/v1/reacts/${id}`)
    return await response.json()
}

// export const getSinglePostById = async (id) => {

//     const response = await fetch(`https://social-medea-app-server.vercel.app/api/v1/posts/${id}`)
//     return await response.json()
// }



