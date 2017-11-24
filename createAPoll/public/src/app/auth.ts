export class Auth {
    public _id;
    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;
    public password_confirmation: string;
    // public birthday: string;
    public _poll;

    constructor(){
        this.first_name = "";
        this.last_name = "";
        this.email = "";
        this.password = "";
        this.password_confirmation = "";
        // this.birthday = "";
    }

}
