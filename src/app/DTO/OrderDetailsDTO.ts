export class OrderDetailsDTO {
  id: number;
  orderType: string;
  material: string;
  quantity: number;
  swingPlace: string;
  payment: string;
  advance: number;
  description: string;
  dispatchDate: Date;
  appointment_id: number;
  invoiceNo: string;
  createDate: Date;
  updateDate: Date;
  orderStatus: string;

  constructor(id: number, orderType: String, material: string, quantity: number, swingPlace: string, payment: string,
              advance: number, description: string, dispatchDate: Date, appointment_id: number, invoiceNo: string, createDate: Date, updateDate: Date, orderStatus: string) {
    this.id = 0;
    this.orderType = '';
    this.material = '';
    this.quantity = 0;
    this.swingPlace = '';
    this.payment = '';
    this.advance = 0;
    this.description = '';
    this.dispatchDate = new Date();
    this.appointment_id = 0;
    this.invoiceNo = '';
    this.createDate = new Date();
    this.updateDate = new Date();
    this.orderStatus = '';
  }
}
