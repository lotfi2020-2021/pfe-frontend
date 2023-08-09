import { Component, ChangeDetectorRef, OnInit,ViewChild,AfterViewInit } from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventDropArg } from '@fullcalendar/core';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ComfirmDialogAgendaComponent } from '../confirm-dialog-agenda/confirm-dialog-agenda.component';
import { AddAgendaComponent } from '../add-agenda/add-agenda.component';

import { UpdateAgendaComponent } from '../update-agenda/update-agenda.component';

import { AddEventComponent } from '../add-event/add-event.component';
import { GoogleCalenderService } from 'app/modules/service/google-calender.service';
import { UserService } from 'app/modules/service/user.service';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { Event } from 'app/modules/model/event';
import { AgendaDetailsComponent } from '../agenda-details/agenda-details.component';



@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent {
  end:any;
  start:any ;
  colors:any
    searchByName:any
   
    afterFilter:any
    displayedColumns = ['Name', 'CreatedAt', 'FinishedAt','Delete','Infos'];
    dataSource = new MatTableDataSource<any>([]);
    events: EventListenerObject[] = [];
    event:any;
    calenderEvents:any
    authUser:any ;
    eventId:any ;
    calenders ;
    selectedEvent:any;
    calenderId:any ;
    index:any;
 
    ngOnInit(): void {
     
      this.afterFilter = this. getCalenders() ;
      this.getColors();
     
   
    }
  
  
    constructor(private changeDetector: ChangeDetectorRef, 
      private route: ActivatedRoute,  public matDialog: MatDialog ,private snackBar:MatSnackBar,
     private router :Router , private googleCalenderService :GoogleCalenderService ,
     private userService :UserService    ) {
   }
  


  

    selectCheckbox(index: number) {
      this.afterFilter.forEach((item, i) => {
        item.selected = (i === index);
      });
      const selectedCheckbox = this.afterFilter[index];
      if (selectedCheckbox) {
        selectedCheckbox.selected = true; // Set the selected checkbox to true
        this.calenderId = selectedCheckbox.id;
        console.log("calenderid: " + this.calenderId);
        this.geteventsByCalenderId();
      }
    }
  
  
    handleEvents(events: EventApi[]) {
     this.currentEvents = events;
      this.changeDetector.detectChanges();
      
     }
  
    
  
    ngAfterViewInit() {

    }
  
  
    openConfirmationDialog(id : any): void {
      const dialogRef = this.matDialog.open(ComfirmDialogAgendaComponent, {
        width: '250px',
        height:'auto',
        data: id
      });
  
      dialogRef.afterClosed().subscribe({
        next :(res:any)=>{
          this.getCalenders();
        },
        error: (err:any)=>{
  
        }
      })  
    }
  
    openAddCalender(): void {
      const dialogRef = this.matDialog.open(AddAgendaComponent, {
        width: '500px',
        height:'auto' ,
        
      });
  
      dialogRef.afterClosed().subscribe({
        next :(res:any)=>{
          this.getCalenders();
        },
        error: (err:any)=>{
  
        }
      })  
    }
  
    openUpdateCalender(id :any): void {
      const dialogRef = this.matDialog.open(UpdateAgendaComponent, {
        width: '500px',
        height:'auto' ,
        data :id
      });
  
      dialogRef.afterClosed().subscribe({
        next :(res:any)=>{
          this.getCalenders();
          
        },
        error: (err:any)=>{
  
        }
      })  
    
    }
  
    openDetailsCalender(id :any): void {
      const dialogRef = this.matDialog.open(AgendaDetailsComponent, {
        width: '500px',
        height:'auto' ,
        data :id
      });
  
      dialogRef.afterClosed().subscribe({
        next :(res:any)=>{
          this.getCalenders();
        },
        error: (err:any)=>{
  
        }
      })  
    }
  
  
  
  
    calendarVisible = true;
    calendarOptions: CalendarOptions = {
  
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      headerToolbar: {
        left: 'prev,today,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      initialEvents: [],
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      eventDrop : this.handleEventDrop.bind(this),
      eventResize:this.handleEventResize.bind(this),
      eventMouseEnter:this.handleEventMouseEnter.bind(this) ,
      eventMouseLeave :this.handleEventMouseLeave.bind(this),
      
    };
  
    currentEvents: EventApi[] = [];
  
  
  
    getCalenders(){
  this.googleCalenderService.getCalenders().subscribe({
  next : (res:any)=>{
   this.afterFilter =this.calenders = res.filter(calender => calender.id !== 'addressbook#contacts@group.v.calendar.google.com' && calender.id !== 'wind.test2023@gmail.com');
  },

  error:(err:any)=>{
console.log("error"+err)
  }
  
  
  })
   }
  
   getColors(){
    this.googleCalenderService.getColors().subscribe({
      next:(res:any)=>{
     this.colors =res ;   
      }
  
    })
   }
 
   
   geteventsByCalenderId(){
    this.googleCalenderService.geteventsByCalender(this.calenderId).subscribe({
      next: (res: any) => {
        this.calenderEvents = res
        console.log(res)
        this.calendarOptions.initialEvents = this.calenderEvents.map((event: any) => {
          const date1 = new Date(event.start.dateTime?.value + (60 * 60 * 1000));
          const startEvent = date1.toISOString().slice(0, 19).replace('T', ' '); 
          const date2 = new Date(event.end.dateTime?.value + (60 * 60 * 1000));
          const endEvent = date2.toISOString().slice(0, 19).replace('T', ' ');
          console.log("start"+startEvent);
          console.log("end"+endEvent);
          return {   
            id: event.id,
            title: event.summary,
            start:startEvent,
            end: endEvent,
          }
         
        });
      
        this.calendarOptions.events = this.calendarOptions.initialEvents;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
   
  }
     
  
    handleCalendarToggle() {
      this.calendarVisible = !this.calendarVisible;
    }
  
    handleWeekendsToggle() {
      const { calendarOptions } = this;
      calendarOptions.weekends = !calendarOptions.weekends;
    }
  
   
  
    handleDateSelect(selectInfo: DateSelectArg) {
      const dialogRef = this.matDialog.open(AddEventComponent, {
        width: '1000px',
        height: 'auto',
        data: { summary: '' ,description: '' ,attendees: [] ,visibility: '' ,guestsCanSeeOtherGuests: '' 
        ,isAddVideoConference: '' ,colorId: '' ,calenderId: '' ,attendeesOmitted: '' ,guestsCanModify: '' }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        const summary = result.summary;
        const description = result.description;
        const attendees = result.attendees;
        const visibility = result.visibility;
       const guestsCanInviteOthers = result.guestsCanInviteOthers;
        const guestsCanSeeOtherGuests = result.guestsCanSeeOtherGuests;
        const isAddVideoConference = result.isAddVideoConference;
        const colorId = result.colorId;
        const attendeesOmitted = result.attendeesOmitted;
        const guestsCanModify = result.guestsCanModify;
        const calenderId = result.calenderId ;
        console.log(result+"ttttttttt")
        const start = selectInfo.start;
        const formattedDate = start.toISOString().slice(0, 19).replace('T', ' ');
        const end = selectInfo.end;
        const formattedDate1 = end.toISOString().slice(0, 19).replace('T', ' ');
      
        console.log("result" +result)
    
        if (summary ) {
          const newEvent: Event = {
            id: null,
            summary: summary,
             description:description,
             startDateTime:formattedDate,
             endDateTime:formattedDate1,
             attendees:attendees,
             guestsCanInviteOthers:guestsCanInviteOthers,
             isAddVideoConference:isAddVideoConference ,
             colorId:colorId ,
             guestsCanModify:guestsCanModify,
             attendeesOmitted :attendeesOmitted ,
             guestsCanSeeOtherGuests:guestsCanSeeOtherGuests,
             visibility:visibility,
      
          };
    
          this.googleCalenderService.createEvent(newEvent ,this.calenderId).subscribe(
            (res) => {
              const calendarApi = selectInfo.view.calendar;
              calendarApi.addEvent({
                id: res.id,
                title: res.summary,
                start: res.start,
                end: res.end,
              });
  
              this.geteventsByCalenderId();
              this.snackBar.open('create event successfully', '', {
                duration: 5000,
                
                panelClass: 'snackbarstyle-green'
                });
              console.log("start"+formattedDate)
              console.log("end"+formattedDate)
            },
            (err) => {
              this.snackBar.open('create event failed', '', {
                duration: 5000,
                
                panelClass: 'snackbarstyle-rouge'
                });
            }
          );
        }
      });
    }
  
    
  
   
  
    handleEventClick(clickInfo: EventClickArg) {
      const dialogRef = this.matDialog.open(EventDetailsComponent, {
        width: '600px',
        height:'600px',
        data: { id: clickInfo.event.id }
      });
   const eventId = clickInfo.event.id;
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'delete') {
          this.googleCalenderService.deleteEvent(eventId).subscribe(
                  () => {
                    // If the delete request is successful, remove the event from the calendar
                    clickInfo.event.remove();
                    this.snackBar.open('delete Event successfully', '', {
                      duration: 5000,
                      
                      panelClass: 'snackbarstyle-green'
                      });
                  },
                  error => {
                    // If there's an error, show an error message
                    console.error(error);
                    this.snackBar.open('delete Event failed', '', {
                      duration: 5000,
                      
                      panelClass: 'snackbarstyle-rouge'
                      });
                  }
                );
        } else if (result === 'update') {
          
        }

        this.geteventsByCalenderId();
       
         
      });
    }
    
  
  
    handleEventDrop(eventDropInfo: EventDropArg) {
      const event = eventDropInfo.event;
      this.googleCalenderService.geteventBaseById(event.id).subscribe({
        next: (res: any) => {
          const formattedDate1 = eventDropInfo.event.start.toISOString().slice(0, 19).replace('T', ' ');
          const formattedDate2 = eventDropInfo.event.end.toISOString().slice(0, 19).replace('T', ' ');
          const updatedEvent= res
          updatedEvent.startDateTime =  formattedDate1
          updatedEvent.endDateTime =  formattedDate2 
          this.googleCalenderService.updateEvent(event.id, updatedEvent).subscribe(
            (res) => {
              console.log("res" + res);
            },
            (err) => {
              console.log('Error updating Event: ', err);
            }
          );
        }
      })
    }
    
    
    handleEventResize(eventResizeInfo: EventResizeDoneArg) {
      const event = eventResizeInfo.event;
      const formattedDate = eventResizeInfo.event.start.toISOString().slice(0, 19).replace('T', ' ');
      const formattedDate1 = eventResizeInfo.event.end.toISOString().slice(0, 19).replace('T', ' ');
      
      this.googleCalenderService.geteventBaseById(event.id).subscribe({
        next: (res: any) => {
          const formattedDate1 = eventResizeInfo.event.start.toISOString().slice(0, 19).replace('T', ' ');
          const formattedDate2 = eventResizeInfo.event.end.toISOString().slice(0, 19).replace('T', ' ');
          const updatedEvent= res
          updatedEvent.startDateTime =  formattedDate1
          updatedEvent.endDateTime =  formattedDate2 
          this.googleCalenderService.updateEvent(event.id, updatedEvent).subscribe(
            (res) => {
              console.log("res" + res);
            },
            (err) => {
              console.log('Error updating Event: ', err);
            }
          );
        }
      })
    }
  
    
  
  
  
  
  handleEventMouseLeave(){
    
    this.event =null;
    this.changeDetector.detectChanges();
  }
  
  handleEventMouseEnter(mouseEnterInfo: any) {
    const eventElement: HTMLElement = mouseEnterInfo.el;
    const eventId: number = mouseEnterInfo.event.id;
    console.log("lllllll"+eventId)
    
    this.googleCalenderService.geteventById(eventId).subscribe(
      (res: any) => {
        this.event =res ;
        console.log(res+"resres");
        this.selectedEvent =this.event ;
        this.start= new Date(res.start.dateTime?.value + (60 * 60 * 1000));
  this.end = new Date(res.end.dateTime?.value + (60 * 60 * 1000));
        const eventDetails = `Name: ${this.event.summary}<br>Start: ${this.start}<br>End: ${this.end}`;
      
        // Add tooltip to the event element
        eventElement.setAttribute('matTooltip', eventDetails);
        
        eventElement.setAttribute('matTooltipPosition', 'left');
        eventElement.classList.add('fc-toolbar-chunk');
        this.changeDetector.detectChanges();
      },
      (err: any) => {
        console.error('Error fetching meet details: ', err);
      }
    );
  }
  
  filterArray() {
    this.afterFilter = this.calenders.filter(
     ( res:any) =>
         res.summary
         
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchByName.trim().toLowerCase())
          
  

    );
  
  }





}
