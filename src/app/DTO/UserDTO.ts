export class UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  userName: string;
  email: string;
  password: string;
  newPassword: string;
  status: string;
  createDate: Date;
  updateDate: Date;

  constructor(id: number, firstName: string, lastName: string, role: string, userName: string, email: string, password: string, newPassword: string, status: string, createDate: Date, updateDate: Date) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.newPassword = newPassword;
    this.status = status;
    this.createDate = createDate;
    this.updateDate = updateDate;
  }


}
