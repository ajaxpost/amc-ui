import TrendChard from './trend-chart';

export default function Trend() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <TrendChard title="页面访问量趋势"></TrendChard>
      <TrendChard title="用户活跃量趋势"></TrendChard>
      <TrendChard title="新用户活跃量趋势"></TrendChard>
    </div>
  );
}
