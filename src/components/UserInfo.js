export default class UserInfo {
    constructor(profileName, profileProfession) {
        this._profileName = profileName;
        this._profileProfession = profileProfession;
    }
 
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            profession: this._profileProfession.textContent,
        }
    }

    setUserInfo(userName, userProfession) {
        this._profileName.textContent = userName;
        this._profileProfession.textContent = userProfession;
    }
}