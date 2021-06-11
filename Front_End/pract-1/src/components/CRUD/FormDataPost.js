async function FormDataPost(Data, _id, string_1, string_2) {
    const apiUrl = process.env.REACT_APP_API_URL
    const endpoint = `${apiUrl}/${string_1}/${_id}/${string_2}`;

    try {
        let response = await fetch(endpoint, {
            method: "POST",
            body: Data,
        });
        if (response.ok) {
            console.log("Your File is posted");
            return true
        }
    } catch (error) {
        return false;

    }
}

export default FormDataPost;
