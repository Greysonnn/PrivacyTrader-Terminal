"use client"

import { useState } from "react"
import { Lock, Unlock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PrivacyTraderTerminal() {
  const [isLocked, setIsLocked] = useState(false)
  const [selectedExchange, setSelectedExchange] = useState("CME")
  const [selectedAsset, setSelectedAsset] = useState("ES")
  const [orderType, setOrderType] = useState("limit")
  const [quantity, setQuantity] = useState("1")
  const [price, setPrice] = useState("5200.00")

  // Sample data for demonstration
  const assets = {
    futures: ["ES", "MES", "NQ", "MNQ", "SPX"],
    crypto: ["BTC", "ETH", "SOL", "SUI"],
    stocks: ["TSLA", "NVDA", "AAPL", "MSFT", "AMZN", "GOOGL"],
  }

  const orderBookData = {
    asks: [
      { price: "5205.00", size: 12 },
      { price: "5204.75", size: 8 },
      { price: "5204.50", size: 15 },
      { price: "5204.25", size: 6 },
      { price: "5204.00", size: 22 },
      { price: "5203.75", size: 18 },
      { price: "5203.50", size: 9 },
      { price: "5203.25", size: 14 },
      { price: "5203.00", size: 7 },
      { price: "5202.75", size: 11 },
    ],
    bids: [
      { price: "5202.50", size: 10 },
      { price: "5202.25", size: 16 },
      { price: "5202.00", size: 8 },
      { price: "5201.75", size: 12 },
      { price: "5201.50", size: 19 },
      { price: "5201.25", size: 7 },
      { price: "5201.00", size: 14 },
      { price: "5200.75", size: 9 },
      { price: "5200.50", size: 21 },
      { price: "5200.25", size: 13 },
    ],
  }

  // Find the maximum size for scaling the depth visualization
  const maxSize = Math.max(...orderBookData.asks.map((a) => a.size), ...orderBookData.bids.map((b) => b.size))

  const positions = [
    { asset: "ES", qty: 1, entryPrice: "5198.50", pnl: "+$200.00" },
    { asset: "MSFT", qty: 100, entryPrice: "402.75", pnl: "-$125.00" },
  ]

  const toggleLock = () => {
    setIsLocked(!isLocked)
  }

  if (isLocked) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Card className="w-96 p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">PrivacyTrader Terminal</h2>
          <Input type="password" placeholder="Enter password to unlock" className="mb-4" />
          <Button className="w-full" onClick={toggleLock}>
            <Unlock className="mr-2 h-4 w-4" /> Unlock Terminal
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      {/* Top Bar */}
      <header className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <h1 className="text-xl font-bold">PrivacyTrader Terminal</h1>
        <div className="flex items-center space-x-4">
          <Select value={selectedExchange} onValueChange={setSelectedExchange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Exchange" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CME">CME</SelectItem>
              <SelectItem value="NASDAQ">NASDAQ</SelectItem>
              <SelectItem value="NYSE">NYSE</SelectItem>
              <SelectItem value="BINANCE">BINANCE</SelectItem>
              <SelectItem value="COINBASE">COINBASE</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={toggleLock}>
            <Lock className="h-4 w-4 mr-2" /> Lock App
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Orderbook */}
        <div className="w-3/5 p-4 border-r border-gray-700 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold mr-3">Orderbook</h2>
              <Select value={selectedAsset} onValueChange={setSelectedAsset} className="w-28">
                <SelectTrigger>
                  <SelectValue placeholder="Asset" />
                </SelectTrigger>
                <SelectContent>
                  <Tabs defaultValue="futures">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="futures">Futures</TabsTrigger>
                      <TabsTrigger value="crypto">Crypto</TabsTrigger>
                      <TabsTrigger value="stocks">Stocks</TabsTrigger>
                    </TabsList>
                    <TabsContent value="futures">
                      {assets.futures.map((asset) => (
                        <SelectItem key={asset} value={asset}>
                          {asset}
                        </SelectItem>
                      ))}
                    </TabsContent>
                    <TabsContent value="crypto">
                      {assets.crypto.map((asset) => (
                        <SelectItem key={asset} value={asset}>
                          {asset}
                        </SelectItem>
                      ))}
                    </TabsContent>
                    <TabsContent value="stocks">
                      {assets.stocks.map((asset) => (
                        <SelectItem key={asset} value={asset}>
                          {asset}
                        </SelectItem>
                      ))}
                    </TabsContent>
                  </Tabs>
                </SelectContent>
              </Select>
            </div>
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/5">Type</TableHead>
                  <TableHead className="w-1/5 text-right">Price</TableHead>
                  <TableHead className="w-1/5 text-right">Size</TableHead>
                  <TableHead className="w-2/5">Depth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderBookData.asks.map((ask, index) => (
                  <TableRow key={`ask-${index}`}>
                    <TableCell className="text-red-400">Ask</TableCell>
                    <TableCell className="text-right font-mono text-red-400">{ask.price}</TableCell>
                    <TableCell className="text-right font-mono">{ask.size}</TableCell>
                    <TableCell>
                      <div className="flex justify-end items-center h-5">
                        <div
                          className="bg-red-500/30"
                          style={{
                            width: `${(ask.size / maxSize) * 100}%`,
                            height: "16px",
                          }}
                        ></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-gray-800">
                  <TableCell colSpan={4} className="text-center py-1">
                    Spread: 0.25
                  </TableCell>
                </TableRow>
                {orderBookData.bids.map((bid, index) => (
                  <TableRow key={`bid-${index}`}>
                    <TableCell className="text-green-400">Bid</TableCell>
                    <TableCell className="text-right font-mono text-green-400">{bid.price}</TableCell>
                    <TableCell className="text-right font-mono">{bid.size}</TableCell>
                    <TableCell>
                      <div className="flex justify-end items-center h-5">
                        <div
                          className="bg-green-500/30"
                          style={{
                            width: `${(bid.size / maxSize) * 100}%`,
                            height: "16px",
                          }}
                        ></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Panel - Order Entry & Positions */}
        <div className="w-2/5 p-4 flex flex-col">
          {/* Order Entry */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Order Entry - {selectedAsset}</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Button className="bg-green-600 hover:bg-green-700">Buy</Button>
              <Button className="bg-red-600 hover:bg-red-700">Sell</Button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm mb-1">Quantity</label>
                <Input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Order Type</label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Order Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="limit">Limit</SelectItem>
                    <SelectItem value="stop">Stop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {orderType !== "market" && (
              <div className="mb-3">
                <label className="block text-sm mb-1">Price</label>
                <Input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="font-mono" />
              </div>
            )}
          </div>

          {/* Positions */}
          <div className="flex-1 overflow-auto">
            <h2 className="text-lg font-semibold mb-3">Positions</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Entry</TableHead>
                  <TableHead>P&L</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {positions.map((position, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono">{position.asset}</TableCell>
                    <TableCell className="font-mono">{position.qty}</TableCell>
                    <TableCell className="font-mono">{position.entryPrice}</TableCell>
                    <TableCell
                      className={`font-mono ${position.pnl.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                    >
                      {position.pnl}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Close
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Status */}
      <footer className="p-2 bg-gray-800 border-t border-gray-700 text-sm">
        <div className="flex justify-between">
          <span>Status: Connected to IBKR</span>
          <span>
            Last trade: Buy 1 {selectedAsset} @ {orderBookData.bids[0].price}
          </span>
        </div>
      </footer>
    </div>
  )
}

