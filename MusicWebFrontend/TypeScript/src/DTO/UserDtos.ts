export interface UserDto {
    id: number;
    name: string;
    firstName?: string;
    lastName?: string;
    email: string;
    roleId: number;
    roleName: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterUserDto {
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    confirmPassword: string;
}

export interface ChangePasswordDto {
    password: string;
    newPassword: string;
    confirmPassword: string;
}

export interface UptateUserDto {
    name?: string;
    email?: string;
    roleId?: number;
}

export interface UpdateCurrentUserDTO {
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}