export class CustomerDTO {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  postal_code: number;
  company: string;
  university: string;
  club: string;
  email: string;
  phone_no: number;
  password: string;
  customer_type: string;
  create_date: Date;
  update_date: Date;

  constructor(id: number, first_name: string, last_name: string, address: string, city: string, postal_code: number,
              company: string, university: string, club: string, email: string, phone_no: number, password: string, customer_type: string,
              create_date: Date, update_date: Date) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.address = address;
    this.city = city;
    this.postal_code = postal_code;
    this.company = company;
    this.university = university;
    this.club = club;
    this.email = email;
    this.phone_no = phone_no;
    this.password = password;
    this.customer_type = customer_type;
    this.create_date = create_date;
    this.update_date = update_date;
  }
}
