export const uploadImage = async image => {
    const url = `https://api.imgbb.com/1/upload?key=a95a8e5bfa79deda8fe4df67e21b4f26`

    const formData = new FormData()
    formData.append('image', image)

    console.log('fromdata', formData)
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    })
    const data = await response.json()
    return data.data.url;
}