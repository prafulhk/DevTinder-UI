export interface Login {
    emailId:  string;
    password: string;
}

export interface LoginDetails {
    message: string;
    data:    LoginData;
}

export interface LoginData {
    _id?:       string;
    firstName?: string;
    lastName?:  string;
    emailId?:   string;
    password?:  string;
    __v?:       number;
    dob?:       Date;
    gender?:    string;
    photoURL?:  string;
    about?:     string;
    skills?:    string[];
}