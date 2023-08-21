export interface IUser {
    name: string,
    email: string,
    password: string
}

export interface IColor {
    id: String,
    name: String,
    code: String
}

export interface IIcon {
    id: String,
    name: String,
    symbol: String
}

export interface ICategory {
    _id: String,
    name: String,
    isEditable: boolean,
    user: String | IUser,
    color: IColor,
    icon: IIcon
}

export interface ITask {
    _id: String,
    user: String,
    categoryId: String,
    name: String,
    isCompleted: Boolean,
    date: String,
    isEditable: Boolean,
    createdAt: String,
    updatedAt: String
}