export class Answer {
    public _id;
    public answer: string;
    public details: string;
    public answerer: string;
    public likes: number;
    public _question;

    constructor(){
        this.answer = '';
        this.details = '';
        this.answerer = '';
        this.likes = null;
        this._question;
    }
}
