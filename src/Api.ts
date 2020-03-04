
interface IProsCons {
    pros: string[],
    cons: string[]
}
class Api {
    url: string;
    groupID: string;
    userID: string;
    userName: string;

    constructor(url: string){
        this.groupID = '';
        this.userID = '';
        this.url = url;
        this.userName = 'mihran_gasparyan'
    }

    async getGroupid():Promise<string> {
        if(this.groupID){
            return this.groupID
        }else{
            try{
                const response = await fetch(`${this.url}/group/${this.userName}`);
                const data = await response.json();
                this.groupID = data.groupId;
                return data.groupId;
            }catch (e) {
                console.error(e);
                return e
            }
        }
    }

    async getUserid(): Promise<string> {

        if(this.userID){
            return this.userID
        }else{
            try{
                const response = await fetch(`${this.url}/user/${this.userName}`);
                const data = await response.json();
                this.userID = data.userId;
                return data.userId;
            }catch (e) {
                console.error(e);
                return e
            }
        }
    }

    async getProsCons(): Promise<IProsCons> {
          try{
              const userID =  await this.getUserid();
              const groupID = await  this.getGroupid();
              const response = await fetch(`${this.url}/proscons/group/${groupID}/user/${userID}`);
              const data = await response.json()
              return JSON.parse(data)
          }catch (e) {
              console.error(e);
              return e
          }
    }

    async updateProsCons(PC: IProsCons): Promise<any> {
        try{
            const userID =  await this.getUserid();
            const groupID = await  this.getGroupid();
            const response = await fetch(`${this.url}/proscons/group/${groupID}/user/${userID}`, {
                method: 'PUT',
                body: JSON.stringify(PC)
            });
            return await response.json()
        }catch (e) {
            console.error(e);
            return false
        }
    }

}



export const api: Api = new Api('https://avetiq-test.firebaseapp.com');
