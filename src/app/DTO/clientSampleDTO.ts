export class ClientSampleDTO {
  id: number;
  file_name: string;
  file_type: string;
  path: string;
  relative_path: string;
  appointment_id: number;
  create_date: Date;
  update_date: Date;

  constructor(id: number, file_name: string, file_type: string, path: string, relative_path: string, appointment_id: number, create_date: Date, update_date: Date) {
    this.id = id;
    this.file_name = file_name;
    this.file_type = file_type;
    this.path = path;
    this.relative_path = relative_path;
    this.appointment_id = appointment_id;
    this.create_date = create_date;
    this.update_date = update_date;
  }
}
