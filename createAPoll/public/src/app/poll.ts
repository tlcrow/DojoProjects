export class Poll {
    public _id;
    public question: string;
    public option_one: string;
    public option_two: string;
    public option_three: string;
    public option_four: string;
    public creator_first: string;
    public creator_last: string;
    public creator_email: string;
    public votes: number;
    public _registration;

    constructor(){
        this.question = "";
        this.option_one = "";
        this.option_two = "";
        this.option_three = "";
        this.option_four = "";
        this.creator_first = "";
        this.creator_last = "";
        this.creator_email = "";
        this.votes = null;

    }

}
