export const createPost = async (post) => {
    console.log("chekin", post)
    const response = await fetch(`https://social-medea-app-server.vercel.app/api/v1/posts/create-post`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(post)
    })

    return await response.json()
}


export const getSinglePostById = async (id) => {

    const response = await fetch(`https://social-medea-app-server.vercel.app/api/v1/posts/${id}`)
    return await response.json()
}


export const getAllPosts = async (paginationOptions) => {
    const { page, limit, sortBy, sortOrder } = paginationOptions
    const response = await fetch(`https://social-medea-app-server.vercel.app/api/v1/posts/?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
    return await response.json()
}
