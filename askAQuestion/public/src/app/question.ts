export class Question {
    public _id;
    public question: string;
    public details: string;
    public questioner: string;
    public answers: Number;
    public _answer;

    constructor(){
        this.question = '';
        this.details = '';
        this.questioner = '';
        this.answers = null;
        this._answer;
    }
}
