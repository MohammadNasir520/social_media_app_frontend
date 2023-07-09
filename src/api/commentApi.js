export const createComment = async (comment) => {
    console.log(comment)
    const response = await fetch(`https://social-medea-app-server.vercel.app/api/v1/comments/create-comment`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(comment)
    })

    return await response.json()
}


export const getAllCommentsOfSinglePost = async (id) => {
    const response = await fetch(`https://social-medea-app-server.vercel.app/api/v1/comments/${id}`)
    return await response.json()
}

// export const getSinglePostById = async (id) => {

//     const response = await fetch(`https://social-medea-app-server.vercel.app/api/v1/posts/${id}`)
//     return await response.json()
// }



