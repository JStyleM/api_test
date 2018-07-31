class DataRetriever {

    static get TRIGGER_ELM() {
        return document.querySelector('.user-button')
    }

    static get INPUT_ELM() {
        return document.querySelector('.user-input');
    }

    getUser() {
        const userId = DataRetriever.INPUT_ELM.value;
        console.log(userId);
    }

    init() {
        DataRetriever.TRIGGER_ELM.addEventListener('click', this.getUser.bind(this));
    }

}

const dataRetriever = new DataRetriever();
dataRetriever.init();