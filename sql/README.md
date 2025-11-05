# SQL Scripts cho Supabase - Wallet Management

Thư mục này chứa các SQL scripts để tạo và quản lý database schema cho việc lưu trữ thông tin ví của người dùng trên Supabase.

## Cấu trúc

Các file SQL được đánh số thứ tự để đảm bảo thứ tự thực thi đúng:

1. **01_create_wallets_table.sql** - Tạo bảng chính lưu thông tin ví
2. **02_create_wallet_sessions_table.sql** - Tạo bảng lưu lịch sử kết nối/ngắt kết nối
3. **03_create_views.sql** - Tạo các views để truy vấn dữ liệu
4. **04_update_wallet_rls_policies.sql** - Cập nhật RLS policies để cho phép tạo wallet trước khi đăng nhập (user_id = null)
5. **05_update_wallet_sessions_rls_policies.sql** - Cập nhật RLS policies cho wallet_sessions để cho phép tạo sessions trước khi đăng nhập

## Cách sử dụng

### 1. Truy cập Supabase SQL Editor

1. Đăng nhập vào [Supabase Dashboard](https://app.supabase.com)
2. Chọn project của bạn
3. Vào **SQL Editor** ở sidebar

### 2. Chạy các SQL scripts theo thứ tự

Chạy từng file SQL theo thứ tự số (01, 02, 03, ...):

```sql
-- Copy nội dung từ file 01_create_wallets_table.sql
-- Paste vào SQL Editor và chạy
-- Lặp lại cho các file tiếp theo
```

Hoặc có thể chạy tất cả cùng lúc bằng cách copy nội dung tất cả các file theo thứ tự.

### 3. Kiểm tra kết quả

Sau khi chạy xong, kiểm tra trong **Table Editor** để xem các bảng đã được tạo:

- `wallets` - Bảng chính
- `wallet_sessions` - Lịch sử kết nối

## Schema Overview

### Bảng `wallets`

Lưu thông tin chính về ví của người dùng:

- `id` - UUID primary key
- `user_id` - Foreign key đến `auth.users`
- `wallet_address` - Địa chỉ ví (public key)
- `wallet_type` - Loại ví (phantom, solflare, etc.)
- `is_primary` - Ví chính của user
- `is_connected` - Trạng thái kết nối
- `connected_at` - Thời điểm kết nối
- `last_used_at` - Lần cuối sử dụng

### Bảng `wallet_sessions`

Lưu lịch sử kết nối/ngắt kết nối:

- `id` - UUID primary key
- `wallet_id` - Foreign key đến `wallets`
- `action` - Hành động (connect, disconnect, reconnect)
- `session_started_at` - Thời điểm bắt đầu session
- `session_ended_at` - Thời điểm kết thúc session
- `is_active` - Session đang active hay không


## Security (RLS)

Tất cả các bảng đều có **Row Level Security (RLS)** enabled:

- Users chỉ có thể xem/sửa/xóa dữ liệu của chính họ
- Policies được tạo tự động cho SELECT, INSERT, UPDATE, DELETE

## Triggers

### Triggers tự động:

1. **update_wallets_updated_at** - Tự động cập nhật `updated_at` khi bảng wallets được cập nhật

## Views

1. **wallet_details** - Thông tin chi tiết wallet của user
2. **recent_wallet_activity** - Lịch sử hoạt động wallet gần đây

## Lưu ý

- Đảm bảo chạy các scripts theo đúng thứ tự
- Kiểm tra kỹ các policies RLS trước khi deploy production
- Có thể cần điều chỉnh các indexes dựa trên pattern truy vấn thực tế
- Backup database trước khi chạy các scripts này trên production

## Ví dụ sử dụng

### Insert wallet mới

```sql
INSERT INTO public.wallets (user_id, wallet_address, wallet_type, is_primary)
VALUES (auth.uid(), 'YourWalletAddressHere', 'phantom', true);
```

### Lấy thông tin wallet của user hiện tại

```sql
SELECT * FROM public.wallet_details
WHERE user_id = auth.uid();
```

### Lấy lịch sử hoạt động wallet

```sql
SELECT * FROM public.recent_wallet_activity
WHERE user_id = auth.uid()
ORDER BY created_at DESC
LIMIT 10;
```

### Cập nhật trạng thái kết nối ví

```sql
UPDATE public.wallets
SET 
    is_connected = true,
    connected_at = NOW()
WHERE wallet_address = 'YourWalletAddressHere'
  AND user_id = auth.uid();
```

