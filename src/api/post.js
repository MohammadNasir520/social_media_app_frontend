export const createPost = async (post) => {
    console.log("chekin", post)
    const response = await fetch(`http://localhost:5000/api/v1/posts/create-post`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(post)
    })

    return await response.json()
}
export const getAllPosts = async () => {

    const response = await fetch(`http://localhost:5000/api/v1/posts`)
    return await response.json()
}
