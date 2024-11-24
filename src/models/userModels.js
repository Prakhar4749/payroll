class userModel{
    constructor(user){
        this.userid = user.userid || '';
        this.pass = user.pass ||'';
    }
}
export default userModel;