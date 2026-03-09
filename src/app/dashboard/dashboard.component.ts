import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
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
  users = []; 
  private dashboardData: any;

  private donutChart: am4charts.PieChart;
  private barChart: am4charts.XYChart;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getDashboardData();
  }

  ngAfterViewInit() {
    this.createDonutChart();
    this.createBarChart();
  }

  getDashboardData() {
    this.http.get('http://test-demo.aemenersol.com/api/dashboard')
      .subscribe((res: any) => {
        this.dashboardData = res;
        this.users = this.dashboardData.tableUsers;
        
        setTimeout(() => {
          if (this.donutChart && this.dashboardData.chartDonut) {
            this.donutChart.data = this.dashboardData.chartDonut;
          }
          if (this.barChart && this.dashboardData.chartBar) {
            this.barChart.data = this.dashboardData.chartBar;
          }
        }, 500);
      }, err => {
        console.error("Failed to fetch Dashboard Data", err);
      });
  }

  createDonutChart() {
    let chart = am4core.create("donutChartDiv", am4charts.PieChart);

    if (chart.logo) { 
      chart.logo.disabled = true; 
    }

    chart.innerRadius = am4core.percent(60);

    chart.colors.list = [
      am4core.color("#888888"),
      am4core.color("#aaaaaa"),
      am4core.color("#cccccc"),
      am4core.color("#666666")
    ];

    chart.data = [];

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.category = "name";
    series.dataFields.value = "value";

    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;

    this.donutChart = chart;
  }

  createBarChart() {
    let chart = am4core.create("barChartDiv", am4charts.XYChart);

    if (chart.logo) { 
      chart.logo.disabled = true; 
    }

    chart.data = [];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.disabled = true; 
    categoryAxis.renderer.minGridDistance = 1;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0.1;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "name";
    series.dataFields.valueY = "value";

    let valueLabel = series.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.text = "{valueY}"; 
    valueLabel.label.fontSize = 12;
    valueLabel.label.dy = -10; 
    valueLabel.label.fill = am4core.color("#555"); 

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