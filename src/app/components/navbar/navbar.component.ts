import { LoginData } from './../../models/login.model';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../lgoin/login.component';
import { loggedInUser } from '../../store/user/user.selectors';
import { LogoutActions } from '../../store/user/user.actions';
import { CommonModule } from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { LoginDetails } from '../../models/login.model';

@Component({
  selector: 'app-navbar',
  imports: [LoginComponent, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  store = inject(Store);
  user: Observable<any> = this.store.select(loggedInUser);
  loggedInuserDetails: any;
  userSubscription: any;
  private router = inject(Router);
  defaultPhoto = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  data1 = [
    {
      category_name: "category1",
      category_weight: 0.25,
      feature: "feature1",
      feature_weight: 0.5
    },
    {
      category_name: "category1",
      category_weight: 0.25,
      feature: "feature2",
      feature_weight: 0.5
    },
    {
      category_name: "category2",
      category_weight: 0.25,
      feature: "feature1",
      feature_weight: 0.5
    },
    {
      category_name: "category2",
      category_weight: 0.25,
      feature: "feature2",
      feature_weight: 0.5
    },
    {
      category_name: "category3",
      category_weight: 0.25,
      feature: "feature1",
      feature_weight: 0.5
    },
    {
      category_name: "category3",
      category_weight: 0.25,
      feature: "feature2",
      feature_weight: 0.5
    },
    {
      category_name: "category4",
      category_weight: 0.25,
      feature: "feature1",
      feature_weight: 0.1
    },
    {
      category_name: "category4",
      category_weight: 0.25,
      feature: "feature2",
      feature_weight: 0.1
    },
    {
      category_name: "category4",
      category_weight: 0.25,
      feature: "feature3",
      feature_weight: 0.1
    },
    {
      category_name: "category4",
      category_weight: 0.25,
      feature: "feature4",
      feature_weight: 0.1
    },
    {
      category_name: "category4",
      category_weight: 0.25,
      feature: "feature5",
      feature_weight: 0.1
    },
    {
      category_name: "category4",
      category_weight: 0.25,
      feature: "feature6",
      feature_weight: 0.1
    },
    {
      category_name: "category4",
      category_weight: 0.25,
      feature: "feature7",
      feature_weight: 0.1
    },
    {
      category_name: "category4",
      category_weight: 0.25,
      feature: "feature8",
      feature_weight: 0.1
    },
    {
      category_name: "category4",
      category_weight: 0.25,
      feature: "feature9",
      feature_weight: 0.1
    },
    {
      category_name: "category4",
      category_weight: 0.25,
      feature: "feature10",
      feature_weight: 0.1
    }
  ];

  data_latest = this.data1.reduce((acc: any[], item: any) => {
    const existingCategory = acc.find(c => c.category_name === item.category_name);
    if (existingCategory) {
      existingCategory.feature.push({ feature: item.feature, feature_weight: item.feature_weight });
    } else {
      acc.push({
        category_name: item.category_name,
        category_weight: item.category_weight,
        feature: [{ feature: item.feature, feature_weight: item.feature_weight }]
      });
    }
    return acc;
  }, []);

  ngOnInit() {
    this.userSubscription = this.user.subscribe(store => {
      this.loggedInuserDetails = store || { message: "", data: {} };
    });

    console.log("data_latest:", this.data_latest);

    const chart = am4core.create('chartdiv', am4charts.PieChart);

    // Flatten data to match amCharts format
    const categoryData = this.data_latest.map(item => ({
      category: item.category_name,
      value: item.category_weight
    }));

    // Flatten feature data to match amCharts format
    const featureData = this.data_latest.flatMap(item =>
      item.feature.map((f: { feature: string; feature_weight: number; }, index: number) => ({
        category: f.feature,
        value: f.feature_weight,
        parentCategory: item.category_name,  // Add parent category to feature data
        index: index  // Add index to differentiate shades
      }))
    );

    chart.innerRadius = am4core.percent(40);

    // Create the category series (inner donut)
    const categorySeries = chart.series.push(new am4charts.PieSeries());
    categorySeries.dataFields.value = 'value';
    categorySeries.dataFields.category = 'category';
    categorySeries.slices.template.innerRadius = am4core.percent(60);

    categorySeries.labels.template.adapter.add("text", function(text, target) {
      const value = target.dataItem.values.value.value * 100;
      return target.dataItem ? `${target.dataItem.category}: ${value.toFixed(1)}%` : '';
    });
    categorySeries.ticks.template.disabled = true;

    // Assign colors to each category
    const categoryColors:any = {
      "category1": am4core.color("#FF5733"), // Red
      "category2": am4core.color("#33FF57"), // Green
      "category3": am4core.color("#3357FF"), // Blue
      "category4": am4core.color("#FF33A1")  // Pink
    };

    categorySeries.slices.template.adapter.add("fill", function(fill, target: any) {
      return categoryColors[target?.dataItem?.dataContext?.category] || fill;
    });

    // Create the feature series (outer donut)
    const featureSeries = chart.series.push(new am4charts.PieSeries());
    featureSeries.dataFields.value = 'value';
    featureSeries.dataFields.category = 'category';
    featureSeries.slices.template.innerRadius = am4core.percent(80);

    featureSeries.labels.template.adapter.add("text", function(text, target:any) {
      const value = target.dataItem.values.value.value * 100;
      return `${target?.dataItem?.dataContext?.category}: ${value.toFixed(1)}%`;
    });
    featureSeries.ticks.template.disabled = true;

    // Set data for the two series
    categorySeries.data = categoryData;
    featureSeries.data = featureData;
    featureSeries.slices.template.tooltipText = "{category}: {value * 100}%";
    
    // Add tooltips to display the same value on hover
    featureSeries.slices.template.adapter.add("tooltipText", function(text, target:any) {
      const value = target.dataItem.dataContext.value * 100;
      return `${target?.dataItem?.dataContext?.category}: ${value.toFixed(1)}%`;
    });

    // Function to generate lighter shades
    function generateShade(color: am4core.Color, index: number, total: number): am4core.Color {
      return color.lighten(1 - (index + 1) / (total + 1));
    }

    // Assign colors to feature series based on parent category colors
    featureSeries.slices.template.adapter.add("fill", function(fill, target:any) {
      const parentCategory = target?.dataItem?.dataContext?.parentCategory;
      const categoryColor = categoryColors[parentCategory];
      const index = target?.dataItem?.dataContext?.index;
      const total = featureData.filter(f => f.parentCategory === parentCategory).length;
      return categoryColor ? generateShade(categoryColor, index, total) : fill;
    });
  }

  connections() {
  }

  logout() {
    this.store.dispatch(LogoutActions.logoutUser());
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}