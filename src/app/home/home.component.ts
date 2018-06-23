import { Component } from "@angular/core";
import { TagApiService } from "../services/tag-api.service";

@Component({
  selector: "home",
  templateUrl: "./home.template.html",
  styleUrls: ["./home.style.scss"]
})
export class HomeComponent {
  constructor(private _tagApiService: TagApiService) {}

  pingIOT() {
    this._tagApiService.pingIOT().subscribe(res => {}, err => {});
  }
}
