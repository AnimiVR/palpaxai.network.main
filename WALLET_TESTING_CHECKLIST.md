# PayAI Wallet Testing Checklist

## 🧪 Test Plan - Comprehensive Wallet Features

### Pre-Testing Setup
- [ ] Install Phantom Wallet extension
- [ ] Install Solflare Wallet extension (optional)
- [ ] Ensure có SOL trong test wallet
- [ ] Development server running trên `http://localhost:3000`
- [ ] Browser console mở để xem logs

---

## Test Suite 1: Wallet Connection

### 1.1 Phantom Wallet Connection
- [ ] Navigate to `/dashboard/wallet`
- [ ] Click "Connect Wallet" button
- [ ] Phantom popup appears
- [ ] Select account và approve connection
- [ ] Wallet connects successfully
- [ ] Address displays correctly
- [ ] Balance starts loading

### 1.2 Solflare Wallet Connection (Optional)
- [ ] Disconnect current wallet
- [ ] Install Solflare extension
- [ ] Click "Connect Wallet"
- [ ] Solflare detected trong modal
- [ ] Connect successfully

### 1.3 Torus Wallet Connection (Optional)
- [ ] Disconnect current wallet
- [ ] Click "Connect Wallet"
- [ ] Torus wallet detected
- [ ] Connect successfully

### 1.4 No Wallet Extension
- [ ] Disable tất cả wallet extensions
- [ ] Click "Connect Wallet"
- [ ] Error message displays: "Please install a Solana wallet extension"
- [ ] No crash occurs

### 1.5 Disconnect Wallet
- [ ] While connected, click "Disconnect"
- [ ] Wallet disconnects
- [ ] Returns to "Connect Wallet" screen
- [ ] All wallet data cleared

---

## Test Suite 2: Balance Display

### 2.1 Balance Loading
- [ ] After connecting, spinner displays
- [ ] Balance loads within reasonable time (<5s)
- [ ] Balance displays correctly (format: X.XXXX SOL)
- [ ] USD equivalent displays correctly (format: $X,XXX.XX)
- [ ] No console errors

### 2.2 Refresh Balance
- [ ] Click refresh button (top right of balance card)
- [ ] Spinner displays during refresh
- [ ] Balance updates (nếu có thay đổi)
- [ ] USD updates accordingly

### 2.3 Balance Update After Send
- [ ] Note current balance
- [ ] Send 0.01 SOL (see Send tests)
- [ ] After transaction confirms, balance auto-refreshes
- [ ] New balance = old balance - 0.01 - fees
- [ ] USD updates accordingly

### 2.4 Balance Update After Receive
- [ ] Note current balance
- [ ] Receive SOL from another wallet
- [ ] After transaction confirms on blockchain
- [ ] Balance auto-refreshes (manual refresh if needed)
- [ ] New balance = old balance + received amount

### 2.5 Zero Balance
- [ ] Connect wallet with 0 SOL
- [ ] Balance shows: 0.0000 SOL
- [ ] USD shows: $0.00
- [ ] Send button disabled

### 2.6 Very Large Balance
- [ ] Connect wallet with large balance (>1000 SOL)
- [ ] Balance displays correctly
- [ ] USD displays correctly with commas
- [ ] UI doesn't break

---

## Test Suite 3: Send Transaction

### 3.1 Valid Send Transaction
- [ ] Click "Send" button
- [ ] Dialog opens
- [ ] Enter valid recipient address (different wallet)
- [ ] Enter amount (less than balance)
- [ ] Click "Send"
- [ ] Wallet popup appears asking approval
- [ ] Approve transaction
- [ ] Loading state: "Sending..." displays
- [ ] Success toast: "Sent X.XX SOL successfully"
- [ ] Dialog closes
- [ ] Balance refreshes
- [ ] Transaction appears in history

### 3.2 Invalid Recipient Address
- [ ] Open Send dialog
- [ ] Enter invalid address (not a valid Solana pubkey)
- [ ] Click "Send"
- [ ] Error toast: "Wallet client not available" or similar
- [ ] Dialog stays open
- [ ] No transaction sent

