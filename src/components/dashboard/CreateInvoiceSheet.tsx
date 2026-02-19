import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateInvoiceSheet({ open, onOpenChange }: Props) {
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [reference, setReference] = useState("");
  const [allowPartial, setAllowPartial] = useState(false);
  const [allowOverpayment, setAllowOverpayment] = useState(false);
  const [expiry, setExpiry] = useState("60");
  const [loading, setLoading] = useState(false);

  const satsNum = parseInt(amount) || 0;
  const btcVal = (satsNum / 100_000_000).toFixed(8);
  const usdVal = ((satsNum / 100_000_000) * 97500).toFixed(2);

  const handleCreate = () => {
    if (!satsNum) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Invoice created successfully!", {
        description: `INV-${String(Date.now()).slice(-6)} — ${satsNum.toLocaleString()} sats`,
      });
      setAmount("");
      setMemo("");
      setReference("");
      onOpenChange(false);
    }, 1200);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-card border-border overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display">Create Invoice</SheetTitle>
          <SheetDescription>Generate a new payment invoice for your customer.</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Amount */}
          <div className="space-y-2">
            <Label>Amount (sats)</Label>
            <Input
              type="number"
              placeholder="250000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl font-display h-14 bg-secondary border-border"
            />
            {satsNum > 0 && (
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span>₿ {btcVal}</span>
                <span>≈ ${usdVal} USD</span>
              </div>
            )}
          </div>

          {/* Memo */}
          <div className="space-y-2">
            <Label>Memo</Label>
            <Input
              placeholder="Payment for..."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          {/* Reference */}
          <div className="space-y-2">
            <Label>Reference ID</Label>
            <Input
              placeholder="ORD-12345"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Allow partial payments</Label>
              <Switch checked={allowPartial} onCheckedChange={setAllowPartial} />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Allow overpayment</Label>
              <Switch checked={allowOverpayment} onCheckedChange={setAllowOverpayment} />
            </div>
          </div>

          {/* Expiry */}
          <div className="space-y-2">
            <Label>Expiry Duration</Label>
            <Select value={expiry} onValueChange={setExpiry}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="1440">24 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="ghost" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="flex-1 gradient-bitcoin text-primary-foreground"
              onClick={handleCreate}
              disabled={!satsNum || loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Invoice"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
