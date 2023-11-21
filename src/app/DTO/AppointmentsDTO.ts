import {ClientSampleDTO} from "./clientSampleDTO";
import {CustomerDTO} from "./customerDTO";

export class AppointmentsDTO {
  id: number;
  customer_Id: number;
  appointment_date: Date;
  type: string;
  status: string;
  description: string;
  client_sample: ClientSampleDTO;
  customer: CustomerDTO;


  constructor(id: number, customer_Id: number, appointment_date: Date, type: string,
              status: string, description: string, client_sample: ClientSampleDTO, customer: CustomerDTO) {
    this.id = id;
    this.customer_Id = customer_Id;
    this.appointment_date = appointment_date;
    this.type = type;
    this.status = status;
    this.description = description;
    this.client_sample = client_sample;
    this.customer = customer;
  }

}

