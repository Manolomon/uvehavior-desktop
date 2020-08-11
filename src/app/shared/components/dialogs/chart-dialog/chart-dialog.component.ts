import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.scss'],
})
export class ChartDialogComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  testDuration: number;
  log: [];

  constructor(protected ref: NbDialogRef<ChartDialogComponent>, private theme: NbThemeService) {}

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const echarts: any = {
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
        backgroundColor: echarts.bg,
        color: [colors.primary, colors.danger],
        title: {
          text: 'Transitional Behavior Chart',
          textStyle: {
            color: echarts.textColor,
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
          data: ['Evaluation'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: {
          type: 'value',
          name: 'Time',
          nameLocation: 'start',
          max: this.testDuration,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: echarts.axisLineColor,
            },
          },
          axisLabel: {
            textStyle: {
              color: echarts.textColor,
            },
          },
        },
        yAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
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
            name: 'Evaluation',
            type: 'line',
            step: 'start',
            encode: {
              x: 'timeLog',
              y: 'behavior',
            },
          },
        ],
        dataset: {
          source: this.log,
        },
      };
    });
    console.log(this.options);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  ngOnInit() {}

  cancel() {
    this.ref.close();
  }

  submitGroup() {}
}
