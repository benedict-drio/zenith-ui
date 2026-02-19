import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format, isAfter, isSameDay, parseISO } from "date-fns";
import { CalendarIcon, X, Bitcoin, Hash, TrendingUp, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceStatusBadge } from "@/components/dashboard/InvoiceStatusBadge";
import { invoices, paymentVolume, formatSats, formatBtc } from "@/data/mockDashboard";
import { cn } from "@/lib/utils";

const ROWS_PER_PAGE = 8;

const chartConfig: ChartConfig = {
  volume: {
    label: "Volume (sats)",
    color: "hsl(var(--primary))",
  },
};

export default function Payments() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "refunded">("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>();
  const [page, setPage] = useState(0);

  const paymentInvoices = useMemo(
    () => invoices.filter((inv) => inv.status === "paid" || inv.status === "refunded"),
    []
  );

  const filtered = useMemo(() => {
    let list = paymentInvoices;
    if (statusFilter !== "all") list = list.filter((inv) => inv.status === statusFilter);
    if (dateFilter) {
      list = list.filter((inv) => {
        const d = parseISO(inv.createdAt);
        return isSameDay(d, dateFilter) || isAfter(d, dateFilter);
      });
    }
    return list;
  }, [paymentInvoices, statusFilter, dateFilter]);

  const stats = useMemo(() => {
    const totalReceived = paymentInvoices.reduce((s, inv) => s + inv.amountPaidSats, 0);
    const count = paymentInvoices.length;
    const avg = count > 0 ? Math.round(totalReceived / count) : 0;
    return { totalReceived, count, avg };
  }, [paymentInvoices]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paginated = filtered.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);

  const clearFilters = () => {
    setStatusFilter("all");
    setDateFilter(undefined);
    setPage(0);
  };

  const exportCsv = () => {
    const headers = ["ID", "Customer", "Memo", "Amount (sats)", "Status", "Date", "Tx Hash"];
    const rows = filtered.map((inv) => [
      inv.id,
      inv.customer,
      inv.memo ?? "",
      inv.amountPaidSats,
      inv.status,
      format(parseISO(inv.createdAt), "yyyy-MM-dd"),
      inv.txHash ?? "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payments-export-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasFilters = statusFilter !== "all" || dateFilter !== undefined;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-foreground">Payments</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {stats.count} transactions processed
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { label: "Total Received", value: formatBtc(stats.totalReceived), icon: Bitcoin },
          { label: "Transactions", value: stats.count.toString(), icon: Hash },
          { label: "Avg. Size", value: `${formatSats(stats.avg)} sats`, icon: TrendingUp },
        ].map((card) => (
          <Card key={card.label} className="glass-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <card.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{card.label}</p>
                <p className="text-lg font-display font-bold text-foreground">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Volume Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5"
      >
        <h3 className="text-lg font-display font-semibold text-foreground mb-4">Payment Volume — Last 7 Days</h3>
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <BarChart data={paymentVolume} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </motion.div>

      {/* Filters + Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5 space-y-4"
      >
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v as any); setPage(0); }}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-[180px] justify-start text-left font-normal", !dateFilter && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={(d) => { setDateFilter(d); setPage(0); }}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
              <X className="w-4 h-4 mr-1" /> Clear
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={exportCsv} disabled={filtered.length === 0} className="ml-auto">
            <Download className="w-4 h-4 mr-1" /> Export CSV
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="hidden md:table-cell">Tx Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No transactions match the current filters.
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((inv) => (
                  <TableRow
                    key={inv.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => navigate(`/dashboard/invoices/${inv.id}`)}
                  >
                    <TableCell className="font-mono text-sm">{inv.id}</TableCell>
                    <TableCell>{inv.customer}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatSats(inv.amountPaidSats)}</TableCell>
                    <TableCell><InvoiceStatusBadge status={inv.status} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(parseISO(inv.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="hidden md:table-cell font-mono text-xs text-muted-foreground">
                      {inv.txHash ?? "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-muted-foreground">
              Page {page + 1} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
