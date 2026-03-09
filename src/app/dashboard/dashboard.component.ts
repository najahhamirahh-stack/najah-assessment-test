import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private donutChart: am4charts.PieChart;
  private barChart: am4charts.XYChart;

  users = [
    { firstName: 'Mark', lastName: 'Otto', userName: 'mdo' },
    { firstName: 'Jacob', lastName: 'Throton', userName: 'fat' },
    { firstName: 'Larry', lastName: 'theBird', userName: 'twitter' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.createDonutChart();
    this.createBarChart();
  }

  createDonutChart() {
    let chart = am4core.create("donutChartDiv", am4charts.PieChart);
    chart.innerRadius = am4core.percent(60);

    chart.colors.list = [
      am4core.color("#888888"),
      am4core.color("#aaaaaa"),
      am4core.color("#cccccc"),
      am4core.color("#666666")
    ];

    chart.data = [
      { category: "A", value: 40 },
      { category: "B", value: 30 },
      { category: "C", value: 20 },
      { category: "D", value: 10 }
    ];

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "category";

    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;

    this.donutChart = chart;
  }

  createBarChart() {
    let chart = am4core.create("barChartDiv", am4charts.XYChart);

    chart.data = [
      { category: "1", value: 50 },
      { category: "2", value: 90 },
      { category: "3", value: 70 },
      { category: "4", value: 40 },
      { category: "5", value: 65 },
      { category: "6", value: 20 },
      { category: "7", value: 85 }
    ];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.disabled = true; 
    categoryAxis.renderer.labels.template.disabled = true; 

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0.1;
    valueAxis.renderer.labels.template.disabled = true; 

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "category";

    series.columns.template.fill = am4core.color("#999999");
    series.columns.template.strokeOpacity = 0;
    series.columns.template.width = am4core.percent(60);

    this.barChart = chart;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.donutChart) {
      this.donutChart.dispose();
    }
    if (this.barChart) {
      this.barChart.dispose();
    }
  }
}