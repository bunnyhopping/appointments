import { Component, OnInit } from '@angular/core';
import { Appointment } from '../Appointment';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public successMsg: string;
  public errorMsg: string;
  public appointmentDate: string;
  public name: string;
  public email: string;

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
  }

  createAppointment(){
    this.successMsg = '';
    this.errorMsg = '';
    console.log(this.appointmentDate);
    this.appointmentService.createAppointment(this.appointmentDate, this.name, this.email)
    .subscribe((createdAppointment: Appointment) => {
      //console.log(createdAppointment); //Aquí la respuesta es distinta y por ende el código se tuvo que adaptar
      const appointmentDate = new Date(this.appointmentDate).toDateString();
      this.appointmentDate = '';
      this.name = '';
      this.email = '';
      this.successMsg = `Appointment booked successfully for ${appointmentDate}`;
      //this.successMsg = `Appointment booked successfully for ${createdAppointment.appointmentDate}`;
      //En vista de la diferencia de la respuesta de MongoDB el código fue adaptado para que pudiese mostrarse la fecha con formato
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
    });

  }

}
