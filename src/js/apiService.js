async function fetchCard(search = "tags", page = 1) {
    try {
        const response = await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${search}&page=${page}&per_page=12&key=20957526-09ced1a4e1530381aa17126c6`);
        if(!response.ok){
            throw new Error("Список фото временно недоступен")
        }
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

export default fetchCard;