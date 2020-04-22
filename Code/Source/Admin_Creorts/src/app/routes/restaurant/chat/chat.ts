export interface userlist {
  name: string;
  _id: number;
  imageUrl:string;
  avatar_url: string;
}

export interface chatData {
  sender: {
    name: string,
    id: string,
    email: string
  };
  receiver: {
    id: string,
    name: string,
    email: string
  };
  messages: any;
}

export interface showChat {
  id: string;
}

export interface userId {
  id: string;
}
