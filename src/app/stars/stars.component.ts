import { Component, OnInit, Input } from "@angular/core";
import { MyHelper } from "../services/my-helper.service";

@Component({
  selector: "stars",
  templateUrl: "./stars.template.html",
  styleUrls: ["./stars.style.scss"]
})
export class StarsComponent implements OnInit {
  @Input() player;

  constructor(public _helper: MyHelper) {}

  ngOnInit() {}
}
