export interface User {
    id: string;
    name: string;
    last_name: string;
    second_last_name: string;
}

export type UpdateProfileParams = {
    name: string;
    last_name: string;
    second_last_name: string;
};

export type ChangePasswordParams = {
    password: string;
    new_password: string;
};
