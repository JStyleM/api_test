class DataRetriever {

    static get API_URL() {
        return 'https://jsonplaceholder.typicode.com';
    }

    static get TRIGGER_ELM() {
        return document.querySelector('.user-button')
    }

    static get INPUT_ELM() {
        return document.querySelector('.user-input');
    }

    static get USER_ELM() {
        return document.querySelector('.user-name');
    }

    static get POST_ELM() {
        return document.querySelector('.user-posts');
    }

    /** Funcion para manejar el Ajax Call */
    ajaxCall(url) {
        fetch(url)
            .then(data => data.json(data))
            .then(data => this.dataGen.next(data))
            .catch(err => `Problemas con la informacion ${err}`);
    }

    /** Funcion para llamar al Ajax Call */
    *getInfo(userId) {
        const user = yield this.ajaxCall(`${DataRetriever.API_URL}/users/${userId}`);
        const posts = yield this.ajaxCall(`${DataRetriever.API_URL}/posts?userId=${userId}`); 
        this.renderTemplate(user, posts);
    }

    /** Renderiza los datos en HTML */
    renderTemplate(user, posts) {
        const { name, username } = user;
        const userHeader = `<strong>${name}</strong> alias <strong>${username}</strong>`;
        const postsTitles = posts.map(post => `<li>${post.title}</li>`).join('');
        DataRetriever.USER_ELM.innerHTML = userHeader;
        DataRetriever.POST_ELM.innerHTML = postsTitles;
    }

    /** Obtener el Id del Usuario desde el input */
    getUser() {
        const userId = DataRetriever.INPUT_ELM.value;
        this.dataGen = this.getInfo(userId);
        this.dataGen.next();
    }

    /** Listenner del evento click del Boton */
    init() {
        DataRetriever.TRIGGER_ELM.addEventListener('click', this.getUser.bind(this));
    }

}

const dataRetriever = new DataRetriever();
dataRetriever.init();