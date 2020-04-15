
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Gender {
    UNKNOWN = "UNKNOWN",
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export enum Role {
    SUPERADMIN = "SUPERADMIN",
    ADMIN = "ADMIN",
    MENBER = "MENBER"
}

export class CreateUserInput {
    username?: string;
    password?: string;
    role?: string;
    gender?: string;
    fullName?: string;
}

export class User {
    _id: string;
    fullName: string;
    username: string;
    password: string;
    avatar?: string;
    gender: Gender;
    isOnline: boolean;
    createdAt: number;
}

export abstract class IQuery {
    abstract hello(): string | Promise<string>;
}

export abstract class IMutation {
    abstract createUser(input?: CreateUserInput): User | Promise<User>;
}

export abstract class ISubscription {
    abstract newUser(): User | Promise<User>;
}
