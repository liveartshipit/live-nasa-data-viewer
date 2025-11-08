import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDataStore } from '../stores/dataStore';

export function ChartCard() {
  const { chartData } = useDataStore();

  return (
    <Card className="border-border bg-card p-8">
      <div className="mb-8">
        <h3 className="font-sans text-xl font-medium text-card-foreground">
          Near-Earth Objects Trend
        </h3>
        <p className="mt-3 font-sans text-sm font-light text-muted-foreground">
          Daily count of asteroids approaching Earth
        </p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 25%)" />
            <XAxis
              dataKey="date"
              stroke="hsl(220, 13%, 88%)"
              style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
            />
            <YAxis
              stroke="hsl(220, 13%, 88%)"
              style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(220, 12%, 18%)',
                border: '1px solid hsl(220, 10%, 25%)',
                borderRadius: '12px',
                color: 'hsl(210, 20%, 98%)',
                fontFamily: 'JetBrains Mono',
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="hsl(218, 72%, 50%)"
              strokeWidth={2}
              dot={{ fill: 'hsl(218, 72%, 50%)', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
