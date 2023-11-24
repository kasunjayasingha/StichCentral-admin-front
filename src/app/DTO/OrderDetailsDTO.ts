export class OrderDetailsDTO {
  id: number;
  orderType: string;
  material: string;
  quantity: number;
  swingPlace: string;
  advance: number;
  description: string;
  dispatchDate: Date;
  appointment_id: number;

  constructor(id: number, orderType: String, material: string, quantity: number, swingPlace: string, advance: number, description: string, dispatchDate: Date, appointment_id: number) {
    this.id = 0;
    this.orderType = '';
    this.material = '';
    this.quantity = 0;
    this.swingPlace = '';
    this.advance = 0;
    this.description = '';
    this.dispatchDate = new Date();
    this.appointment_id = 0;
  }
}