### 3.3 Amount > Balance
- [ ] Open Send dialog
- [ ] Enter amount larger than balance
- [ ] Click "Send"
- [ ] Error toast: "Insufficient balance"
- [ ] Dialog stays open
- [ ] No transaction sent

### 3.4 Amount = 0
- [ ] Open Send dialog
- [ ] Enter 0 or negative amount
- [ ] Click "Send"
- [ ] Error toast: "Please enter a valid amount"
- [ ] Dialog stays open

### 3.5 Empty Fields
- [ ] Open Send dialog
- [ ] Leave fields empty
- [ ] Click "Send"
- [ ] Error toast: "Please enter recipient address and amount"
- [ ] Dialog stays open

### 3.6 Cancel Send
- [ ] Open Send dialog
- [ ] Enter data
- [ ] Click "Cancel" or X
- [ ] Dialog closes
- [ ] No transaction sent
- [ ] Data cleared

### 3.7 Transaction Rejected by Wallet
- [ ] Open Send dialog
- [ ] Enter valid data
- [ ] Click "Send"
- [ ] Wallet popup appears
- [ ] **Reject** transaction in wallet
- [ ] Error toast displays
- [ ] Dialog closes
- [ ] No balance change

### 3.8 Send Max Amount
- [ ] Open Send dialog
- [ ] Enter amount = balance (exactly)
- [ ] Click "Send"
- [ ] Transaction fails hoặc succeed depending on fees
- [ ] Appropriate message displays

### 3.9 Send Very Small Amount
- [ ] Open Send dialog
- [ ] Enter amount: 0.0000001 SOL (minimum)
- [ ] Click "Send"
- [ ] Transaction succeeds
- [ ] Gas fees correctly deducted

### 3.10 Concurrent Send Attempts
- [ ] Open Send dialog
- [ ] Click "Send" multiple times quickly
- [ ] Only one transaction processes
- [ ] No duplicate transactions
- [ ] UI doesn't break

---

## Test Suite 4: Receive Transaction

### 4.1 Generate QR Code
- [ ] Click "Receive" button
- [ ] Dialog opens
- [ ] QR code generates within 1-2 seconds
- [ ] QR code displays correctly
- [ ] QR code scannable (test with phone camera)

### 4.2 QR Code Content
- [ ] Open Receive dialog
- [ ] Scan QR code with QR scanner app
- [ ] Scanned content = wallet address
- [ ] Matches displayed address

### 4.3 Copy Address
- [ ] Open Receive dialog
- [ ] Click copy icon
- [ ] Toast displays: "Copied! Wallet address copied to clipboard"
- [ ] Clipboard contains wallet address
- [ ] Can paste address elsewhere

### 4.4 Receive Address Display
- [ ] Open Receive dialog
- [ ] Address displays correctly
- [ ] Full address shown (not truncated)
- [ ] Font readable (monospace)
- [ ] Background color appropriate (dark mode compatible)

### 4.5 Receive External Transaction
- [ ] Note transaction count in history
- [ ] Send SOL TO this wallet from external wallet
- [ ] Wait for confirmation
- [ ] Refresh balance manually
- [ ] New transaction appears in history
- [ ] Marked as "Received"
- [ ] Amount correct

---

## Test Suite 5: Transaction History

### 5.1 Load Transactions
- [ ] Connect wallet with transaction history
- [ ] Transactions load within reasonable time
- [ ] Maximum 10 transactions loaded
- [ ] Loading spinner displays
- [ ] No errors in console

### 5.2 Empty History
- [ ] Connect new wallet (no transactions)
- [ ] Message displays: "No transactions yet"
- [ ] UI looks clean
- [ ] No errors

### 5.3 Transaction Details
- [ ] For each transaction, verify:
  - [ ] Type correct (Sent/Received)
  - [ ] Amount correct
  - [ ] Status = "confirmed"
  - [ ] Icon color correct (red for sent, green for received)
  - [ ] Time displayed

