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
  log = [];

  testDuration: number;

  constructor(protected ref: NbDialogRef<ChartDialogComponent>, private theme: NbThemeService) {}

  ngAfterViewInit() {
    let series = [];
    let dataset = [];

    this.log.forEach((element: any, index) => {
      series.push({
        name: element.evaluation,
        type: 'line',
        step: 'start',
        datasetIndex: index,
        encode: {
          x: 'timeLog',
          y: 'behavior',
        },
      });
      dataset.push({
        source: element.log,
      });
    });

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
          max: Math.max(
            ...this.log.map(function (log: any) {
              return log.testDuration;
            })
          ),
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
        series: series,
        dataset: dataset,
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
    this.echarts.resize();
  }
}
