import essos from '../public/echarts-themes/essos.json';
import dark from '../public/echarts-themes/dark.json';
import * as echarts from 'echarts';

echarts.registerTheme('essos', essos);
echarts.registerTheme('dark', dark);

export const chartTheme = {
  essos,
  dark,
};