### 5.4 Sent Transaction Display
- [ ] Find "Sent" transaction
- [ ] Icon is red
- [ ] Shows "-X.XXXX SOL"
- [ ] Shows "To XXXX...XXXX"
- [ ] Clickable

### 5.5 Received Transaction Display
- [ ] Find "Received" transaction
- [ ] Icon is green
- [ ] Shows "+X.XXXX SOL"
- [ ] Shows "From XXXX...XXXX"
- [ ] Clickable

### 5.6 External Link to Solscan
- [ ] Click any transaction
- [ ] Solscan opens in new tab
- [ ] Transaction page loads
- [ ] Shows correct transaction details

### 5.7 Refresh Transactions
- [ ] Make external transaction to/from wallet
- [ ] Click refresh button in transaction history
- [ ] New transactions appear
- [ ] Loading spinner displays
- [ ] Old transactions still there

### 5.8 Transaction Ordering
- [ ] Verify transactions ordered by time (newest first)
- [ ] Timestamps accurate
- [ ] No duplicate transactions

---

## Test Suite 6: Wallet Address Display

### 6.1 Address Format
- [ ] Full address displays
- [ ] Monospace font used
- [ ] Address is clickable/selectable
- [ ] Can copy by selection

### 6.2 Address Actions
- [ ] Copy icon works
- [ ] External link icon works
- [ ] Copy toast displays
- [ ] Solscan opens correct page

### 6.3 Address Truncation (if implemented)
- [ ] On mobile, verify address doesn't overflow
- [ ] Still readable

---

## Test Suite 7: Error Handling

### 7.1 Network Errors
- [ ] Disconnect internet
- [ ] Try to refresh balance
- [ ] Error toast displays
- [ ] No crash
- [ ] Reconnect internet
- [ ] Refresh works again

### 7.2 RPC Errors
- [ ] (May need to simulate RPC failure)
- [ ] Proper error message displays
- [ ] Fallback to alternative endpoint or retry
- [ ] No crash

### 7.3 Invalid Transaction State
- [ ] Try to send transaction while one is pending
- [ ] Appropriate message
- [ ] No crash

### 7.4 Wallet Disconnected Mid-Transaction
- [ ] Disconnect wallet while transaction processing
- [ ] Proper error handling
- [ ] No crash
- [ ] UI returns to disconnected state

### 7.5 API Rate Limiting
- [ ] Make many rapid balance refreshes
- [ ] If rate limited, graceful handling
- [ ] No crash

---

## Test Suite 8: UI/UX

### 8.1 Loading States
- [ ] Spinners display for all async operations
- [ ] Spinners are centered and visible
- [ ] Buttons disabled during loading
- [ ] No double submissions

### 8.2 Toast Notifications
- [ ] Success toasts display correctly
- [ ] Error toasts display correctly
- [ ] Toasts auto-dismiss after reasonable time
- [ ] Toasts positioned correctly
- [ ] Multiple toasts stack properly

### 8.3 Dark Mode
- [ ] Toggle dark mode in settings
- [ ] All UI elements readable
- [ ] Colors appropriate for dark mode
- [ ] No white on white or black on black

### 8.4 Responsive Design
- [ ] Desktop: All elements visible and accessible
- [ ] Tablet: Layout adjusts properly
- [ ] Mobile: Single column layout
- [ ] No horizontal scrolling
- [ ] Touch targets appropriately sized

### 8.5 Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Alt text on icons
- [ ] ARIA labels where needed

### 8.6 Button States
- [ ] Hover states work
- [ ] Disabled states visible
- [ ] Active states work
- [ ] Touch states on mobile

---

## Test Suite 9: Performance

### 9.1 Initial Load
- [ ] Page loads within 2 seconds
- [ ] Balance loads within 5 seconds
- [ ] No layout shifts
- [ ] Smooth transitions

