export interface Feed {
    data: Feeds[];
}

export interface Feeds {
    _id:       string;
    firstName: string;
    lastName:  string;
    emailId:   string;
    password:  string;
    __v:       number;
    dob?:      Date;
    gender?:   string;
    photoURL:  string;
    about:     string;
    skills:    string[];
}