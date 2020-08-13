import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ResizedEvent } from 'angular-resize-event';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.scss'],
})
export class ChartDialogComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  echarts: any;
  log: [];

  testDuration: number;
  log3 = [
    { behavior: 'Crossing', timeLog: 7.553719 },
    { behavior: 'Crossing', timeLog: 19.558308999999998 },
    { behavior: 'Crossing', timeLog: 26.053289 },
    { behavior: 'Crossing', timeLog: 31.052343 },
    { behavior: 'Crossing', timeLog: 34.555317 },
    { behavior: 'Crossing', timeLog: 39.052301 },
    { behavior: 'Crossing', timeLog: 44.553246 },
    { behavior: 'Crossing', timeLog: 53.79879 },
    { behavior: 'Crossing', timeLog: 62.552328 },
    { behavior: 'Crossing', timeLog: 75.301415 },
  ];

  log2 = [
    { behavior: 'Grooming', timeLog: 3.1608280000000004 },
    { behavior: 'Rearing', timeLog: 5.169927 },
    { behavior: 'Grooming', timeLog: 9.417213 },
    { behavior: 'Rearing', timeLog: 13.913773000000003 },
    { behavior: 'Grooming', timeLog: 19.164028000000002 },
    { behavior: 'Rearing', timeLog: 25.197604000000002 },
    { behavior: 'Grooming', timeLog: 25.448387 },
    { behavior: 'Rearing', timeLog: 29.454347000000002 },
    { behavior: 'Grooming', timeLog: 30.195471 },
    { behavior: 'Rearing', timeLog: 42.704515 },
    { behavior: 'Grooming', timeLog: 44.450976 },
    { behavior: 'Rearing', timeLog: 55.703181 },
    { behavior: 'Grooming', timeLog: 57.450291 },
    { behavior: 'Rearing', timeLog: 67.44981899999999 },
    { behavior: 'Grooming', timeLog: 69.948509 },
    { behavior: 'Rearing', timeLog: 71.20359599999999 },
    { behavior: 'Grooming', timeLog: 74.946291 },
    { behavior: 'Rearing', timeLog: 80.483496 },
    { behavior: 'Rearing', timeLog: 80.986377 },
    { behavior: 'Grooming', timeLog: 81.237078 },
    { behavior: 'Rearing', timeLog: 81.738671 },
    { behavior: 'Rearing', timeLog: 82.482143 },
    { behavior: 'Grooming', timeLog: 82.982163 },
    { behavior: 'Rearing', timeLog: 83.73658499999999 },
    { behavior: 'Grooming', timeLog: 84.240307 },
  ];

  constructor(protected ref: NbDialogRef<ChartDialogComponent>, private theme: NbThemeService) {}

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      this.echarts = {
        bg: colors.bg,
        textColor: colors.fgText,
        axisLineColor: colors.fgText,
        splitLineColor: colors.separator,
        itemHoverShadowColor: 'rgba(0, 0, 0, 0.5)',
        tooltipBackgroundColor: colors.primary,
        areaOpacity: '0.7',
      };

      this.options = {
        width: 'auto',
        backgroundColor: this.echarts.bg,
        color: [colors.primary, colors.warning, colors.success, colors.danger, colors.info],
        title: {
          text: 'Transitional Behavior Chart',
          textStyle: {
            color: this.echarts.textColor,
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: true,
              title: 'Save',
              pixelRatio: 2,
              iconStyle: {
                borderColor: colors.primary,
              },
            },
          },
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          textStyle: {
            color: this.echarts.textColor,
          },
        },
        xAxis: {
          type: 'value',
          name: 'Time',
          nameLocation: 'start',
          max: 90,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: this.echarts.axisLineColor,
            },
          },
          axisLabel: {
            textStyle: {
              color: this.echarts.textColor,
            },
          },
        },
        yAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: this.echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: this.echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: this.echarts.textColor,
              },
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        series: [
          {
            name: 'Evaluation1',
            type: 'line',
            step: 'start',
            datasetIndex: 0,
            encode: {
              x: 'timeLog',
              y: 'behavior',
            },
          },
          {
            name: 'Evaluation2',
            type: 'line',
            step: 'start',
            datasetIndex: 1,
            encode: {
              x: 'timeLog',
              y: 'behavior',
            },
          },
        ],
        dataset: [
          {
            source: this.log3,
          },
          {
            source: this.log2,
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  ngOnInit() {}

  cancel() {
    this.ref.close();
  }

  onResized(event: ResizedEvent) {
    this.echarts.resize;
  }

  submitGroup() {}
}