### 9.2 Balance Fetch
- [ ] Balance fetch completes quickly
- [ ] USD price fetch completes quickly
- [ ] Parallel requests where possible

### 9.3 Transaction History
- [ ] History loads efficiently
- [ ] Pagination if >10 transactions
- [ ] Smooth scrolling

### 9.4 Memory Leaks
- [ ] Open/close dialogs multiple times
- [ ] Connect/disconnect multiple times
- [ ] Memory doesn't grow continuously
- [ ] Event listeners cleaned up

---

## Test Suite 10: Integration Tests

### 10.1 Full Flow - Send and Verify
1. [ ] Connect wallet
2. [ ] Note initial balance
3. [ ] Send 0.01 SOL to another wallet
4. [ ] Wait for confirmation
5. [ ] Verify balance decreased
6. [ ] Verify transaction in history
7. [ ] Click transaction to view on Solscan
8. [ ] Verify transaction details match

### 10.2 Full Flow - Receive and Verify
1. [ ] Connect wallet
2. [ ] Note initial balance
3. [ ] Get receive address/QR
4. [ ] Send SOL from external wallet
5. [ ] Wait for confirmation
6. [ ] Refresh balance
7. [ ] Verify balance increased
8. [ ] Verify transaction in history

### 10.3 Full Flow - Multiple Transactions
1. [ ] Connect wallet
2. [ ] Make 3 send transactions
3. [ ] Verify all 3 in history
4. [ ] Verify all marked as "Sent"
5. [ ] Verify correct amounts
6. [ ] Balance correctly calculated

---

## Edge Cases

### Special Characters
- [ ] Handle addresses with special characters
- [ ] Handle very long amounts
- [ ] Handle zero amounts

### Time Zones
- [ ] Transaction timestamps display correct timezone
- [ ] No timezone confusion

### Different Currencies/Languages
- [ ] USD formatting appropriate
- [ ] SOL symbol displays
- [ ] Numbers formatted correctly

### Concurrent Users (if applicable)
- [ ] Multiple tabs open
- [ ] Sync state across tabs
- [ ] No conflicts

---

## Browser Compatibility

### Chrome
- [ ] All features work
- [ ] Console errors: none
- [ ] Performance acceptable

### Firefox
- [ ] All features work
- [ ] Console errors: none
- [ ] Performance acceptable

### Safari
- [ ] All features work
- [ ] Console errors: none
- [ ] Performance acceptable

### Edge
- [ ] All features work
- [ ] Console errors: none
- [ ] Performance acceptable

---

## Mobile Testing

### iOS Safari
- [ ] Layout responsive
- [ ] Touch interactions work
- [ ] No horizontal scroll
- [ ] Wallet connects

### Android Chrome
- [ ] Layout responsive
- [ ] Touch interactions work
- [ ] No horizontal scroll
- [ ] Wallet connects

---

## Security Testing

### Wallet Security
- [ ] Private keys never exposed
- [ ] No sensitive data in console
- [ ] Transactions require user approval
- [ ] No automatic transactions

### Input Validation
- [ ] XSS prevention
- [ ] SQL injection prevention (if applicable)
- [ ] Address validation
- [ ] Amount validation

---

## Completion Checklist

- [ ] All test suites completed
- [ ] Critical bugs fixed
- [ ] Medium bugs fixed or documented
- [ ] Minor bugs documented
- [ ] Performance acceptable
- [ ] Browser compatibility verified
- [ ] Security verified
- [ ] Documentation updated
- [ ] Ready for production

---

## Known Issues

*List any known issues that don't block production:*
1. None currently

---

## Test Results Summary

**Total Tests**: ___/___  
**Passed**: ___  
**Failed**: ___  
**Skipped**: ___  
**Test Date**: ___  
**Tested By**: ___

---

**Notes:**
- Mark checkbox as complete when test passes
- Document any failures in "Known Issues" section
- Screenshots recommended for visual verification
- Console logs should be monitored throughout testing




