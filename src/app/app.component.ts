import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';

import { News,Datum } from './app-request-get';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['Status','NewsId','NameNews','UpdatedDate','Manage'];
  dataSource : MatTableDataSource<Datum> = new MatTableDataSource<Datum>;

  paginator!: MatPaginator;
  showButton: boolean[] = [];
  constructor (private http:HttpClient){
  }
  ngOnInit(): void {
      this.http.get<News>('http://dev-sw6-uapi.ecm.in.th/uapi/drt-ElectronicsDocument/ED-GetNews?EmployeeId=3')
      .subscribe(response=>{
        console.log('response',response);
        this.dataSource = new MatTableDataSource<Datum>(response.data)
        this.dataSource.paginator = this.paginator;
        this.showButton = response.data.map(item => item.Status === 1);

        response.data.forEach(item => {
          this.sendStatus(item.NewsId, item.Status); 
        });
      });
  }
  selectedNews: Datum | null = null;

  onManage(element: Datum) {
    this.selectedNews = element;
    console.log("Manage clicked for element:", element);
  }
  closePopup() {
    this.selectedNews = null;
  }
  onPageChange(event: PageEvent): void {
  }

  toggleButton(element: Datum):void {
    element.Status = element.Status === 1 ? 0 : 1;
    this.showButton[element.NewsId] = element.Status === 1;
    console.log('show',this.showButton)

    this.sendStatus(element.NewsId, element.Status);
  }

  sendStatus(newsId: number, status: number): void {
    const employeeId = 3; 

    const payload = {
      Employee: employeeId,
      NewsId: newsId,
      Status: status
    };

    this.http.post('http://dev-sw6-uapi.ecm.in.th/uapi/drt-ElectronicsDocument/ED-UpdateStatusNews', payload)
      .subscribe(response => {
        console.log('Post response:', response);
        
      });
  }

  
}
