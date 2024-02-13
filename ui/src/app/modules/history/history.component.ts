import { Component } from '@angular/core';
import { UsersService } from "../../services/users.service";
import { MaterialModule } from "../shared/material/material.module";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

  public readonly displayedColumns = ['date', 'action', 'firstName'];

  public readonly userEvents$ = this.usersService.getUserEvents();

  constructor(private readonly usersService: UsersService) {
  }

}
