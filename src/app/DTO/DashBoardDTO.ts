export class DashBoardDTO {
  totalOrders: number;
  totalCustomers: number;
  totalPendingOrders: number;
  totalPendingAppointments: number;
  totalRevenue: number;
  month: number;
  year: number;
  montlyRevenue: number;
  montlyOrders: number;
  dashBoardDTOList: Array<DashBoardDTO>;

  constructor(totalOrders: number, totalCustomers: number, totalPendingOrders: number, totalPendingAppointments: number, totalRevenue: number, month: number,
              year: number, montlyRevenue: number, montlyOrders: number, dashBoardDTOList: DashBoardDTO[]) {
    this.totalOrders = totalOrders;
    this.totalCustomers = totalCustomers;
    this.totalPendingOrders = totalPendingOrders;
    this.totalPendingAppointments = totalPendingAppointments;
    this.totalRevenue = totalRevenue;
    this.month = month;
    this.year = year;
    this.montlyRevenue = montlyRevenue;
    this.montlyOrders = montlyOrders;
    this.dashBoardDTOList = dashBoardDTOList;
  }
}
