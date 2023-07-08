export const createComment = async (comment) => {
    console.log(comment)
    const response = await fetch(`http://localhost:5000/api/v1/comments/create-comment`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(comment)
    })

    return await response.json()
}


// export const getSinglePostById = async (id) => {

//     const response = await fetch(`http://localhost:5000/api/v1/posts/${id}`)
//     return await response.json()
// }


// export const getAllPosts = async () => {
//     const response = await fetch(`http://localhost:5000/api/v1/posts`)
//     return await response.json()
// }
